import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { addUSDSuffix } from './helpers/strings';

//this is the main currency typing, and additions to this will add to the project
export enum CurrencyTypes {
  BTC = "BTC",
  ETH = "ETH",
  FLOW = "FLOW",
  ALGO = "ALGO",
  LTC = "LTC",
}

export const getCurrencyList = (): CurrencyTypes[] =>  {
  return Object.values(CurrencyTypes)
}

export const getProductIDList = (): string[] =>  {
  return addUSDSuffix(Object.values(CurrencyTypes));
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