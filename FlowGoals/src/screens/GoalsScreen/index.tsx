import React, { useEffect } from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import {
  Layout,
  TopNav,
} from 'react-native-rapi-ui';
import { useQuery } from 'react-query';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

import { GoalsScreenProp } from '../../navigation/types';
import GoalsList from './GoalsList';
import { colors } from '../../components/utils/Colors';
import { QUERY_GET_GOALS } from '../../services/sqliteService';
import { Goal } from '../../interfaces/IGoal';

export default function Goals(props: GoalsScreenProp) {
  const { navigation } = props;
  //   const auth = getAuth();

  const {
    data, isError, error,
  } = useQuery<Goal[]>('queryGetGoals', QUERY_GET_GOALS);

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
        { data && data.length !== 0 ? <GoalsList goals={data} />
          : (
            <View style={{ marginHorizontal: 30 }}>
              <Text style={{ fontSize: 25, textAlign: 'center' }}>You don&apos;t have any goals right now</Text>
            </View>
          )}
      </View>
    </Layout>
  );
}
