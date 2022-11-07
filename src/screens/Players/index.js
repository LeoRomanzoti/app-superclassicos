import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import field from '../../../assets/field.png';
import CardPlayer from "../../components/CardPlayer";
import { GlobalContext } from "../../contexts/global";
import { getGenericData } from "../../contexts/storage";
import api from "../../servers/api";
import { makeStyles } from "./style";

const Players = () => {
  const { team, setAlertMsg, onToggleSnackBar, vibrate } =
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
    <View style={styles.container}>
      <Text style={styles.title}>Monte seu time:</Text>
      <Text style={styles.subTitle}>
        Você deverá montar um time no esquema 4-4-2.
      </Text>
      <Text style={styles.description}>
        1 goleiro, 2 zagueiros, 2 laterais, 2 volantes, 2 meias e 2 atacantes.
      </Text>
      <View style={styles.imageView}>
        <Image
          source={field}
          style={styles.image}
        />
      </View>

      <View style={styles.listTitle}>
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
