import React from 'react';
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { HomeScreenProps } from '../types';
import { HomeScreenStyles as styles } from '../styles/styles'

export const HomeScreen = ({ navigation }: HomeScreenProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() =>
            navigation.navigate("PricesScreen")
          }
        >
          <Text style={styles.buttonText}>{"Crypto Price List >"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default HomeScreen;
