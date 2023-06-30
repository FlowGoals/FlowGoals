import React from 'react';
import {
  View, ScrollView, Pressable, StyleSheet, Linking,
} from 'react-native';
import {
  Layout, Text, Button,
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

  const handleFeedback = () => {
    const feedbackFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLScAp7EEgq7wb-XnkZWu2p_RdrJGMNLd_wBgicflWcJBRe8FvQ/viewform?usp=sf_link';
    Linking.openURL(feedbackFormURL);
  };
  return (
    <Layout backgroundColor={colors.white}>
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
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
        >
          <Button text="Give us feedback!" style={{ alignSelf: 'center' }} onPress={handleFeedback} />
        </View>
      </ScrollView>
    </Layout>
  );
}
