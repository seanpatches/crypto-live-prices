import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum CurrencyTypes {
  BTC = "BTC",
  ETH = "ETH",
  FLOW = "FLOW",
  ALGO = "ALGO",
}

export type FoundCurrencyKey = keyof typeof CurrencyTypes;

export type RootStackParamList = {
  HomeScreen: undefined,
  PricesScreen: undefined,
}

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList,'HomeScreen'>;
export type PricesScreenProps =  NativeStackScreenProps<RootStackParamList,'PricesScreen'>;


export type CryptoPrices = {
  [key in CurrencyTypes]: number;
};

export type ChangingPrices = {
  currency: string,
  price: number
}