import React, { useRef, useState } from 'react';
import {
  View, StyleSheet, Animated, Modal,
} from 'react-native';
import {
  RectButton, Swipeable, GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';
import { useQueryClient } from 'react-query';
import { SQLError } from 'expo-sqlite';
import { Prisma } from '@prisma/client';
import { Ionicons } from '@expo/vector-icons';
import { MUTATION_DELETE_GOAL } from '../../services/sqliteService';
import { GoalsScreenProp } from '../../navigation/types';
import { colors } from '../../components/utils/Colors';

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#98fb98',
    borderRadius: 10,
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    backgroundColor: 'transparent',
    padding: 5,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
  },
  modalView: {
    flex: 0.75,
    marginTop: 75,
    marginBottom: 0,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

type GoalSwipeProps = {
  children: React.ReactNode
  goal: Prisma.GoalCreateInput
  navigation: GoalsScreenProp['navigation']
};

function GoalSwipe({ children, goal, navigation }: GoalSwipeProps) {
  const swipeableRowRef = useRef<Swipeable>(null);
  const queryClient = useQueryClient();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  // const [logModalVisible, setLogModalVisible] = useState(false);

  const showDeleteDialog = () => {
    setDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setDeleteModalVisible(false);
  };

  const handleDeleteGoal = async () => {
    const goalName = goal.title;
    await MUTATION_DELETE_GOAL(goalName)
      .then((res) => {
        console.log(res);
      })
      .catch((err: SQLError) => {
        console.log(err.message);
      });
    // invalidate query "queryGetGoals" in cache to trigger refetch
    queryClient.invalidateQueries('queryGetGoals');
    setDeleteModalVisible(false);
  };

  const closeSwipe = () => {
    swipeableRowRef.current?.close();
  };

  const renderLeftButton = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation<string | number>,
    onPress: () => void,
  ) => {
    progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={onPress}
        >
          <Animated.Text style={styles.actionText}>{text}</Animated.Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderLeftButtons = (progress: Animated.AnimatedInterpolation<string | number>) => (
    <View style={{ width: 110, flexDirection: 'row' }}>
      {renderLeftButton('Edit', '#FFB74D', 128, progress, () => {
        closeSwipe();
        navigation.navigate('editgoal', { goal });
      })}
      {renderLeftButton('Delete', '#FF5252', 64, progress, showDeleteDialog)}
    </View>
  );

  const renderRightActions = (dragX: Animated.AnimatedInterpolation<string | number>) => {
    dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 100],
    });
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton style={styles.leftAction} onPress={closeSwipe} />
      </Animated.View>

    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRowRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={40}
        renderLeftActions={renderLeftButtons}
        renderRightActions={renderRightActions}
      >
        <Dialog.Container visible={deleteModalVisible}>
          <Dialog.Title>Delete Goal</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this goal? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={handleCancel} />
          <Dialog.Button label="Delete" onPress={handleDeleteGoal} />
        </Dialog.Container>
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
}

export default GoalSwipe;
