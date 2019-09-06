import produce from 'immer';
import { formatPrice } from '../../../util/format';

export default function cart(state = [], action) {
  switch (action.type) {
    case '@cart/ADD_SUCCESS': {
      const newState = produce(state, draft => {
        const { product } = action;
        draft.push(product);
      });
      return newState;
    }

    case '@cart/UPDATE_AMOUNT_SUCCESS':
      return produce(state, draft => {
        const productIndex = draft.findIndex(p => p.id === action.id);

        if (productIndex >= 0) {
          draft[productIndex].amount = Number(action.amount);
          draft[productIndex].subtotal = formatPrice(
            Number(action.amount) * Number(draft[productIndex].price)
          );
        }
      });

    case '@cart/REMOVE': {
      const newState = state.filter(p => p.id !== action.id);
      return newState;
    }

    default:
      return state;
  }
}
