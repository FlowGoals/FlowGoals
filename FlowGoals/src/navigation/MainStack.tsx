import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './MainTabs';
import { MainStackParamList } from './types';
import Settings from '../screens/settingsScreen';
import FAQ from '../screens/faqScreen';
import NewGoal from '../screens/newGoalScreen';
import SqliteInterface from '../screens/sqliteInterfaceScreen';
import EditGoal from '../screens/editGoalScreen';

const MainStack = createNativeStackNavigator<MainStackParamList>();
function Main() {
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
      <MainStack.Screen name="sqliteInterface" component={SqliteInterface} />
      <MainStack.Screen
        name="editgoal"
        component={EditGoal}
        options={{ animation: 'fade_from_bottom' }}
      />

    </MainStack.Navigator>
  );
}

export default Main;
