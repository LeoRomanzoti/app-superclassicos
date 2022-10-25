import React, { useCallback, useContext, useEffect, useState } from "react";
import { View } from "react-native";

import TeamList from "../../components/TeamList";
import TeamName from "../../components/TeamName";
import { GlobalContext } from "../../contexts/global";
import { getGenericData } from "../../contexts/storage";
import api from "../../servers/api";
import { styles } from "./style";


const Team = () => {
  const { team, setTeam } = useContext(GlobalContext)
  const [teamName, setTeamName] = useState("");
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    async function loadTeam() {
      try {
        const user = await getGenericData('@user')
        const { data } = await api.get(`/users/${user?.id}/teams`)
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
      const user = await getGenericData('@user')
      const response = await api.post(`/users/${user?.id}/teams`, data)
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
