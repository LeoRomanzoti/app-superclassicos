import { StyleSheet } from "react-native";

export const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    input: {
      backgroundColor: "#e4e4e4",
      alignSelf: 'stretch',
    },

    helper: {
    },


    image: {
      width: 230,
      height: 230,
      borderRadius: 300 / 2,
    },


    index: {
      marginBottom: 0,
      backgroundColor: "#c8102e",
      flex: 0.65,
      alignItems: "center",
      justifyContent: "center",
    },

    bottom: {
      margin: 40
    },
    inputView: {
      flex: 1,
    },
  });
