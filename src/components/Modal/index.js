import React from "react";
import { Modal, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
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
            <FlatList
              data={pointsList}
              keyExtractor={(point) => point?.id}
              renderItem={({ item, index }) => {
                return (
                  <View key={item?.id} style={styles.listModal}>
                    <List.Item
                      style={styles.list}
                      title={item?.label}
                      right={(props) => (
                        <View style={styles.modalButton}>
                          <IconButton
                            onPress={() =>
                              handleAddPoint(
                                item?.id,
                                item?.value,
                                player?.chosenPlayerId,
                                item?.label
                              )
                            }
                            icon="plus"
                            iconColor="white"
                          />
                        </View>
                      )}
                    />
                  </View>
                );
              }}
            />
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
