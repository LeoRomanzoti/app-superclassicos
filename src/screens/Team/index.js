import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";

import TeamList from "../../components/TeamList";
import TeamName from "../../components/TeamName";
import api from "../../servers/api";
import { styles } from "./style";

const userId = '35fe8001-a6d5-4d43-8fb5-cf1278c9211f'

const Team = () => {
  const [teamName, setTeamName] = useState("");

  const [team, setTeam] = useState(null)

  useEffect(() => {
    async function loadTeam() {
      try {
        const { data } = await api.get(`/users/${userId}/teams`)
        setTeam(data)

      } catch (error) {
        console.log(error)
      }
    }
    loadTeam()
  }, [])

  const handleCreateTeam = useCallback(async () => {
    try {
      const data = { team_name: teamName }
      const response = await api.post(`/users/${userId}/teams`, data)
      setTeam(response.data)

    } catch (error) {
      console.log(error)
    }
  }, [teamName])

  return (
    <View style={styles.container}>
      {team ? (
        <TeamList total={team.score} team={team.name} players={team.players} />
      ) : (
        <TeamName value={teamName} setValue={setTeamName} handleCreateTeam={handleCreateTeam} />
      )}
    </View>
  );
};

export default Team;
