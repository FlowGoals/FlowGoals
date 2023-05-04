import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Layout,
  TopNav,
} from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { MainTabsParamList } from '../../navigation/types';
import GoalsList from './GoalsList';
import { colors } from '../../components/utils/Colors';

export default function Goals({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  route,
}: NativeStackScreenProps<MainTabsParamList, 'Goals'>) {
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
        // rightAction={() => {
        //   if (isDarkmode) {
        //     setTheme('light');
        //   } else {
        //     setTheme('dark');
        //   }
        // }}
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
