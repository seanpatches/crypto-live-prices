import { CurrencyTypes, FoundCurrencyKey } from "../types";

export const findTargetKey = (currency: string): FoundCurrencyKey => {
    //this strips the "-USD" from the message to target the correct key
    const foundKey = currency.replace("-USD", "") as keyof typeof CurrencyTypes;
    return foundKey;
}

export const addUSDSuffix = (currencyList: string[]) => {
    console.log(currencyList.map((currency) => `${currency}-USD`));
    return currencyList.map((currency) => `${currency}-USD`)
}