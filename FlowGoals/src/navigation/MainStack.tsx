import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { MainStackParamList } from './types';
import Settings from '../screens/Profile/Settings';
import FAQ from '../screens/Profile/FAQ';
import NewGoal from '../screens/Goals/NewGoal';
import { CREATE_GOAL_TABLE } from '../services/localService';

const MainStack = createNativeStackNavigator<MainStackParamList>();
function Main() {
  useEffect(() => {
    CREATE_GOAL_TABLE().catch((err) => console.log(err?.message));
  }, []);
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="MainTabs" component={MainTabs} />
      <MainStack.Screen name="settings" component={Settings} />
      <MainStack.Screen name="faq" component={FAQ} />
      <MainStack.Screen
        name="newgoal"
        component={NewGoal}
        options={{ animation: 'fade_from_bottom' }}
      />

    </MainStack.Navigator>
  );
}

export default Main;
