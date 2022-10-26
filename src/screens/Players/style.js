import { StyleSheet } from "react-native";

export const makeStyles = (colors) =>
  StyleSheet.create({
    title: {
      fontSize: 30,
      textAlign: "center",
      color: colors.primary,
      fontWeight: "bold",
    },
    subTitle: {
      fontSize: 15,
      fontWeight: "300",
      textAlign: "center",
    },
    description: {
      fontSize: 13,
      fontWeight: "100",
      textAlign: "center",
      paddingBottom: 15,
    },
    name: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.primary,
      marginBottom: -10,
    },
    add: {
      fontSize: 22,
      fontWeight: "bold",
      color: colors.primary,
      alignSelf: "center",
    },
    position: {
      fontSize: 15,
      color: colors.secondary,
      fontWeight: "bold",
    },
    container: {
      margin: 10,
    },
    list: {
      backgroundColor: "#e4e4e4",
      borderRadius: 15,
    },
  });
