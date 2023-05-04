import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabBarIcon from './TabBarIcon';
import TabBarText from './TabBarText';
import { colors } from '../components/utils/Colors';
import { MainTabsParamList } from './types';

import Friends from '../screens/Friends';
import Profile from '../screens/Profile';
import Goals from '../screens/Goals';

const Tabs = createBottomTabNavigator<MainTabsParamList>();
function MainTabs() {
  const tabBarLabel = ({ focused, title }: { focused: boolean, title: string }) => (
    <TabBarText focused={focused} title={title} />
  );
  const tabBarIcon = ({ focused, icon }: { focused: boolean, icon: string }) => (
    <TabBarIcon focused={focused} icon={icon} />
  );
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopColor: colors.white,
          backgroundColor: colors.white,
        },
      }}
    >
      <Tabs.Screen
        name="goals"
        component={Goals}
        options={{
          tabBarLabel: ({ focused }) => tabBarLabel({ focused, title: 'Goals' }),
          tabBarIcon: ({ focused }) => tabBarIcon({ focused, icon: 'list' }),
        }}
      />
      <Tabs.Screen
        name="friends"
        component={Friends}
        options={{
          tabBarLabel: ({ focused }) => tabBarLabel({ focused, title: 'Friends' }),
          tabBarIcon: ({ focused }) => tabBarIcon({ focused, icon: 'people' }),
        }}
      />
      <Tabs.Screen
        name="profile"
        component={Profile}
        options={{
          tabBarLabel: ({ focused }) => tabBarLabel({ focused, title: 'Profile' }),
          tabBarIcon: ({ focused }) => tabBarIcon({ focused, icon: 'person' }),
        }}
      />
    </Tabs.Navigator>
  );
}

export default MainTabs;
