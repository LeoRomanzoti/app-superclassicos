import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext, useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import { GlobalContext } from "../contexts/global";
import { getSingleData } from "../contexts/storage";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import Home from "../screens/Home";
import League from "../screens/League";
import Players from "../screens/Players";
import Points from "../screens/Points";
import Team from "../screens/Team";

const Tab = createBottomTabNavigator();

const Routes = () => {
  const { isAdmin, token } = useContext(GlobalContext);
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    async function loadIsLogged() {
      const isLogged = await getSingleData("@token");
      setIsLogged(isLogged);
    }
    loadIsLogged();
  }, [token]);

  return (
    <>
      {!isLogged ? (
        <Home />
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerRight: () => (
              <HeaderButtons>
                <Item
                  title="..."
                  iconName="ios-search"
                  onPress={() => alert("Apertou")}
                  color={"white"}
                  style={{ fontWeight: "bold" }}
                />
              </HeaderButtons>
            ),
            headerStyle: {
              backgroundColor: "#c8102e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        >
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
          {isAdmin && (
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
