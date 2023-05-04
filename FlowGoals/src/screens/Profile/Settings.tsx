import React from 'react';
import {
  Layout, Text,
} from 'react-native-rapi-ui';
import {
  ScrollView, Pressable, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

export default function Settings() {
  return (
    <Layout>
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
      </ScrollView>
    </Layout>
  );
}
