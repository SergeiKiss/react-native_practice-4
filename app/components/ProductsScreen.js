import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Button,
  Image,
  RefreshControl,
} from "react-native";
import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("shopping.db");

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = () => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchProducts();
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS cart (id INTEGER PRIMARY KEY NOT NULL, title TEXT, price REAL);"
      );
    });
  }, []);

  const addToCart = (product) => {
    db.transaction((tx) => {
      tx.executeSql("INSERT INTO cart (title, price) VALUES (?, ?)", [
        product.title,
        product.price,
      ]);
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
    setRefreshing(false);
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: 100, height: 100 }}
          />
          <Text>{item.title}</Text>
          <Text>${item.price}</Text>
          <Button title="Добавить в корзину" onPress={() => addToCart(item)} />
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default ProductsScreen;
