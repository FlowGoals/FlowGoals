import React, { useRef } from 'react';
import {
  View, StyleSheet, Text, Pressable, Animated,
} from 'react-native';
import {
  RectButton, Swipeable, GestureHandlerRootView, Gesture,
} from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../components/utils/Colors';

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  leftAction: {
    flex: 1,
    backgroundColor: '#45f248',
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
    justifyContent: 'center',
  },
});

type GoalPreviewProps = {
  goal: {
    text: string
  },
  children: React.ReactNode
};

function GoalSwipe({ goal, children }: GoalPreviewProps) {
  const swipeableRowRef = useRef<Swipeable>(null);

  const close = () => {
    swipeableRowRef.current?.close();
  };

  const renderLeftAction = (text: string, color: string, x: number, progress) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={close}
        >
          <Animated.Text style={styles.actionText}>{text}</Animated.Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderLeftActions = (progress) => (
    <View style={{ width: 110, flexDirection: 'row' }}>
      {renderLeftAction('Edit', '#ffab00', 128, progress)}
      {renderLeftAction('Delete', '#dd2c00', 64, progress)}
    </View>
  );

  const renderRightActions = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 100],
    });
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
        <RectButton style={styles.leftAction} onPress={close} />
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
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        containerStyle={styles.container}
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
}

export default GoalSwipe;
