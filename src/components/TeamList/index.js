import React from "react";
import {
  Animated,
  RefreshControl,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { IconButton, List, useTheme } from "react-native-paper";
import CustomModal from "../Modal";

import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";
import makeStyles from "./style";

const TeamList = ({ total, team, players, setRefreshing, refreshing, handleDeletePlayer, openModal, setOpenModal, points, player, handleOpenModal }) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <>
      <Text style={styles.teamName}>{team}</Text>
      <View style={styles.teamScore}>
        <Text style={styles.points}>Pontuação Total</Text>
        <Text style={styles.points}>{total}</Text>
      </View>

      <CustomModal
        modalVisible={openModal}
        setModalVisible={setOpenModal}
        pointsList={points}
        player={player}
        handleAddPoint={null}
        hasIcon={false}
      />

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
                    handleDeletePlayer={handleDeletePlayer}
                    id={item?.id}
                    score={item?.chosenPlayer?.score}
                  />
                )}
              >
                <View style={styles.box}>
                  <List.Item
                    onPress={() => handleOpenModal(item?.chosenPlayer)}
                    style={styles.list}
                    title={playerData?.name}
                    description={playerData?.position}
                    right={(props) => <Text>{point}</Text>}
                  />
                </View>
              </Swipeable>
            </GestureHandlerRootView>
          );
        }}
      />
    </>
  );
};

// esse componente é o botão DELETAR que aparece quando fazemos o push para a lateral
const RenderRightActions = ({ progress, dragX, styles, handleDeletePlayer, id, score }) => {


  const scale = dragX.interpolate({
    inputRange: [-50, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <TouchableOpacity onPress={() => handleDeletePlayer(id, score)}>
      <Animated.View
        style={[styles.deleteButton, { transform: [{ scaleX: scale }] }]}
      >
        <IconButton iconColor="white" icon="delete" size={30} />
      </Animated.View>
    </TouchableOpacity>
  );
};

export default TeamList;
