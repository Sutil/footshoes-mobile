import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as CartActions from '../../store/modules/cart/actions';

import api from '../../services/api';
import { formatPrice } from '../../util/format';

import {
  Container,
  ProductCard,
  ProductImage,
  ProductTitle,
  ProductPrice,
  AddCardButton,
  ProductAmount,
  ButtonText,
  AmountCounterText,
} from './styles';

function Main() {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProducts() {
      const response = await api.get('/products');

      const data = response.data.map(p => ({
        ...p,
        formattedPrice: formatPrice(p.price),
      }));

      setProducts(data);
    }

    fetchProducts();
  }, []);

  const amountItems = useSelector(state => {
    const sumAmount = {};
    state.cart.forEach(p => {
      sumAmount[p.id] = p.amount;
    });
    return sumAmount;
  });

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id));
  }

  function renderProduct({ item }) {
    console.tron.warn(JSON.stringify(amountItems));
    return (
      <ProductCard key={String(item.id)}>
        <ProductImage source={{ uri: item.image }} />
        <ProductTitle>{item.title}</ProductTitle>
        <ProductPrice>{item.formattedPrice}</ProductPrice>
        <AddCardButton onPress={() => handleAddProduct(item.id)}>
          <ProductAmount>
            <Icon name="add-shopping-cart" color="#FFF" size={20} />
            <AmountCounterText>{amountItems[item.id] || 0}</AmountCounterText>
          </ProductAmount>
          <ButtonText>ADICIONAR</ButtonText>
        </AddCardButton>
      </ProductCard>
    );
  }

  return (
    <Container>
      {console.tron.warn('retornando flat list')}
      <FlatList
        horizontal
        data={products}
        extraData={amountItems}
        keyExtractor={item => String(item.id)}
        renderItem={renderProduct}
      />
    </Container>
  );
}

export default Main;
