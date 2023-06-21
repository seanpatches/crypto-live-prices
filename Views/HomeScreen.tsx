import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { HomeScreenProps } from '../types';
import { HomeScreenStyles as styles } from '../styles/styles'

export const HomeScreen = ({ navigation }: HomeScreenProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crypto Live Prices</Text>
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
