import React, { useCallback, useEffect, useState } from 'react';
import { AppState, StyleSheet, Text, View, Image, ScrollView, SafeAreaView, StatusBar, NativeEventSubscription } from 'react-native';
import { fetchAllCurrencies } from '../services/requests';
import { createTickerWebsocket } from '../sockets/websockets';
import { CryptoPrices, ChangingPrices, CurrencyTypes } from '../types';
import { PriceScreenStyles as styles } from '../styles/styles';
import { images } from '../helpers/images';
import { findTargetKey } from '../helpers/strings';

const initialPricesState = {
  BTC: 0,
  ETH: 0,
  FLOW: 0,
  ALGO: 0,
}

const initialChangingPricesState = {
  currency: "BTC-USD",
  price: 0,
}

const PricesScreen = () => {
  //displayed array
  const [prices, setPrices] = useState<CryptoPrices>(initialPricesState);
  //changing price
  const [changingPrice, setChangingPrice] = useState<ChangingPrices>(initialChangingPricesState);
  const [appState, setAppState] = useState<string>(AppState.currentState);

  useEffect(() => {
    let appStateListener: NativeEventSubscription | null = null;
    let websocket: WebSocket | null = null;

    //call initial price info from Coinbase GET on pageload
    const maintainPriceData = async() => {
      //TO-DO: LOOP THROUGH MASTER ARRAY OF MANY CURRENCIES, LOOSEN TYPING, LOOP DURING PROMISE.ALL
      const fetchedPrices = await fetchAllCurrencies();

      setPrices(fetchedPrices)
      
      //defines websocket on mount to be destroyed on dismount
      websocket = createTickerWebsocket(websocketMessageHandler);
      //instantiate websocket, pass handler
      
      //to properly prevent needless rerenders, use AppState in the react-native to check status
      appStateListener = AppState.addEventListener('change', (appStateBecomes: string) => {
        setAppState(appStateBecomes);
      });
    }
    
    maintainPriceData();
    //to call an async function in useEffect, the function must be defined in useEffect
    //placing the websocket to follow the GET dramatically increases performance

    return () => {
      //clear all listeners
      //close websocket on dismount, if it still remains after component is discarded
      websocket?.close();
      appStateListener?.remove();
    }
  }, [])

  const websocketMessageHandler = (message: { product_id: string, price: number }): void => {
    //parse message and use to set changing state value
    const { product_id, price } = message;
    product_id && price && setChangingPrice({ currency: product_id, price })
  }

  const updatePrices = useCallback((newPriceData: ChangingPrices): void => {
    //preventing rerender if the app is not forefront on device
    if(appState !== "active") return;
    //parses the changing state, to effect current prices state, memoized by useCallback for optimization
    const { currency, price } = newPriceData;
    const newPrices = { ...prices}
    const targetKey = findTargetKey(currency);
    newPrices[targetKey] = price;
    setPrices(newPrices);
  }, [prices, appState])

  useEffect(() => {
    //when the incoming data is set, this affects and changes the changing state value
    updatePrices(changingPrice);
  }, [changingPrice])
    
  //TO-DO: LOOP THROUGH PRICES TO MAKE LIST
  return (
    <SafeAreaView style={styles.pricesContainer}>
      <StatusBar barStyle="dark-content" />
      {prices && (
        <ScrollView style={styles.pricesList}>
          <View style={styles.row}>
            <Image source={{ uri: images[CurrencyTypes.FLOW]}} style={styles.rowImage} />
            <Text style={styles.nameText}>FLOW:</Text>
            <Text style={styles.priceText}>${prices.FLOW}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: images[CurrencyTypes.ALGO]}} style={styles.rowImage} />
            <Text style={styles.nameText}>ALGO:</Text>
            <Text style={styles.priceText}>${prices.ALGO}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: images[CurrencyTypes.BTC]}} style={styles.rowImage} />
            <Text style={styles.nameText}>BTC:</Text>
            <Text style={styles.priceText}>${prices.BTC}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: images[CurrencyTypes.ETH]}} style={styles.rowImage} />
            <Text style={styles.nameText}>ETH:</Text>
            <Text style={styles.priceText}>${prices.ETH}</Text>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

export default PricesScreen;
