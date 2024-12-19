import React, { useEffect, useState } from "react";
import { View, FlatList, Text } from "react-native";
import * as SQLite from "expo-sqlite/legacy";

const db = SQLite.openDatabase("shopping.db");

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM cart", [], (_, { rows }) => {
        setCartItems(rows._array);
      });
    });
  }, []);

  return (
    <FlatList
      data={cartItems}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>
            {item.title} - ${item.price}
          </Text>
        </View>
      )}
    />
  );
};

export default CartScreen;
