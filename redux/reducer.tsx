import { AnyAction } from 'redux';
import { RootActions } from './actions';

export const rootReducer = (
  state = {
    prices: null
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
