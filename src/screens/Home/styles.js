import { StyleSheet } from "react-native";

export const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    input: {
      backgroundColor: "#e4e4e4",
      width: "90%",
      marginBottom: 14,
      fontSize: 22,
      borderRadius: 7,
      padding: 10,
    },

    buttonCode: {
      backgroundColor: colors.primary,
    },

    button: {
      backgroundColor: colors.primary,
    },

    image: {
      width: 280,
      height: 280,
      borderRadius: 300 / 2,
    },

    title: {
      fontSize: 20,
      textAlign: "center",
      color: colors.primary,
      fontWeight: "bold",
    },

    subTitle: {
      fontSize: 14,
      fontWeight: "300",
      textAlign: "center",
    },

    index: {
      marginBottom: 15,
    },

    middle: {
      marginBottom: 15,
    },
  });
