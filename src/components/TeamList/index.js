import React from "react";
import { Text, View } from "react-native";
import { Divider, List } from "react-native-paper";

const TeamList = ({ total, team, players }) => {
  return (
    <View>
      <Text style={{ textAlign: "center" }}>{team}</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Pontuação</Text>
        <Text>{total}</Text>
      </View>
      <Divider />
      <View>
        {players.map(player => {
          const playerData = player?.chosenPlayer?.player
          const point = player?.chosenPlayer?.score


          return (

            <List.Item
              key={player?.id}
              title={playerData?.name}
              description={playerData?.position}
              right={(props) => <Text>{point}</Text>}
            />
          )
        })}

      </View>
    </View>
  );
};

export default TeamList;
