import { StyleSheet } from "react-native";

export const makeStyles = (theme) =>
  StyleSheet.create({
    container: {
      margin: theme.margins.short,
      flex: 1
    },
  });
