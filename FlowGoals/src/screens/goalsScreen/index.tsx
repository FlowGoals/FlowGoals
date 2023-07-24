import React, { useContext, useEffect } from 'react';
import {
  View, SafeAreaView, Text, Pressable, ScrollView,
} from 'react-native';
import {
  Layout,
  TopNav,
} from 'react-native-rapi-ui';
import { useQuery } from 'react-query';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { Goal } from '@prisma/client';
import { AxiosError } from 'axios';
import tinycolor from 'tinycolor2';
import { GoalsScreenProp } from '../../navigation/types';
import GoalSwipe from './GoalSwipe';
import GoalShape from './GoalShape';
import { colors } from '../../components/utils/Colors';
import { getGoals } from '../../services/axiosService';
import AuthContext from '../../context/AuthContext';
import styles from '../../components/utils/styles';

const fillVal = (start: number, cur: number, end: number) => ((
  Math.abs(cur - start) / Math.abs(end - start)) * 100
);

const backgroundColor = (mainColor: string) => (tinycolor(mainColor).lighten(30).toHexString());

export default function Goals({ navigation } : GoalsScreenProp) {
  const { user } = useContext(AuthContext);
  const {
    data, isError, error,
  } = useQuery<Goal[]>('queryGetGoals', () => getGoals(user!.id));

  useEffect(() => {
    const errorMessage = error instanceof AxiosError ? error.message : 'An error occurred';
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
            <View style={styles.previewContainer}>
              <StatusBar />
              <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ marginHorizontal: 10 }}>
                  {data.map((goal) => (
                    <View key={goal.title} style={{ marginBottom: 10 }}>
                      <GoalSwipe goal={goal} navigation={navigation}>
                        <Pressable style={styles.preview}>
                          <View style={{ flex: 0.2 }}>
                            <Ionicons
                              name="chevron-back"
                              size={20}
                              color={colors.dark100}
                            />
                          </View>
                          <View style={{ flex: 0.8 }}>
                            <GoalShape
                              size={75}
                              width={15}
                              mainColor={goal.color}
                              bgColor={backgroundColor(goal.color)}
                              fill={fillVal(goal.startValue, goal.currentValue, goal.targetValue)}
                            />
                          </View>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.nameText}>{goal.title}</Text>
                          </View>
                          <View style={{
                            flex: 0.6, height: 75, justifyContent: 'center', alignItems: 'center',
                          }}
                          >
                            <View style={{
                              position: 'absolute', bottom: 1, left: 1, borderRadius: 20, backgroundColor: backgroundColor(goal.color), width: 30, height: 30, justifyContent: 'center', alignItems: 'center',
                            }}
                            >
                              <Text style={{ color: colors.white }}>{goal.currentValue}</Text>
                            </View>
                            <Ionicons
                              name="trending-up-outline"
                              size={24}
                              color={colors.dark100}
                            />
                            <View style={{
                              position: 'absolute', top: 1, right: 1, borderRadius: 20, backgroundColor: goal.color, width: 30, height: 30, justifyContent: 'center', alignItems: 'center',
                            }}
                            >
                              <Text style={{ color: colors.white }}>
                                {goal.targetValue}

                              </Text>
                            </View>
                          </View>
                          <View style={{ flex: 0.2 }}>
                            <Ionicons
                              name="chevron-forward"
                              size={20}
                              color={colors.dark100}
                            />
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
