import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Screens
import Register from "../Screens/Register";
import Articles from "../Screens/Articles";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Articles"
        component={Articles}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default function UserNavigator() {
  return <MyStack />;
}
