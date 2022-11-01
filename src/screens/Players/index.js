import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, RefreshControl, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import CardPlayer from "../../components/CardPlayer";
import Container from "../../components/Container";
import { GlobalContext } from "../../contexts/global";
import { getGenericData } from "../../contexts/storage";
import api from "../../servers/api";
import { makeStyles } from "./style";

import { FlatList } from "react-native-gesture-handler";


const Players = () => {
  const { team, setAlertMsg, onToggleSnackBar, vibrate } =
    useContext(GlobalContext);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [players, setPlayers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    async function loadPlayer() {
      const { data } = await api.get("/chosen-players");
      setPlayers([...data]);
      setRefreshing(false)
    }
    loadPlayer();
  }, [refreshing]);

  const handleAddPlayer = useCallback(async (chosenPlayerId) => {
    try {
      vibrate();
      const data = { chosen_player_id: chosenPlayerId };
      const user = await getGenericData("@user");
      const response = await api.post(
        `/users/${user?.id}/teams/${team?.corneteiroTeamId}/players`,
        data
      );
      setAlertMsg("Jogador adicionado");
      onToggleSnackBar(true);
    } catch (error) {
      setAlertMsg(error?.response?.data?.message);
      onToggleSnackBar(true);
      console.log(error);
    }
  }, []);

  return (
    <Container>
      <Text style={styles.title}>Monte seu time:</Text>
      <Text style={styles.subTitle}>
        Você deverá montar um time no esquema 4-4-2.
      </Text>
      <Text style={styles.description}>
        1 goleiro, 2 zagueiros, 2 laterais, 2 volantes, 2 meias e 2 atacantes.
      </Text>
      <Image
        source={require("../../../assets/formacao.jpg")}
        style={{ height: 160, width: 400 }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingTop: 15,
          paddingBottom: 9,
        }}
      >
        <View>
          <Text style={styles.name}>Nome</Text>
          <Text style={styles.position}>Posição</Text>
        </View>
        <Text style={styles.add}>Adicionar</Text>
      </View>


      <FlatList
        contentContainerStyle={styles.flatBottom}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        data={players}
        keyExtractor={(player) => player?.chosenPlayerId}
        renderItem={({ item, index }) => {
          return (
            <CardPlayer
              key={item?.chosenPlayerId}
              title={item?.player?.name}
              description={item?.player?.position}
              addPlayer={() => handleAddPlayer(item?.chosenPlayerId)}
            />
          );
        }}
      />
    </Container>
  );
};

export default Players;
