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
      width: 320,
      marginBottom: 14,
      fontSize: 22,
      borderRadius: 7,
      padding: 10,
      marginTop: 14,
    },

    buttonCode: {
      backgroundColor: colors.primary,
      width: 320,
      marginBottom: 14,
    },

    button: {
      backgroundColor: colors.primary,
      width: 320,
      marginBottom: 14,
    },

    image: {
      width: 230,
      height: 230,
      borderRadius: 300 / 2,
    },

    title: {
      fontSize: 18,
      textAlign: "center",
      color: colors.primary,
      fontWeight: "bold",
      marginTop: 7,
    },

    subTitle: {
      fontSize: 14,
      fontWeight: "300",
      textAlign: "center",
      color: colors.tertiary,
      marginBottom: 7,
    },

    index: {
      marginBottom: 20,
      backgroundColor: "white",
      borderRadius: 10,
      width: 350,
    },

    middle: {
      marginBottom: 20,
      backgroundColor: "white",
      width: 350,
      borderRadius: 15,
      alignItems: "center",
    },
    inputView: {
      backgroundColor: "white",
      width: 350,
      borderRadius: 15,
      alignItems: "center",
    },
  });
