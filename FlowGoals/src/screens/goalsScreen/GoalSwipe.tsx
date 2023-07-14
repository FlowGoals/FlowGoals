import React, { useRef, useState } from 'react';
import {
  View, StyleSheet, Animated, Modal, Text,
} from 'react-native';
import {
  RectButton, Swipeable, GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Dialog from 'react-native-dialog';
import { useQueryClient } from 'react-query';
import { Prisma, Goal } from '@prisma/client';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-rapi-ui';
import WheelPicker from 'react-native-wheely';
import { GoalsScreenProp } from '../../navigation/types';
import { colors } from '../../components/utils/Colors';
import { deleteGoal, updateGoal } from '../../services/axiosService';

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: colors.green1,
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
    position: 'absolute',
    top: '20%',
    width: '70%',
    alignSelf: 'center',
    rowGap: 12,
    backgroundColor: colors.white,
    borderRadius: 20,
    borderColor: colors.blue2dark,
    borderWidth: 5,
    padding: '5%',
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
  const [logIndex, setLogIndex] = useState(goal.currentValue - goal.startValue);
  const logOptions = Array.from(
    { length: Math.abs(goal.targetValue - goal.startValue) + 1 },
    (_, index) => ((goal.startValue < goal.targetValue)
      ? goal.startValue + index : goal.startValue - index),
  ).map(String);
  const showDeleteDialog = () => {
    setDeleteModalVisible(true);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const handleDeleteGoal = async () => {
    try {
      await deleteGoal(goal.id);
    } catch (error) {
      console.log('Error deleting goal', error);
    }
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
      {renderLeftButton('Edit', colors.orange1, 128, progress, () => {
        closeSwipe();
        navigation.navigate('editgoal', { goal });
      })}
      {renderLeftButton('Delete', colors.red1, 64, progress, showDeleteDialog)}
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

  const closeLogModal = () => {
    setLogModalVisible(false);
    closeSwipe();
  };

  const handleLogGoal = async () => {
    const newCurrentValue: Prisma.GoalUpdateInput = {
      currentValue: (goal.targetValue < goal.startValue)
        ? goal.startValue - logIndex : goal.startValue + logIndex,
    };
    try {
      await updateGoal(goal.id, newCurrentValue);
    } catch (error) {
      console.log('Error logging goal', error);
    }
    // invalidate query "queryGetGoals" in cache to trigger refetch on GoalsScreen
    queryClient.invalidateQueries('queryGetGoals');
    closeLogModal();
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRowRef}
        friction={2}
        leftThreshold={30}
        rightThreshold={90}
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
              <Text style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' }}>Log Progress</Text>
              <View style={{ position: 'absolute', top: 5, right: 5 }}>
                <Ionicons
                  name="close-outline"
                  size={40}
                  color={colors.dark100}
                  onPress={closeLogModal}
                />
              </View>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <WheelPicker
                  selectedIndex={logIndex}
                  options={logOptions}
                  onChange={(index) => setLogIndex(index)}
                  containerStyle={{
                    backgroundColor: colors.white,
                    width: '100%',
                  }}
                  selectedIndicatorStyle={{
                    backgroundColor: colors.columbiaBlue, borderRadius: 20,
                  }}
                />
              </View>
              <View>
                <Button color={colors.blue2dark} text="Done" onPress={handleLogGoal} />
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
