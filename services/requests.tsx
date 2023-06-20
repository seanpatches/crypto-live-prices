import axios from 'axios';

const suggestedParamsAxios = axios.create({
  baseURL: "https://api.coinbase.com/v2/prices"
});

export const fetchPriceByCurrency = async (currency: string): Promise<number> => {
  try {
    const priceResponse = await suggestedParamsAxios.get(`${currency}-USD/buy`);
    const price = priceResponse.data.data.amount;
    return price;
  } catch(err: unknown) {
    return 0;
  }
}