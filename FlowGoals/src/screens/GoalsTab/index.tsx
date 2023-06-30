import React, { useEffect } from 'react';
import {
  View, SafeAreaView, Text, StyleSheet, Pressable, ScrollView,
} from 'react-native';
import {
  Layout,
  TopNav,
} from 'react-native-rapi-ui';
import { useQuery } from 'react-query';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { Prisma } from '@prisma/client';
import { GoalsScreenProp } from '../../navigation/types';
import GoalSwipe from './GoalSwipe';
import GoalShape from './GoalShape';

import { colors } from '../../components/utils/Colors';
import { QUERY_GET_GOALS } from '../../services/sqliteService';

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

const fillVal = (start: number, cur: number, end: number) => ((cur - start) / (end - start)) * 100;

export default function Goals({ navigation } : GoalsScreenProp) {
  //   const auth = getAuth();

  const {
    data, isError, error,
  } = useQuery<Prisma.GoalCreateInput[]>('queryGetGoals', QUERY_GET_GOALS);

  const errorMessage = error instanceof Error ? error.message : 'An error occurred';
  useEffect(() => {
    if (isError) {
      console.log('error fetching goals', errorMessage);
    }
  }, [isError]);

  return (
    <Layout>
      <TopNav
        middleContent="Dashboard"
        leftContent={(
          <Ionicons
            name="grid"
            size={20}
            color={colors.dark100}
          />
        )}
        rightContent={(
          <Ionicons
            name="add"
            size={30}
            color={colors.dark100}
          />
        )}
        height={50}
        rightAction={() => {
          navigation.navigate('newgoal');
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isError && (
          <View>
            <StatusBar />
            <SafeAreaView style={{ flex: 1 }}>
              <Text>Unable to fetch goals. Please reload app</Text>
            </SafeAreaView>
          </View>
        )}
        { data && data.length !== 0
          ? (
            <View style={styles.container}>
              <StatusBar />
              <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ marginHorizontal: 10 }}>
                  {data.map((goal) => (
                    <View key={goal.title} style={{ marginBottom: 10 }}>
                      <GoalSwipe goal={goal} navigation={navigation}>
                        <Pressable style={styles.preview}>
                          <View style={{ flex: 1 }}>
                            <GoalShape
                              size={75}
                              width={15}
                              mainColor={goal.color}
                              fill={fillVal(goal.startValue, goal.currentValue, goal.targetValue)}
                            />
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.nameText}>{goal.title}</Text>
                          </View>
                          <View style={{ flex: 0.5, flexDirection: 'row' }}>
                            <Text>{`${goal.currentValue} / ${goal.endValue}`}</Text>
                          </View>
                        </Pressable>
                      </GoalSwipe>
                    </View>
                  )) }
                </ScrollView>
              </SafeAreaView>
            </View>
          )
          : (
            <View style={{ marginHorizontal: 30 }}>
              <Text style={{ fontSize: 25, textAlign: 'center' }}>You don&apos;t have any goals right now</Text>
            </View>
          )}
      </View>
    </Layout>
  );
}
