import React from "react";
import { View, Text } from "react-native";
import { List, IconButton, Divider } from "react-native-paper";

const Players = () => {
  return (
    <View>
      <Text>Monte seu time:</Text>
      <Text>
        Você deverá montar um time no esquema 4-4-2 (1 goleiro, 2 zagueiros, 2
        laterais, 2 volantes, 2 meias e 2 atacantes).
      </Text>
      <Divider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>Nome</Text>
        <Text>Adicionar</Text>
      </View>
      <List.Item
        title="Léo"
        description="Volante"
        right={(props) => <IconButton icon="plus" />}
      />
      <List.Item
        title="Léo"
        description="Volante"
        right={(props) => <IconButton icon="plus" />}
      />
      <List.Item
        title="Léo"
        description="Volante"
        right={(props) => <IconButton icon="plus" />}
      />
    </View>
  );
};

export default Players;
