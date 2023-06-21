import React, { useCallback, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HomeScreenProps } from '../types';

const HomeScreen = ({ navigation }: HomeScreenProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text>Work In Progress...</Text>
      <Text>CRYPTO LIVE PRICES</Text>
      <Button
        title="Check out crypto prices"
        onPress={() =>
          navigation.navigate("PricesScreen")
        }
      />
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

export default HomeScreen;
