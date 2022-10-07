import React, { useState } from "react";
import { View } from "react-native";
import CustomModal from "../../components/Modal";
import { List, IconButton } from "react-native-paper";

const Points = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <View>
      <CustomModal modalVisible={openModal} setModalVisible={setOpenModal} />
      <List.Item
        title="Léo"
        description="Volante"
        right={(props) => (
          <IconButton onPress={() => setOpenModal(true)} icon="plus" />
        )}
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

export default Points;
