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
  hasIcon = true,
  globalLoading = false
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
                let point = item;
                if (item?.point) {
                  point = item?.point
                }
                return (
                  <View key={point?.id} style={styles.listModal}>
                    <List.Item
                      style={styles.list}
                      title={point?.label}
                      right={(props) => (
                        <>
                          {hasIcon ? (<View style={styles.modalButton}>
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
                          </View>) : (<Text>{point?.value}</Text>)}
                        </>
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
              loading={globalLoading}
              disabled={globalLoading}
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
