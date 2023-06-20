import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchPriceByCurrency } from './services/requests';
import { errorHandler } from './helpers/errors';
import { createTicketWebsocket } from './sockets/websockets';

type CryptoPrices = {
  BTC: number,
  ETH: number,
  FLOW: number,
  ALGO: number,
};

export enum CurrencyTypes {
  BTC = "BTC",
  ETH = "ETH",
  FLOW = "FLOW",
  ALGO = "ALGO",
}

export enum MessageTypes {
  BTC = "BTC-USD",
  ETH = "ETH-USD",
  FLOW = "FLOW-USD",
  ALGO = "ALGO-USD",
}

export type ChangingPrices = {
  currency: string,
  price: number
}

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

export default function App() {
  //displayed array
  const [prices, setPrices] = useState<CryptoPrices>(initialPricesState);
  //changing price
  const [changingPrice, setChangingPrice] = useState<ChangingPrices>(initialChangingPricesState);

  useEffect(() => {
    //call initial price info from Coinbase on GET
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

    getAllPricesConcurrently();

    const websocket = createTicketWebsocket(websocketMessageHandler);

    //instantiate websocket, pass handler
    //to properly maintain websocket connections, use AppState in the react-native to reconnect
    return () => {
      websocket.close();
    }
  }, [])

  const websocketMessageHandler = (message: any) => {
    //parse message and use to change state
    const { product_id, price } = message;
    setChangingPrice({ currency: product_id, price })
  }

  const updatePrices = useCallback((newPriceData: ChangingPrices) => {
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
    //when the incoming data is set, this affects and changes the current state
    updatePrices(changingPrice);
  }, [changingPrice])
    

  return (
    <View style={styles.container}>
      <Text>CRYPTO LIVE PRICES</Text>
      {prices && (
        <View>
          <Text>Prices: {prices.BTC}</Text>
          <Text>Prices: {prices.ETH}</Text>
          <Text>Prices: {prices.FLOW}</Text>
          <Text>Prices: {prices.ALGO}</Text>
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
