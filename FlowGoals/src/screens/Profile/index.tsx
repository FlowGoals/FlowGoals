import React from 'react';
import {
  View, ScrollView, Pressable, StyleSheet,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Layout, Text,
} from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { MainTabsParamList } from '../../navigation/types';
import { colors } from '../../components/utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    padding: 10,
    margin: 1,
    backgroundColor: colors.columbiaBlue,
  },
});

export default function Profile({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  route,
}: NativeStackScreenProps<MainTabsParamList, 'Profile'>) {
  return (
    <Layout>
      <ScrollView>
        <View style={{ height: 200, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Profile Pic</Text>
        </View>
        <Pressable
          style={styles.container}
          // onPress={() => {
          //   navigation.navigate('Settings');
          // }}
        >
          <Text>Settings</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
          />
        </Pressable>
        <Pressable style={styles.container}>
          <Text>FAQ</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
          />
        </Pressable>
      </ScrollView>
    </Layout>
  );
}
