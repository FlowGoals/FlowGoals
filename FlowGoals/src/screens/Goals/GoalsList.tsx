import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import GoalPreview from './GoalPreview';
import { colors } from '../../components/utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    paddingTop: 10,
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
];

export default function GoalsList() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          {TEMPDATA.map((item) => (
            <View key={item.text}>
              <GoalPreview goal={item} />
            </View>
          )) }
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
