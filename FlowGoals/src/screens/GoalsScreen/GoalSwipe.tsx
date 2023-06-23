import React, { useRef } from 'react';
import {
  View, StyleSheet, Animated,
} from 'react-native';
import {
  RectButton, Swipeable, GestureHandlerRootView, AnimatedInterpolation,
} from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    backgroundColor: '#45f248',
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
});

type GoalSwipeProps = {
  children: React.ReactNode
};

function GoalSwipe({ children }: GoalSwipeProps) {
  const swipeableRowRef = useRef<Swipeable>(null);

  const close = () => {
    swipeableRowRef.current?.close();
  };

  const renderLeftAction = (
    text: string,
    color: string,
    x: number,
    progress: AnimatedInterpolation<string | number>,
  ) => {
    progress.interpolate({
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

  const renderLeftActions = (progress: AnimatedInterpolation<string | number>) => (
    <View style={{ width: 110, flexDirection: 'row' }}>
      {renderLeftAction('Edit', '#ffab00', 128, progress)}
      {renderLeftAction('Delete', '#dd2c00', 64, progress)}
    </View>
  );

  const renderRightActions = (dragX: AnimatedInterpolation<string | number>) => {
    dragX.interpolate({
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
      >
        {children}
      </Swipeable>
    </GestureHandlerRootView>
  );
}

export default GoalSwipe;
