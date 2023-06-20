import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  useEffect(() => {
    //call initial price info from Coinbase on GET

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
