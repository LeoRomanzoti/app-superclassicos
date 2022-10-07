import React, { useState } from "react";
import { View, Text } from "react-native";

import TeamList from "../../components/TeamList";
import TeamName from "../../components/TeamName";
import { styles } from "./style";

const ajhsdgkusahdkaush = "L70";

const Team = () => {
  const [teamName, setTeamName] = useState("");
  return (
    <View style={styles.container}>
      {ajhsdgkusahdkaush ? (
        <TeamList total={100} team="123131" />
      ) : (
        <TeamName value={teamName} setValue={setTeamName} />
      )}
    </View>
  );
};

export default Team;
