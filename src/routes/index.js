import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, IconButton } from "react-native-paper";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { HeaderButton, HeaderButtons, Item } from "react-navigation-header-buttons";
import { GlobalContext } from "../contexts/global";
import { clearAllData, getGenericData, getSingleData } from "../contexts/storage";
import { handlerError } from "../helpers/handlerError";
import Home from "../screens/Home";
import League from "../screens/League";
import Players from "../screens/Players";
import Points from "../screens/Points";
import Team from "../screens/Team";

const Tab = createBottomTabNavigator();
const IoniconsHeaderButton = (props) => (
  <HeaderButton IconComponent={MaterialIcons} iconSize={23} {...props} />
);

const Routes = () => {
  const { token, setAlert, globalLoading } = useContext(GlobalContext);
  const [isLogged, setIsLogged] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function loadIsLogged() {
      const isLogged = await getSingleData("@token");
      setIsLogged(isLogged);
    }

    async function loadIsAdmin(params) {
      const user = await getGenericData('@user')
      user?.scopes?.map((scope) => {
        if (scope === "admin") {
          setIsAdmin(true)
        }
      })
    }
    loadIsLogged();
    loadIsAdmin();
  }, [token]);

  const logOut = useCallback(async () => {
    try {
      await clearAllData();
      setIsLogged(false)
      setAlert("Usuário Desconectado.");
    } catch (error) {
      setAlert(handlerError(error), true)
      console.log(error);
    }
  }, []);

  return (
    <>
      {!isLogged ? (
        <Home />
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
                {globalLoading ? (
                  <ActivityIndicator style={{ marginRight: 10 }} size='small' animating={globalLoading} color='white' />
                ) : (
                  <Item title="search" iconName="exit-to-app" onPress={() => logOut()} color="white" />
                )}
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
      )
      }
    </>
  );
};

export default Routes;
