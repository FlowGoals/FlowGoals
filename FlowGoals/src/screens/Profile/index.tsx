import React from 'react';
import {
  View, ScrollView, Pressable, StyleSheet,
} from 'react-native';
import {
  Layout, Text,
} from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { ProfileScreenProp } from '../../navigation/types';
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

export default function Profile(props: ProfileScreenProp) {
  const { navigation } = props;
  return (
    <Layout>
      <ScrollView>
        <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Profile Pic</Text>
        </View>
        <View style={{ alignItems: 'center', margin: 20 }}>
          <Text>Display Awards Here</Text>
        </View>
        <Pressable
          style={styles.container}
          onPress={() => {
            navigation.navigate('settings');
          }}
        >
          <Text>Settings</Text>
          <Ionicons
            name="chevron-forward-outline"
            size={20}
          />
        </Pressable>
        <Pressable
          style={styles.container}
          onPress={() => {
            navigation.navigate('faq');
          }}
        >
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
