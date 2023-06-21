import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchPriceByCurrency } from '../services/requests';
import { createTickerWebsocket } from '../sockets/websockets';
import { CryptoPrices, ChangingPrices, CurrencyTypes, MessageTypes } from '../types';

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

  useEffect(() => {
    //call initial price info from Coinbase GET on pageload
    const getAllPricesConcurrently = async() => {
      const [priceBTC, priceETH, priceFlow, priceAlgo] = await Promise.all(
        [
          fetchPriceByCurrency(CurrencyTypes.BTC),
          fetchPriceByCurrency(CurrencyTypes.ETH),
          fetchPriceByCurrency(CurrencyTypes.FLOW),
          fetchPriceByCurrency(CurrencyTypes.ALGO)
        ]
      );

      setPrices({
        BTC: priceBTC,
        ETH: priceETH,
        FLOW: priceFlow,
        ALGO: priceAlgo
      })
    }

    //to call an async function in useEffect, the function must be defined in useEffect
    getAllPricesConcurrently();

    //defines websocket on mount to be destroyed on dismount
    const websocket = createTickerWebsocket(websocketMessageHandler);
    //instantiate websocket, pass handler

    const testDisconnect = setTimeout(async () => {
      //tests an unintentional disconnect and reconnect for demo purposes
      websocket.close(404);
      clearTimeout(testDisconnect);
    }, 10000);

    //to properly maintain websocket connections, use AppState in the react-native to reconnect

    return () => {
      //close websocket on dismount, the 1000 code flags that it was intentional
      websocket.close(1000);
    }
  }, [])

  const websocketMessageHandler = (message: any) => {
    //parse message and use to set changing state value
    const { product_id, price } = message;
    setChangingPrice({ currency: product_id, price })
  }

  const updatePrices = useCallback((newPriceData: ChangingPrices) => {
    //parses the changing state, to effect current prices state, memoized by useCallback for optimization
    const { currency, price } = newPriceData;
    const newPrices = { ...prices}
    switch(currency) {
      case MessageTypes.BTC:
        newPrices.BTC = price;
        break
      case MessageTypes.ETH:
        newPrices.ETH = price;
        break
      case MessageTypes.FLOW:
        newPrices.FLOW = price;
        break
      case MessageTypes.ALGO:
        newPrices.ALGO = price;
        break
    }
    setPrices(newPrices);
  }, [prices])

  useEffect(() => {
    //when the incoming data is set, this affects and changes the changing state value
    updatePrices(changingPrice);
  }, [changingPrice])
    

  return (
    <View style={styles.container}>
      {prices && (
        <View>
          <Text>BTC: {prices.BTC}</Text>
          <Text>ETH: {prices.ETH}</Text>
          <Text>FLOW: {prices.FLOW}</Text>
          <Text>ALGO: {prices.ALGO}</Text>
        </View>
      )
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PricesScreen;
