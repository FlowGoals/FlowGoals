import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import GoalSwipe from './GoalSwipe';
import GoalShape from './GoalShape';
import { colors } from '../../components/utils/Colors';
import { GoalsListProps } from '../../navigation/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    paddingTop: 10,
  },
  preview: {
    flex: 1,
    flexDirection: 'row',
    height: 100,
    borderRadius: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.columbiaBlue,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default function GoalsList(props: GoalsListProps) {
  const fillVal = (cur: number, end: number) => (cur / end) * 100;
  const { goals } = props;
  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ marginHorizontal: 10 }}>
          {goals?.map((goal) => (
            <View key={goal.name} style={{ marginBottom: 10 }}>
              <GoalSwipe>
                <Pressable style={styles.preview}>
                  <View style={{ flex: 1 }}>
                    <GoalShape
                      size={75}
                      width={15}
                      mainColor={goal.color}
                      fill={fillVal(goal.current, goal.end)}
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.nameText}>{goal.name}</Text>
                  </View>
                  <View style={{ flex: 0.5, flexDirection: 'row' }}>
                    <Text>{`${goal.current} / ${goal.end}`}</Text>
                  </View>
                </Pressable>
              </GoalSwipe>
            </View>
          )) }
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
