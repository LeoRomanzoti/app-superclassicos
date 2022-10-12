import React from "react";
import { View } from "react-native";
import { List, useTheme, IconButton } from "react-native-paper";
import { makeStyles } from "./style";

const CardPlayer = ({ title, description, addPlayer }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.box}>
      <List.Item
        title={title}
        description={description}
        style={styles.list}
        right={(props) => (
          <View style={styles.button}>
            <IconButton onPress={addPlayer} icon="plus" iconColor="white" />
          </View>
        )}
      />
    </View>
  );
};

export default CardPlayer;
