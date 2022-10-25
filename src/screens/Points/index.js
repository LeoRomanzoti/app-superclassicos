import React, { useCallback, useContext, useEffect, useState } from "react";
import CardPlayer from "../../components/CardPlayer";
import Container from "../../components/Container";
import CustomModal from "../../components/Modal";
import { GlobalContext } from "../../contexts/global";
import api from "../../servers/api";

const Points = () => {
  const [openModal, setOpenModal] = useState(false);
  const [players, setPlayers] = useState([]);
  const [points, setPoints] = useState([]);
  const [player, setPlayer] = useState("");

  const { vibrate, setAlertMsg, onToggleSnackBar } = useContext(GlobalContext);

  useEffect(() => {
    async function loadPlayer() {
      const { data } = await api.get("/chosen-players");
      setPlayers([...data]);
    }
    loadPlayer();
  }, []);

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
        vibrate();
        const data = { point_id: pointId, point_value: pointValue };
        const response = await api.post(
          `/chosen-players/${playerId}/points`,
          data
        );
        setOpenModal(false);
        setPlayer(player);
        setAlertMsg(
          `${point} adicionado para o jogador ${player.player.name}.`
        );
        onToggleSnackBar(true);
      } catch (error) {
        console.log(error);
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
      />
      {players.map((player) => (
        <CardPlayer
          key={player?.chosenPlayerId}
          title={player?.player?.name}
          description={player?.player?.position}
          addPlayer={() => handleOpenModal(player)}
        />
      ))}
    </Container>
  );
};

export default Points;
