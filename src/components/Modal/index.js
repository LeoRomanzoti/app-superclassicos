import React from "react";
import { Modal, Text, View } from "react-native";
import { Button, IconButton, List } from "react-native-paper";
import { styles } from "./style";

const CustomModal = ({
  modalVisible,
  setModalVisible,
  pointsList,
  player,
  handleAddPoint,
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.player}>{player?.player?.name}</Text>
            {pointsList.map((point) => (
              <View key={point?.id} style={styles.listModal}>
                <List.Item
                  style={styles.list}
                  title={point?.label}
                  right={(props) => (
                    <View style={styles.modalButton}>
                      <IconButton
                        onPress={() =>
                          handleAddPoint(
                            point?.id,
                            point?.value,
                            player?.chosenPlayerId,
                            point?.label
                          )
                        }
                        icon="plus"
                        iconColor="white"
                      />
                    </View>
                  )}
                />
              </View>
            ))}

            <Button
              style={{ marginTop: 30 }}
              mode="contained"
              onPress={() => setModalVisible(!modalVisible)}
            >
              Fechar
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomModal;
