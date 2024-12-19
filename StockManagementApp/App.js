import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './src/screens/ProductList';
import AddProduct from './src/screens/AddProduct';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Product List' }} />
        <Stack.Screen name="AddProduct" component={AddProduct} options={{ title: 'Add Product' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}