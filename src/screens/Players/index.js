import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, RefreshControl, Text, View } from "react-native";
import { useTheme } from "react-native-paper";
import field from '../../../assets/field.png';
import CardPlayer from "../../components/CardPlayer";
import Container from "../../components/Container";
import { GlobalContext } from "../../contexts/global";
import { getGenericData } from "../../contexts/storage";
import api from "../../servers/api";
import { makeStyles } from "./style";

import { FlatList } from "react-native-gesture-handler";
import { handlerError } from "../../helpers/handlerError";



const Players = () => {
  const { team, vibrate, setAlert, setGlobalLoading } =
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
      setGlobalLoading(true)
      vibrate();
      const data = { chosen_player_id: chosenPlayerId };
      const user = await getGenericData("@user");
      const response = await api.post(
        `/users/${user?.id}/teams/${team?.corneteiroTeamId}/players`,
        data
      );
      setAlert("Jogador adicionado");
    } catch (error) {
      setAlert(handlerError(error), true)
      console.log(error);
    } finally {
      setGlobalLoading(false)
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
