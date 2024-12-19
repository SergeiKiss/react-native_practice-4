import React, { useState } from "react";
import { Stack } from "expo-router";
import ProductsScreen from "./components/ProductsScreen";
import CartScreen from "./components/CartScreen";

const App = () => {
  return (
    <Stack>
      <Stack.Screen name="Products" component={ProductsScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack>
  );
};

export default App;
