import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Players from "../screens/Players";
import { IconButton } from "react-native-paper";
import Team from "../screens/Team";
import League from "../screens/League";
import Points from "../screens/Points";
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();

const admin = true;
const logado = true;

const Routes = () => {
  return (
    <>
      {!logado ? (
        <Home />
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="Meu Time"
            component={Team}
            options={{
              tabBarLabel: "Meu Time",
              tabBarIcon: ({ color }) => (
                <IconButton icon="soccer-field" iconColor="green" size={35} />
              ),
            }}
          />
          <Tab.Screen
            name="Liga"
            component={League}
            options={{
              tabBarLabel: "Liga",
              tabBarIcon: ({ color }) => (
                <IconButton icon="trophy" iconColor="gold" size={35} />
              ),
            }}
          />

          <Tab.Screen
            name="Jogadores"
            component={Players}
            options={{
              tabBarLabel: "Adicionar",
              tabBarIcon: ({ color }) => (
                <IconButton icon="account-plus" iconColor="red" size={35} />
              ),
            }}
          />
          {admin && (
            <Tab.Screen
              name="Pontuação"
              component={Points}
              options={{
                tabBarLabel: "Pontuação",
                tabBarIcon: ({ color }) => (
                  <IconButton icon="account-edit" iconColor="blue" size={35} />
                ),
              }}
            />
          )}
        </Tab.Navigator>
      )}
    </>
  );
};

export default Routes;
