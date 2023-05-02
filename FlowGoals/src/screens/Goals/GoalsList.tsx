import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
} from 'react-native';
import GoalPreview from './GoalPreview';
import { colors } from '../../components/utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.dark100,
    paddingTop: 10,
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 18,
    color: '#f4f4f4',
    marginTop: 20,
    marginBottom: 5,
  },
});

const TEMPDATA = [
  {
    text: 'Item text 1',
  },
  {
    text: 'Item text 2',
  },

  {
    text: 'Item text 3',
  },
  {
    text: 'Item text 4',
  },
  {
    text: 'Item text 5',
  },
  {
    text: 'Item text 1',
  },
  {
    text: 'Item text 2',
  },

  {
    text: 'Item text 3',
  },
  {
    text: 'Item text 4',
  },
  {
    text: 'Item text 5',
  },
  {
    text: 'Item text 1',
  },
  {
    text: 'Item text 2',
  },

  {
    text: 'Item text 3',
  },
  {
    text: 'Item text 4',
  },
  {
    text: 'Item text 5',
  },
  {
    text: 'Item text 1',
  },
  {
    text: 'Item text 2',
  },

  {
    text: 'Item text 3',
  },
  {
    text: 'Item text 4',
  },
  {
    text: 'Item text 5',
  },
  {
    text: 'Item text 1',
  },
  {
    text: 'Item text 2',
  },

  {
    text: 'Item text 3',
  },
  {
    text: 'Item text 4',
  },
  {
    text: 'Item text 5',
  },
  {
    text: 'Item text 1',
  },
  {
    text: 'Item text 2',
  },

  {
    text: 'Item text 3',
  },
  {
    text: 'Item text 4',
  },
  {
    text: 'Item text 5',
  },
];

export default function GoalsList() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={TEMPDATA}
          numColumns={3}
          renderItem={({ item }) => <GoalPreview goal={item} />}
        />
      </SafeAreaView>
    </View>
  );
}
