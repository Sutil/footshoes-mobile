import React from 'react';
import {View, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Main = ({navigation}) => {
  return (
    <View>
      <Text>Main</Text>
      <TouchableOpacity onPress={() => navigation.push('Cart')}>
        <Text>Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Main;
