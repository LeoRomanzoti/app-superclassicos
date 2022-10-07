import React from "react";
import { Alert, Modal, StyleSheet, View } from "react-native";
import { List, IconButton, Button } from "react-native-paper";

const CustomModal = ({ modalVisible, setModalVisible }) => {
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
            <List.Item
              title="Gol"
              right={(props) => <IconButton icon="plus" />}
            />
            <List.Item
              title="Falta"
              right={(props) => <IconButton icon="plus" />}
            />
            <List.Item
              title="Penalti Cometido"
              right={(props) => <IconButton icon="plus" />}
            />
            <List.Item
              title="Penalti Sofrido"
              right={(props) => <IconButton icon="plus" />}
            />
            <List.Item
              title="Penalti Defendido"
              right={(props) => <IconButton icon="plus" />}
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
