import type { NativeStackScreenProps } from '@react-navigation/native-stack';


export type RootStackParamList = {
  HomeScreen: undefined,
  PricesScreen: undefined,
}

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList,'HomeScreen'>;
export type PricesScreenProps =  NativeStackScreenProps<RootStackParamList,'PricesScreen'>;


export type CryptoPrices = {
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