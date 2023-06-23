import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import { useQuery } from 'react-query';
import GoalSwipe from './GoalSwipe';
import GoalShape from './GoalShape';
import { colors } from '../../components/utils/Colors';
import { QUERY_GET_GOALS } from '../../services/sqliteService';
import { Goal } from '../../interfaces/IGoal';

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

export default function GoalsList() {
  const {
    data, isLoading, isError, error, refetch,
  } = useQuery<Goal[]>('queryGetGoals', QUERY_GET_GOALS);

  const errorMessage = error instanceof Error ? error.message : 'An error occurred';
  useEffect(() => {
    if (isError) {
      console.log('error fetching goals', errorMessage);
    }
  }, [isError]);

  const fillVal = (cur: number, end: number | undefined) => {
    if (end === undefined) {
      return 0;
    }
    return (cur / end) * 100;
  };

  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        {isError ? (
          <View>
            <StatusBar />
            <SafeAreaView style={{ flex: 1 }}>
              <Text>Unable to fetch goals. Please reload app</Text>
            </SafeAreaView>
          </View>
        )
          : !isLoading && (
            <ScrollView style={{ marginHorizontal: 10 }}>
              {data?.map((goal) => (
                <View key={goal.name} style={{ marginBottom: 10 }}>
                  <GoalSwipe>
                    <Pressable style={styles.preview}>
                      <View style={{ flex: 1 }}>
                        {/* Will need to change to account for one-time goals */}
                        <GoalShape
                          size={75}
                          width={15}
                          mainColor={colors.blue200}
                          fill={fillVal(goal.current, goal.end)}
                          backgroundColor={colors.gray100}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.nameText}>{goal.name}</Text>
                      </View>
                      <View style={{ flex: 0.5, flexDirection: 'row' }}>
                        <Text>{`${goal.interval} / ${goal.end}`}</Text>
                      </View>
                    </Pressable>
                  </GoalSwipe>
                </View>
              )) }
            </ScrollView>
          ) }
      </SafeAreaView>
    </View>
  );
}
