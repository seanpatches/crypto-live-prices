import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef, useState } from 'react';
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
  ALGO = "ALGO"
}

export default function App() {
  const [prices, setPrices] = useState<CryptoPrices | null>(null);

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

    const websocket = createTicketWebsocket();

    //instantiate websocket, pass handler
    //to properly maintain websocket connections, use AppState in the react-native to reconnect
    return () => {
      websocket.close();
    }
  }, [])

  const websocketMessageHandler = (message: any) => {
    //parse message and use to change state
  }

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
