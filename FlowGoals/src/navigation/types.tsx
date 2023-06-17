import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// not in use until auth
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
};

// for each MainStack.screen
export type MainStackParamList = {
  MainTabs: undefined;
  settings: undefined;
  faq: undefined;
  newgoal: undefined;
};

// for each Tabs.screen
export type MainTabsParamList = {
  friends: undefined;
  profile: undefined;
  goals: undefined;
};

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
