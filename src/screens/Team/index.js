import React, { useCallback, useContext, useEffect, useState } from "react";
import { Alert, View } from "react-native";

import TeamList from "../../components/TeamList";
import TeamName from "../../components/TeamName";
import { GlobalContext } from "../../contexts/global";
import api from "../../servers/api";
import { styles } from "./style";


const Team = () => {
  const { userId, team, setTeam, authHeader, token } = useContext(GlobalContext)
  const [teamName, setTeamName] = useState("");
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    async function loadTeam() {
      try {
        const { data } = await api.get(`/users/${userId}/teams`, {
          headers: { "Authorization": `Bearer ${token}` }
        })
        Alert.alert(data.name)
        setTeam(data)
      } catch (error) {
        console.log(error)
      }
      setRefreshing(false)
    }
    loadTeam()
  }, [refreshing])

  const handleCreateTeam = useCallback(async () => {
    try {
      const data = { team_name: teamName }
      const response = await api.post(`/users/${userId}/teams`, data, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      setTeam(response.data)
    } catch (error) {
      console.log(error)
    }
  }, [teamName])

  return (
    <View style={styles.container}>
      {team?.corneteiroTeamId ? (
        <TeamList
          total={team.score}
          team={team.name}
          players={team.players}
          setRefreshing={setRefreshing}
          refreshing={refreshing}
        />
      ) : (
        <TeamName
          value={teamName}
          setValue={setTeamName}
          handleCreateTeam={handleCreateTeam}
        />
      )}
    </View>
  );
};

export default Team;
