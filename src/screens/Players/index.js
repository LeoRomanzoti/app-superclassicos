import React, { useCallback, useContext, useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { Divider, IconButton, List } from "react-native-paper";
import { GlobalContext } from "../../contexts/global";
import api from "../../servers/api";
import { styles } from "./style";

const Players = () => {
  const { userId, teamId, setAlertMsg, onToggleSnackBar } = useContext(GlobalContext)

  const [players, setPlayers] = useState([])
  useEffect(() => {
    async function loadPlayer() {
      const { data } = await api.get("/chosen-players")
      setPlayers([...data])
    }
    loadPlayer()
  }, [])

  const handleAddPlayer = useCallback(async (chosenPlayerId) => {
    try {
      const data = { chosen_player_id: chosenPlayerId }
      const response = await api.post(`/users/${userId}/teams/${teamId}/players`, data)
      setAlertMsg('Jogador adicionar')
      onToggleSnackBar(true)
    } catch (error) {
      console.log(error)
    }
  }, [])


  return (
    <View style={styles.container}>
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



      {players.map(player => (

        <List.Item
          key={player?.chosenPlayerId}
          title={player?.player?.name}
          description={player?.player?.position}
          right={(props) => <IconButton onPress={() => handleAddPlayer(player?.chosenPlayerId)} icon="plus" />}
        />
      ))}

    </View>
  );
};

export default Players;
