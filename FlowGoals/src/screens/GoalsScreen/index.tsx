import React from 'react';
import { View } from 'react-native';
import {
  Layout,
  TopNav,
} from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { GoalsScreenProp } from '../../navigation/types';
import GoalsList from './GoalsList';
import { colors } from '../../components/utils/Colors';

export default function Goals(props: GoalsScreenProp) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { navigation } = props;
  //   const auth = getAuth();
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
        <GoalsList />
      </View>
    </Layout>
  );
}
