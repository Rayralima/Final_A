import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import api from '../services/api';

const ProductList = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await api.get('/');
    setProducts(response.data);
  };

  return (
    <View style={styles.container}>
      <Button title="Add Product" onPress={() => navigation.navigate('AddProduct')} />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.name}</Text>
            <Button
              title="Edit"
              onPress={() => navigation.navigate('EditProduct', { id: item.id })}
            />
            <Button
              title="Delete"
              onPress={async () => {
                await api.delete(`/${item.id}`);
                fetchProducts();
              }}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductList;