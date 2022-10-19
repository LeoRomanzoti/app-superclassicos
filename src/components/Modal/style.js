import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    backgroundColor: "#F194FF",
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
  list: {
    backgroundColor: "#e4e4e4",
    borderRadius: 15,
  },
  modalButton: {
    backgroundColor: "#c8102e",
    borderRadius: 15,
  },
  listModal: { padding: 1 },
  player: {
    fontWeight: "bold",
    fontSize: 25,
    textAlign: "center",
    paddingBottom: 25,
  },
});
