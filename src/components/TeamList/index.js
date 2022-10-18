import React, { useContext } from "react";
import {
  Animated,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Divider, IconButton, List, useTheme } from "react-native-paper";

import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GlobalContext } from "../../contexts/global";
import makeStyles from "./style";

const TeamList = ({ total, team, players, setRefreshing, refreshing }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View>
      <Text style={styles.teamName}>{team}</Text>
      <View style={styles.teamScore}>
        <Text style={styles.points}>Pontuação Total</Text>
        <Text style={styles.points}>{total}</Text>
      </View>
      <Divider style={styles.divider} />

      {/* NOVO JEITO DE FAZERMOS O .map() */}
      {/* PARA CONSEGUIRMOS TEM UM SCROLL PARA BAIXO NA NOSSA LISTA, PRECISAMOS
      USAR O COMPONENTE FLATLIST COMO ESTÁ ABAIXO
        - ele tem algumas propriedades obrigatórias como:
          - data
          - renderItem
          - keyExtractor
      */}
      <FlatList
        contentContainerStyle={styles.flatBottom}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => setRefreshing(true)}
          />
        }
        data={players}
        keyExtractor={(player) => player?.id}
        renderItem={({ item }) => {
          const playerData = item?.chosenPlayer?.player;
          const point = item?.chosenPlayer?.score;
          return (
            // Swipeable é o COMPONENTE que consegue fazer o efeito do "push" lateral
            <GestureHandlerRootView>
              <Swipeable
                key={item?.id}
                renderRightActions={(progress, dragX) => (
                  <RenderRightActions
                    progress={progress}
                    dragX={dragX}
                    styles={styles}
                  />
                )}
              >
                <List.Item
                  title={playerData?.name}
                  description={playerData?.position}
                  right={(props) => <Text>{point}</Text>}
                />
              </Swipeable>
            </GestureHandlerRootView>
          );
        }}
      />
    </View>
  );
};

// esse componente é o botão DELETAR que aparece quando fazemos o push para a lateral
const RenderRightActions = ({ progress, dragX, styles }) => {
  const { vibrate } = useContext(GlobalContext);

  const scale = dragX.interpolate({
    inputRange: [-50, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity onPress={vibrate}>
      <Animated.View
        style={[styles.deleteButton, { transform: [{ scaleX: scale }] }]}
      >
        <IconButton iconColor="white" icon="delete" size={30} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TeamList;
