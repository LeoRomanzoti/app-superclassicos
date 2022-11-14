import React, { useCallback, useContext, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CardPlayer from "../../components/CardPlayer";
import Container from "../../components/Container";
import CustomModal from "../../components/Modal";
import { GlobalContext } from "../../contexts/global";
import { handlerError } from "../../helpers/handlerError";
import api from "../../servers/api";

const Points = () => {
  const [openModal, setOpenModal] = useState(false);
  const [players, setPlayers] = useState([]);
  const [points, setPoints] = useState([]);
  const [player, setPlayer] = useState("");
  const [refreshing, setRefreshing] = useState(false)

  const { vibrate, setAlert, setGlobalLoading, globalLoading } = useContext(GlobalContext);

  useEffect(() => {
    async function loadPlayer() {
      const { data } = await api.get("/chosen-players");
      setPlayers([...data]);
      setRefreshing(false)
    }
    loadPlayer();
  }, [refreshing]);

  useEffect(() => {
    async function loadPoint() {
      const { data } = await api.get("/points");
      setPoints([...data]);
    }
    loadPoint();
  }, []);

  const handleOpenModal = useCallback((player) => {
    setOpenModal(true);
    setPlayer(player);
  }, []);

  const handleAddPoint = useCallback(
    async (pointId, pointValue, playerId, point) => {
      try {
        setGlobalLoading(true)
        vibrate();
        const data = { point_id: pointId, point_value: pointValue };
        const response = await api.post(
          `/chosen-players/${playerId}/points`,
          data
        );
        setOpenModal(false);
        setPlayer(player);
        setAlert(
          `${point} adicionado para o jogador ${player.player.name}.`
        );
      } catch (error) {
        setAlert(handlerError(error), true)
        console.log(error);
      } finally {
        setGlobalLoading(false)
      }
    },
    [player]
  );

  return (
    <Container>
      <CustomModal
        modalVisible={openModal}
        setModalVisible={setOpenModal}
        pointsList={points}
        player={player}
        handleAddPoint={handleAddPoint}
        globalLoading={globalLoading}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        data={players}
        keyExtractor={(team) => team?.chosenPlayerId}
        renderItem={({ item, index }) => {
          return (
            <CardPlayer
              key={item?.chosenPlayerId}
              title={item?.player?.name}
              description={item?.player?.position}
              addPlayer={() => handleOpenModal(item)}
            />
          );
        }}
      />
    </Container>
  );
};

export default Points;
