import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import CardPlayer from "../../components/CardPlayer";
import { GlobalContext } from "../../contexts/global";
import api from "../../servers/api";
import { makeStyles } from "./style";

const Players = () => {
  const { userId, teamId, setAlertMsg, onToggleSnackBar, vibrate } =
    useContext(GlobalContext);

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const [players, setPlayers] = useState([]);
  useEffect(() => {
    async function loadPlayer() {
      const { data } = await api.get("/chosen-players");
      setPlayers([...data]);
    }
    loadPlayer();
  }, []);

  const handleAddPlayer = useCallback(async (chosenPlayerId) => {

    try {
      vibrate()
      const data = { chosen_player_id: chosenPlayerId };
      const response = await api.post(
        `/users/${userId}/teams/${teamId}/players`,
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
    <View style={styles.container}>
      <Text style={styles.title}>Monte seu time:</Text>
      <Text style={styles.subTitle}>
        Você deverá montar um time no esquema 4-2-2-2.
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

      {players.map((player) => (
        <CardPlayer
          key={player?.chosenPlayerId}
          title={player?.player?.name}
          description={player?.player?.position}
          addPlayer={() => handleAddPlayer(player?.chosenPlayerId)}
        />
      ))}
    </View>
  );
};

export default Players;
