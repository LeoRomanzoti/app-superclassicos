import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Players from "../screens/Players";
import { IconButton } from "react-native-paper";
import Team from "../screens/Team";
import League from "../screens/League";

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Meu Time"
        component={Team}
        options={{
          tabBarLabel: "Meu Time",
          tabBarIcon: ({ color }) => <IconButton icon="soccer-field" />,
        }}
      />
      <Tab.Screen
        name="Liga"
        component={League}
        options={{
          tabBarLabel: "Liga",
          tabBarIcon: ({ color }) => <IconButton icon="trophy" />,
        }}
      />

      <Tab.Screen
        name="Jogadores"
        component={Players}
        options={{
          tabBarLabel: "Adicionar",
          tabBarIcon: ({ color }) => <IconButton icon="account-plus" />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Routes;
