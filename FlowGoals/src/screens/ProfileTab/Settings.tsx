import React from 'react';
import {
  Layout, Text, TopNav,
} from 'react-native-rapi-ui';
import {
  ScrollView, Pressable, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../components/utils/Colors';
import { SettingsProp } from '../../navigation/types';

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

export default function Settings(props: SettingsProp) {
  const { navigation } = props;
  return (
    <Layout backgroundColor={colors.white}>
      <TopNav
        middleContent="Settings"
        leftContent={(
          <Ionicons
            name="arrow-back-outline"
            size={20}
            color={colors.dark100}
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
        height={50}
      />
      <ScrollView>
        <Pressable
          style={styles.container}
        >
          <Text>Notifications</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
          />
        </Pressable>
        <Pressable style={styles.container}>
          <Text>Theme</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
          />
        </Pressable>
        {(process.env.ENV === 'local' || process.env.ENV === 'dev')
        && (
          <Pressable
            style={styles.container}
            onPress={() => {
              navigation.navigate('sqliteInterface');
            }}
          >
            <Text>Sqlite Interface</Text>
            <Ionicons
              name="chevron-forward-outline"
              size={20}
            />
          </Pressable>
        )}
      </ScrollView>
    </Layout>
  );
}
