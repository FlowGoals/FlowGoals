import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F2',
    height: 150,
    margin: '2%',
    borderRadius: 10,
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#808080',
    fontWeight: 'bold',
  },
});

type GoalPreviewProps = {
  goal: {
    text: string
  }
};

function GoalPreview({ goal }: GoalPreviewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{goal.text}</Text>
    </View>
  );
}

export default GoalPreview;
