import React from "react";
import { View, Text, Image } from "react-native";
import { List, IconButton, Divider } from "react-native-paper";
import { styles } from "./style";

const Players = () => {
  return (
    <View>
      <Text style={styles.title}>Monte seu time:</Text>
      <Text style={styles.subTitle}>
        Você deverá montar um time no esquema 4-4-2 (1 goleiro, 2 zagueiros, 2
        laterais, 2 volantes, 2 meias e 2 atacantes).
      </Text>
      <Image
        source={require("../../../assets/formacao.jpg")}
        style={{ height: 160, width: 400 }}
      />
      <Divider />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.name}>Nome/Posição</Text>
        <Text style={styles.add}>Adicionar</Text>
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
