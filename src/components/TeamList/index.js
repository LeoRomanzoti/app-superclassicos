import React from "react";
import { View, Text } from "react-native";
import { List, Divider } from "react-native-paper";

const TeamList = ({ total, team }) => {
  return (
    <View>
      <Text style={{ textAlign: "center" }}>{team}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Pontuação</Text>
        <Text>{total}</Text>
      </View>
      <Divider />
      <View>
        <List.Item
          title="Léo"
          description="Volante"
          right={(props) => <Text>Pontos</Text>}
        />
        <List.Item
          title="Léo"
          description="Volante"
          right={(props) => <Text>Pontos</Text>}
        />
        <List.Item
          title="Léo"
          description="Volante"
          right={(props) => <Text>Pontos</Text>}
        />
      </View>
    </View>
  );
};

export default TeamList;
