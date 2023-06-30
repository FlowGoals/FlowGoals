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
import { Goal } from '@prisma/client';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-rapi-ui';
import WheelPicker from 'react-native-wheely';
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
    flex: 0.5,
    marginHorizontal: 50,
    marginTop: 100,
    backgroundColor: colors.gray100,
    borderRadius: 20,
    padding: 30,
  },
});

type GoalSwipeProps = {
  children: React.ReactNode
  goal: Goal
  navigation: GoalsScreenProp['navigation']
};

function GoalSwipe({ children, goal, navigation }: GoalSwipeProps) {
  const swipeableRowRef = useRef<Swipeable>(null);
  const queryClient = useQueryClient();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [logModalVisible, setLogModalVisible] = useState(false);
  const [logIndex, setLogIndex] = useState(0);

  const showDeleteDialog = () => {
    setDeleteModalVisible(true);
  };

  const handleCancelDelete = () => {
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

  const renderLogModal = (swipeDirection: string) => {
    if (swipeDirection === 'right') {
      setLogModalVisible(true);
    }
  };

  const handleLogGoal = () => {
    console.log('log goal');
    queryClient.invalidateQueries('queryGetGoals');
    setLogModalVisible(false);
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRowRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={120}
        renderLeftActions={renderLeftButtons}
        renderRightActions={renderRightActions}
        onSwipeableWillOpen={renderLogModal}
      >
        <Dialog.Container visible={deleteModalVisible}>
          <Dialog.Title>Delete Goal</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this goal? You cannot undo this action.
          </Dialog.Description>
          <Dialog.Button label="Cancel" onPress={handleCancelDelete} />
          <Dialog.Button label="Delete" onPress={handleDeleteGoal} />
        </Dialog.Container>
        <View>
          <Modal
            animationType="slide"
            transparent
            visible={logModalVisible}
            onRequestClose={() => {
              setLogModalVisible(!logModalVisible);
            }}
          >

            <View style={styles.modalView}>
              <View style={{ position: 'absolute', top: 10, right: 10 }}>
                <Ionicons
                  name="close-outline"
                  size={40}
                  color={colors.dark100}
                  onPress={() => setLogModalVisible(!logModalVisible)}
                />
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <WheelPicker
                  selectedIndex={logIndex}
                  // options={Array.from(
                  //   { length: goal.targetValue - goal.startValue + 1 },
                  //   (_, index) => String(goal.startValue + index),
                  // )}
                  options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
                  onChange={(index) => setLogIndex(index)}
                  containerStyle={{
                    backgroundColor: colors.columbiaBlue,
                    borderRadius: 20,
                    marginBottom: 15,
                    width: 100,
                  }}
                />
              </View>
              <View>
                <Button text="Done" onPress={handleLogGoal} />
              </View>
            </View>
          </Modal>
        </View>
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
}

export default GoalSwipe;
