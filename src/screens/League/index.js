import React from "react";
import { View, Text } from "react-native";
import { IconButton, List } from "react-native-paper";

const League = () => {
  return (
    <View>
      <List.Item
        title="Nome do Time"
        titleStyle={{ fontSize: 23 }}
        right={(props) => <Text>Pontos</Text>}
        left={(props) => <IconButton icon="star" iconColor="gold" size={30} />}
      />
      <List.Item
        title="Nome do Time"
        right={(props) => <Text>Pontos</Text>}
        left={(props) => <IconButton icon="star" iconColor="silver" />}
      />
      <List.Item
        title="Nome do Time"
        right={(props) => <Text>Pontos</Text>}
        left={(props) => <IconButton icon="star" iconColor="#CD7F32" />}
      />
    </View>
  );
};

export default League;
