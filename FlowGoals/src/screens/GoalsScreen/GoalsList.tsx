import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import GoalSwipe from './GoalSwipe';
import { colors } from '../../components/utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.white,
    paddingTop: 10,
  },
  preview: {
    flex: 1,
    height: 100,
    borderRadius: 10,
    // marginLeft: 10,
    // marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.columbiaBlue,
  },
});

const TEMPDATA = [
  {
    text: 'Item text 1',
  },
  {
    text: 'Item text 2',
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
              <GoalSwipe goal={item}>
                <Pressable style={styles.preview}>
                  <Text>{item.text}</Text>
                </Pressable>
              </GoalSwipe>
            </View>
          )) }
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
