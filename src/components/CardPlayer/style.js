import { StyleSheet } from "react-native";

export const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      margin: 10,
    },
    list: {
      backgroundColor: "#e4e4e4",
      borderRadius: 15,
    },
    box: { paddingBottom: 2 },
    button: { backgroundColor: colors.primary, borderRadius: 20 },
  });
