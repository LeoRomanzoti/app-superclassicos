import React from "react";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

const TeamName = ({ value, setValue, handleCreateTeam }) => {
  return (
    <View>
      <TextInput
        label="Digite o nome do seu time.."
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <Button onPress={() => handleCreateTeam()} mode="contained">Criar time</Button>
    </View>
  );
};

export default TeamName;
