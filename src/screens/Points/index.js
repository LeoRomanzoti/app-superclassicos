import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { IconButton, List } from "react-native-paper";
import CustomModal from "../../components/Modal";
import api from "../../servers/api";
import CardPlayer from "../../components/CardPlayer";

const Points = () => {
  const [openModal, setOpenModal] = useState(false);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    async function loadPlayer() {
      const { data } = await api.get("/chosen-players");
      setPlayers([...data]);
    }
    loadPlayer();
  }, []);

  const [points, setPoints] = useState([]);

  useEffect(() => {
    async function loadPoint() {
      const { data } = await api.get("/points");
      setPoints([...data]);
    }
    loadPoint();
  }, []);

  return (
    <View>
      <CustomModal
        modalVisible={openModal}
        setModalVisible={setOpenModal}
        pointsList={points}
      />
      {players.map((player) => (
        <CardPlayer
          key={player?.chosenPlayerId}
          title={player?.player?.name}
          description={player?.player?.position}
          addPlayer={() => setOpenModal(true)}
        />
      ))}
    </View>
  );
};

export default Points;
