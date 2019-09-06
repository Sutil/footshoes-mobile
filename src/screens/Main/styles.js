import { darken } from 'polished';
import styled from 'styled-components';
import colors from '../../styles/colors';

export const Container = styled.View``;

export const ProductCard = styled.View`
  width: 220px;
  background: #fff;
  border-radius: 4px;
  margin: 5px;
  padding: 5px;
`;

export const ProductImage = styled.Image`
  width: 200px;
  height: 200px;
`;

export const ProductTitle = styled.Text.attrs({
  numberOfLines: 2,
})`
  color: #777;
`;

export const ProductPrice = styled.Text`
  width: 100%;
  margin-bottom: 10px;
`;

export const AddCardButton = styled.TouchableOpacity`
  background: ${colors.primary};
  flex-direction: row;
  align-items: center;
  border-radius: 4px;
  margin-top: auto;
`;

export const ProductAmount = styled.View`
  padding: 10px;
  background: ${darken(0.1, colors.primary)};

  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;

  flex-direction: row;
  align-items: center;
`;

export const AmountCounterText = styled.Text`
  color: #fff;
  margin-left: 5px;
`;

export const ButtonText = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: bold;
  color: #fff;
`;
