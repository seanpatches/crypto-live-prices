import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import PricesScreen from './Views/PricesScreen/PricesScreen';
import HomeScreen from './Views/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { Pressable, Text } from 'react-native';
import { darkColor, lightColor } from './styles/colors';
import { NavigationStyles as styles } from './styles/styles';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{ title: "Crypto Live Prices", headerStyle: { backgroundColor: lightColor}, headerTintColor: darkColor }}>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PricesScreen"
          component={PricesScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Pressable
                onPress={() => navigation.popToTop()}
                style={styles.backButton}
              >
                <Text
                  style={styles.backButtonText}
                >{"< Back"}</Text>
              </Pressable>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;