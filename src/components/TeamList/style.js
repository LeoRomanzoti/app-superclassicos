import { StyleSheet } from "react-native";

const makeStyles = (colors) =>
  StyleSheet.create({
    deleteButton: {
      backgroundColor: colors.error,
      marginTop: 4,
      marginBottom: 4,
      borderTopEndRadius: 5,
      borderBottomEndRadius: 5,
      justifyContent: "center",
      alignItems: "center",
      width: 80,
    },
    teamName: {
      textAlign: "center",
      fontSize: 25,
      fontWeight: "bold",
      color: colors.tertiary,
    },
    teamScore: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    flatBottom: { paddingBottom: 30 },
    points: {
      fontSize: 20,
      fontWeight: "bold",
      color: colors.primary,
      paddingBottom: 10,
      paddingTop: 10,
    },
    divider: {
      borderRadius: 15,
      paddingBottom: 7,
      color: colors.secondary,
    },
    list: {
      backgroundColor: "#e4e4e4",
      borderRadius: 15,
    },
    box: { paddingBottom: 2 },
  });

export default makeStyles;
