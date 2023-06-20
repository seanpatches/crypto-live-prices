import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fetchPriceByCurrency } from './services/requests';

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
    fetchPriceByCurrency(CurrencyTypes.BTC);
    fetchPriceByCurrency(CurrencyTypes.ETH);
    fetchPriceByCurrency(CurrencyTypes.FLOW);
    fetchPriceByCurrency(CurrencyTypes.ALGO);
    //instantiate websocket, pass handler
    //to properly maintain websocket connections, use AppState in the react-native to reconnect
  })

  const websocketMessageHandler = (message: any) => {
    //parse message and use to change state
  }

  return (
    <View style={styles.container}>
      <Text>CRYPTO LIVE PRICES</Text>
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
