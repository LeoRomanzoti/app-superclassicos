import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { List } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome5';
import api from "../../servers/api";
import { styles } from "./style";

import { FlatList } from "react-native-gesture-handler";

const League = () => {
  const [ranking, setRanking] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    async function loadLeague() {
      const { data } = await api.get("/ranking");
      setRanking([...data])
      setRefreshing(false)
    }
    loadLeague();
  }, [refreshing]);

  const handleStar = useCallback((index) => {
    let configStar = {
      icon: null,
      color: null,
      size: 16
    }
    if (index == 0) {
      configStar.icon = "star"
      configStar.color = "gold"
      configStar.size = 30
    }
    if (index === 1) {
      configStar.icon = "star"
      configStar.color = "silver"
    }
    if (index === 2) {
      configStar.icon = "star"
      configStar.color = "#CD7F32"
    }
    return configStar
  }, [refreshing])

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatBottom}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        data={ranking}
        keyExtractor={(team) => team?.id}
        renderItem={({ item, index }) => {
          let configStar = handleStar(index)
          return (
            <List.Item
              key={item?.id}
              title={item?.name}
              right={(props) => <Text style={{ fontSize: 18 }}>{item?.score}</Text>}
              left={(props) => configStar?.icon ? <Icon solid name="medal" icon="star" color={configStar?.color} style={{ fontSize: configStar?.size }} /> : <></>}
            />
          );
        }}
      />
      {/* <List.Item
        title="Nome do Time"
        titleStyle={{ fontSize: 23 }}
        right={(props) => <Text>Pontos</Text>}
        left={(props) => <IconButton icon="star" iconColor="gold" size={30} />}
      />
      <List.Item
        title="Nome do Time"
        right={(props) => <Text>Pontos</Text>}
        left={(props) => <IconButton icon="star" iconColor="silver" />}
      />
      <List.Item
        title="Nome do Time"
        right={(props) => <Text>Pontos</Text>}
        left={(props) => <IconButton icon="star" iconColor="#CD7F32" />}
      /> */}
    </View>
  );
};

export default League;
