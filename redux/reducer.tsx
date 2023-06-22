import { AnyAction } from 'redux';

enum RootActions {
  SAVE_PRICE = 'SAVE_PRICES'
}

export const rootReducer = (
  state = {
    prices: []
  },
  action: AnyAction
) => {
  switch (action.type) {
    case RootActions.SAVE_PRICE:
      return { ...state, prices: action.payload };
    default:
      return state;
  }
};
