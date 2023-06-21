import axios from 'axios';
import { CryptoPrices, CurrencyTypes, getCurrencyList } from '../types';

const suggestedParamsAxios = axios.create({
  baseURL: "https://api.coinbase.com/v2/prices"
});

export const fetchPriceByCurrency = async (currency: string): Promise<number> => {
  try {
    const priceResponse = await suggestedParamsAxios.get(`${currency}-USD/buy`);
    const price = parseFloat(priceResponse.data.data.amount);
    return price;
  } catch(err: unknown) {
    return 0;
  }
}

export const fetchAllCurrencies = async (): Promise<CryptoPrices> => {
  try {
    const currenciesToWatch  = getCurrencyList().map((currency): Promise<number> => fetchPriceByCurrency(currency));
    const returnedFetchArray = await Promise.all(
      currenciesToWatch
    );
    const keys = Object.values(CurrencyTypes);
    const values = returnedFetchArray;
    const mergedArray = keys.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {}) as CryptoPrices;
    return mergedArray;
  } catch(err: unknown) {
    return { BTC: 0} as CryptoPrices;
  }
}