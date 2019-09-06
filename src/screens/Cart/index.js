import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../../styles/colors';

import {
  Container,
  Card,
  ProductList,
  Footer,
  TotalText,
  TotalPrice,
  CheckoutButton,
  CheckoutButtonText,
  ProductContainer,
  ProductInfos,
  ProductImage,
  ProductTitle,
  ProductActions,
  ActionButton,
  AmountText,
  ActionsControls,
  SubtotalText,
} from './styles';
import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

const Cart = () => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  const totalPrice = useSelector(state =>
    formatPrice(
      state.cart.reduce((total, product) => {
        return total + product.price * product.amount;
      }, 0)
    )
  );

  function increment(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount + 1));
  }

  function decrement(product) {
    dispatch(CartActions.updateAmountRequest(product.id, product.amount - 1));
  }

  function remove(id) {
    dispatch(CartActions.removeFromCart(id));
  }

  function renderProduct({ item }) {
    return (
      <ProductContainer>
        <ProductInfos>
          <ProductImage source={{ uri: item.image }} />
          <ProductTitle>{item.title}</ProductTitle>
          <TouchableOpacity onPress={() => remove(item.id)}>
            <Icon name="delete" size={25} color={colors.secondary} />
          </TouchableOpacity>
        </ProductInfos>
        <ProductActions>
          <ActionsControls>
            <ActionButton onPress={() => decrement(item)}>
              <Icon name="remove-circle" size={25} color={colors.secondary} />
            </ActionButton>
            <AmountText>{item.amount}</AmountText>
            <ActionButton onPress={() => increment(item)}>
              <Icon name="add-circle" size={25} color={colors.secondary} />
            </ActionButton>
          </ActionsControls>
          <SubtotalText>{item.subtotal}</SubtotalText>
        </ProductActions>
      </ProductContainer>
    );
  }

  return (
    <Container>
      <Card>
        <ProductList
          data={cart}
          keyExtractor={item => String(item.id)}
          renderItem={renderProduct}
        />
        <Footer>
          <TotalText>Total</TotalText>
          <TotalPrice>{totalPrice}</TotalPrice>
          <CheckoutButton>
            <CheckoutButtonText>Finalizar Pedido</CheckoutButtonText>
          </CheckoutButton>
        </Footer>
      </Card>
    </Container>
  );
};

export default Cart;
