import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {Wrapper, Container, Logo, BasketContainer, ItemCount} from './styles';

export default function Header() {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <BasketContainer onPress={() => {}}>
          <Icon name="shopping-basket" color="#FFF" size={24} />
          <ItemCount>0</ItemCount>
        </BasketContainer>
      </Container>
    </Wrapper>
  );
}
