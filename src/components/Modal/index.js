import React from "react";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import { Button, IconButton, List } from "react-native-paper";

const CustomModal = ({ modalVisible, setModalVisible, pointsList, player, handleAddPoint }) => {

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>{player?.player?.name}</Text>
            {pointsList.map(point => (

              <List.Item
                key={point?.id}
                title={point?.label}
                right={(props) => <IconButton onPress={() => handleAddPoint(point?.id, point?.value, player?.chosenPlayerId)} icon="plus" />}
              />
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

const styles = StyleSheet.create({
  centeredView: {
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
