import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import PricesScreen from './Views/PricesScreen';
import HomeScreen from './Views/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { Button } from 'react-native';
import { mainBackground, lightColor } from './styles/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ title: "Crypto Prices", headerStyle: { backgroundColor: lightColor}, headerTintColor: mainBackground }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
          />
        <Stack.Screen
          name="PricesScreen"
          component={PricesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;