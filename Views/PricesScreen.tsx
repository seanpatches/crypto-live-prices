import React, { useCallback, useEffect, useState } from 'react';
import { AppState, StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { fetchPriceByCurrency } from '../services/requests';
import { createTickerWebsocket } from '../sockets/websockets';
import { CryptoPrices, ChangingPrices, CurrencyTypes, MessageTypes } from '../types';
import { PriceScreenStyles as styles } from '../styles/styles';

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
      })}

    //to call an async function in useEffect, the function must be defined in useEffect
    getAllPricesConcurrently();

    //defines websocket on mount to be destroyed on dismount
    const websocket = createTickerWebsocket(websocketMessageHandler);
    //instantiate websocket, pass handler

    //to properly prevent needless rerenders, use AppState in the react-native to check status
    const appStateListener = AppState.addEventListener('change', (appStateBecomes: string) => {
      setAppState(appStateBecomes);
    });

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
    setChangingPrice({ currency: product_id, price })
  }

  const updatePrices = useCallback((newPriceData: ChangingPrices): void => {
    //preventing rerender if the app is not forefront on device
    if(appState !== "active") return;
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
  }, [prices, appState])

  useEffect(() => {
    //when the incoming data is set, this affects and changes the changing state value
    updatePrices(changingPrice);
  }, [changingPrice])
    

  return (
    <View style={styles.pricesContainer}>
      {prices && (
        <ScrollView style={styles.pricesList}>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/00ec02d5bad8ff25a8d3d7ac3829094182c612bb4fa883eaa96092c433271176de7d48b3b75c686f01b10ae274b3868870506e503995132954a5678af6a53664/asset_icons/fa89d5746755536254fa3351b74e1edf179a9466736dc0d9845e694135fabdfb.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>FLOW: {prices.FLOW}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/434cf9473be68c296f9c213b64a8caaebeb0f0fcf4096f38af3175eead7107425676652c9219c003f2acaafdcb07bce1f4862fe4f3f692ca1ae1da3c3dbff546/asset_icons/40447ba4170da28e92cf5c02d5675103d44d75fd6076ad8b0f5a953b3d4d3b9e.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>ALGO: {prices.ALGO}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>BTC: {prices.BTC}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>ETH: {prices.ETH}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/00ec02d5bad8ff25a8d3d7ac3829094182c612bb4fa883eaa96092c433271176de7d48b3b75c686f01b10ae274b3868870506e503995132954a5678af6a53664/asset_icons/fa89d5746755536254fa3351b74e1edf179a9466736dc0d9845e694135fabdfb.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>FLOW: {prices.FLOW}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/434cf9473be68c296f9c213b64a8caaebeb0f0fcf4096f38af3175eead7107425676652c9219c003f2acaafdcb07bce1f4862fe4f3f692ca1ae1da3c3dbff546/asset_icons/40447ba4170da28e92cf5c02d5675103d44d75fd6076ad8b0f5a953b3d4d3b9e.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>ALGO: {prices.ALGO}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>BTC: {prices.BTC}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>ETH: {prices.ETH}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/00ec02d5bad8ff25a8d3d7ac3829094182c612bb4fa883eaa96092c433271176de7d48b3b75c686f01b10ae274b3868870506e503995132954a5678af6a53664/asset_icons/fa89d5746755536254fa3351b74e1edf179a9466736dc0d9845e694135fabdfb.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>FLOW: {prices.FLOW}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/434cf9473be68c296f9c213b64a8caaebeb0f0fcf4096f38af3175eead7107425676652c9219c003f2acaafdcb07bce1f4862fe4f3f692ca1ae1da3c3dbff546/asset_icons/40447ba4170da28e92cf5c02d5675103d44d75fd6076ad8b0f5a953b3d4d3b9e.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>ALGO: {prices.ALGO}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>BTC: {prices.BTC}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>ETH: {prices.ETH}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/00ec02d5bad8ff25a8d3d7ac3829094182c612bb4fa883eaa96092c433271176de7d48b3b75c686f01b10ae274b3868870506e503995132954a5678af6a53664/asset_icons/fa89d5746755536254fa3351b74e1edf179a9466736dc0d9845e694135fabdfb.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>FLOW: {prices.FLOW}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/434cf9473be68c296f9c213b64a8caaebeb0f0fcf4096f38af3175eead7107425676652c9219c003f2acaafdcb07bce1f4862fe4f3f692ca1ae1da3c3dbff546/asset_icons/40447ba4170da28e92cf5c02d5675103d44d75fd6076ad8b0f5a953b3d4d3b9e.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>ALGO: {prices.ALGO}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/e785e0181f1a23a30d9476038d9be91e9f6c63959b538eabbc51a1abc8898940383291eede695c3b8dfaa1829a9b57f5a2d0a16b0523580346c6b8fab67af14b/asset_icons/b57ac673f06a4b0338a596817eb0a50ce16e2059f327dc117744449a47915cb2.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>BTC: {prices.BTC}</Text>
          </View>
          <View style={styles.row}>
            <Image source={{ uri: "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png"}} style={styles.rowImage} />
            <Text style={styles.priceText}>ETH: {prices.ETH}</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

export default PricesScreen;
