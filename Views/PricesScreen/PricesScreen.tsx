import React, { FC, useCallback, useEffect, useState } from 'react';
import { AppState, View, ScrollView, SafeAreaView, StatusBar, NativeEventSubscription, ActivityIndicator } from 'react-native';
import { fetchAllCurrencies } from '../../services/requests';
import { createTickerWebsocket } from '../../sockets/websockets';
import { CryptoPrices, ChangingPrices, ParsedWebsocketMessage } from '../../types';
import { PriceScreenStyles as styles } from '../../styles/styles';
import { findTargetKey } from '../../helpers/strings';
import Row from './components/Row';
import { lightColor } from '../../styles/colors';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { changePrices } from '../../redux/actions';
import { getPricesSelector } from '../../redux/selectors';

const PricesScreen: FC = () => {
  const [appState, setAppState] = useState<string>(AppState.currentState);
  //redux selectors and dispatch
  const globalprices = useAppSelector((state: RootState) => state.root.prices)
  const dispatch = useAppDispatch();

  useEffect(() => {
    let appStateListener: NativeEventSubscription | null = null;
    let websocket: WebSocket | null = null;

    //call initial price info from Coinbase GET on pageload
    const maintainPriceData = async() => {
      //TO-DO: LOOP THROUGH MASTER ARRAY OF MANY CURRENCIES, LOOSEN TYPING, LOOP DURING PROMISE.ALL
      const fetchedPrices = await fetchAllCurrencies();

      //defines websocket on mount to be destroyed on dismount
      websocket = createTickerWebsocket(websocketMessageHandler);
      //instantiate websocket, pass handler
      
      //sets prices to global state, turns off loader
      dispatch(changePrices(fetchedPrices))

      //to properly prevent needless rerenders, use AppState in the react-native to check status
      appStateListener = AppState.addEventListener('change', (appStateBecomes: string) => {
        setAppState(appStateBecomes);
      });
    }
    
    //to call an async function in useEffect, the function must be defined in useEffect
    //placing the websocket to follow the GET dramatically increases performance
    maintainPriceData();

    return () => {
      //clear all listeners
      //close websocket on dismount, if it still remains after component is discarded
      websocket?.close();
      appStateListener?.remove();
    }
  }, [])

  const websocketMessageHandler = (message: ParsedWebsocketMessage): void => {
    //parse message and use to set changing state value
    const { product_id, price } = message;
    product_id && price && updatePrices({ currency: product_id, price });
  }

  const updatePrices = useCallback(async(newPriceData: ChangingPrices): Promise<void> => {
    //preventing rerender if the app is not forefront on device, or if loading in
    if(appState !== "active" || !newPriceData) return;
    const currentPrices = getPricesSelector();
    //parses the changing state, to effect current prices state, memoized by useCallback for optimization
    const { currency, price } = newPriceData;
    
    const newPrices = { ...currentPrices}
    const targetKey = findTargetKey(currency);
    newPrices[targetKey] = price;
    dispatch(changePrices(newPrices))
  }, [appState])

    
  //TO-DO: LOOP THROUGH PRICES TO MAKE LIST
  return (
    <SafeAreaView style={styles.pricesContainer}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={styles.pricesList}>
      {globalprices ? (
        Object.entries(globalprices).map((item) => {
          const currency = item[0];
          const price = item[1];
          return <Row currency={currency} price={price} key={`row-${currency}`}/>
        })
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={lightColor} />
        </View>
      )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default PricesScreen;
