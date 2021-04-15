// Machine Test BY DESIGN CODE Date- 16 APR 2020
// Solution By Avinash Aryan 

import "react-native-gesture-handler";
import React from "react";

// Navigators
import { NavigationContainer } from "@react-navigation/native";
import UserNavigator from "./Navigators/UserNavigator";

//redux store
import { Provider } from "react-redux";
import configureStore from "./Redux/config";
const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <UserNavigator />
      </NavigationContainer>
    </Provider>
  );
}
