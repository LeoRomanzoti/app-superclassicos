import React from "react";
import { View } from "react-native";
import { TextInput, Button } from "react-native-paper";

const TeamName = ({ value, setValue }) => {
  return (
    <View>
      <TextInput
        label="Digite o nome do seu time.."
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <Button mode="contained">Criar time</Button>
    </View>
  );
};

export default TeamName;
