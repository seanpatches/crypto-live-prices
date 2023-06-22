import { CryptoPrices } from "../types";

export enum RootActions {
    SAVE_PRICE = 'SAVE_PRICES',
}

export const changePrices = (payload: CryptoPrices) => ({ type: RootActions.SAVE_PRICE, payload });
