import React from "react";
import { View } from "react-native";
import { Button, TextInput, useTheme } from "react-native-paper";
import { makeStyles } from "./style";


const TeamName = ({ value, setValue, handleCreateTeam }) => {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <View>
      <TextInput
        label="Digite o nome do seu time.."
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <Button style={styles.button} disabled={value.length === 0} onPress={() => handleCreateTeam()} mode="contained">Criar time</Button>
    </View>
  );
};

export default TeamName;
