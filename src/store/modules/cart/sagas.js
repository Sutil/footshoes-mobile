import { Alert } from 'react-native';
import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import api from '../../../services/api';

import { addToCartSuccess, updateAmountSucess } from './actions';

import { formatPrice } from '../../../util/format';

function* addToCart({ id }) {
  const product = yield select(state => state.cart.find(p => p.id === id));

  if (product) {
    const stock = yield call(api.get, `/stock/${id}`);

    const stockAmount = stock.data.amount;
    const currentAmount = product.amount;
    const newAmount = currentAmount + 1;

    if (newAmount > stockAmount) {
      Alert.alert('Estoque insuficiente para a quantidade solicitada.');
      return;
    }

    yield put(updateAmountSucess(id, newAmount));
  } else {
    const response = yield call(api.get, `/products/${id}`);

    const data = {
      ...response.data,
      amount: 1,
      fomattedPrice: formatPrice(response.data.price),
      subtotal: formatPrice(response.data.price),
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmountRequest({ id, amount }) {
  const stock = yield call(api.get, `/stock/${id}`);

  const stockAmount = stock.data.amount;

  if (amount > stockAmount) {
    Alert.alert('Estoque insuficiente para a quantidade solicitada.');
    return;
  }

  yield put(updateAmountSucess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmountRequest),
]);
