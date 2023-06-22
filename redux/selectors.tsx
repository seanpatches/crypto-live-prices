import { RootState, store } from './store';

const getPrices = (state: RootState) => state.root.prices;

export const getPricesSelector = () => getPrices(store.getState());