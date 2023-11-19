import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Goal } from '@prisma/client';

// not in use until auth
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

// for each MainStack.screen
export type MainStackParamList = {
  MainTabs: undefined;
  settings: undefined;
  faq: undefined;
  newgoal: undefined;
  completedgoals: undefined;
  sqliteInterface: undefined;
  editgoal: { goal: Goal };
};

// route params for each Tabs.screen
export type MainTabsParamList = {
  friends: undefined;
  profile: undefined;
  goals: undefined;
};

// AuthStack.screen component props
export type LoginProp = NativeStackScreenProps<AuthStackParamList, 'Login'>;

export type SignUpProp = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

// MainStack.screen component props
export type SettingsProp = NativeStackScreenProps<
MainStackParamList,
'settings'
>;

export type FAQProp = NativeStackScreenProps<
MainStackParamList,
'faq'
>;

export type NewGoalProp = NativeStackScreenProps<
MainStackParamList,
'newgoal'
>;

export type SqliteInterfaceProps = NativeStackScreenProps<
MainStackParamList,
'sqliteInterface'
>;

export type EditGoalProp = NativeStackScreenProps<
MainStackParamList,
'editgoal'
>;

export type CompletedGoalsProp = NativeStackScreenProps<
MainStackParamList,
'completedgoals'
>;

// Tabs.screen component props
export type GoalsScreenProp = CompositeScreenProps<
BottomTabScreenProps<MainTabsParamList, 'goals'>,
NativeStackScreenProps<MainStackParamList>
>;

export type FriendsScreenProp = CompositeScreenProps<
BottomTabScreenProps<MainTabsParamList, 'friends'>,
NativeStackScreenProps<MainStackParamList>
>;

export type ProfileScreenProp = CompositeScreenProps<
BottomTabScreenProps<MainTabsParamList, 'profile'>,
NativeStackScreenProps<MainStackParamList>
>;
