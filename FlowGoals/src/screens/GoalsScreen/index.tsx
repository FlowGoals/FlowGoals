import React, { useEffect, useState } from 'react';
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
  const { navigation, route } = props;
  const { refresh } = route.params ?? {};
  //   const auth = getAuth();
  const [shouldFetch, setShouldFetch] = useState(refresh ?? false);

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery<Goal[]>('queryGetGoals', QUERY_GET_GOALS);

  console.log('refresh', refresh);

  const errorMessage = error instanceof Error ? error.message : 'An error occurred';
  useEffect(() => {
    if (isError) {
      console.log('error fetching goals', errorMessage);
    }
  }, [isError]);

  useEffect(() => {
    if (shouldFetch) {
      refetch();
      setShouldFetch(false);
    }
  }, [refresh, shouldFetch]);

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
        {isError ? (
          <View>
            <StatusBar />
            <SafeAreaView style={{ flex: 1 }}>
              <Text>Unable to fetch goals. Please reload app</Text>
            </SafeAreaView>
          </View>
        )
          : !isLoading && (
            <GoalsList goals={data} />
          )}
      </View>
    </Layout>
  );
}
