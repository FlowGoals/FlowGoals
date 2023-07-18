import React, { useContext } from 'react';
import {
  View, ScrollView, Pressable, Linking,
} from 'react-native';
import {
  Layout, Text, Button,
} from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileScreenProp } from '../../navigation/types';
import { colors } from '../../components/utils/Colors';
import AuthContext from '../../context/AuthContext';
import styles from '../../components/utils/styles';

export default function Profile(props: ProfileScreenProp) {
  const { navigation } = props;
  const { logout } = useContext(AuthContext);

  const handleFeedback = () => {
    const feedbackFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLSdSIQGy1wSanMnmxY5_NiRHPbWjbU0HO-egYNgaOi0zKuSjfg/viewform?usp=sf_link';
    Linking.openURL(feedbackFormURL);
  };

  const handleProductRoadmap = () => {
    const ProductRoadmapURL = 'https://docs.google.com/document/d/1uruLjegSCjCdqvrnogQR3SohAYFSfGSEn1fxB539slk/edit?usp=sharing';
    Linking.openURL(ProductRoadmapURL);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      await AsyncStorage.removeItem('password');
      logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout backgroundColor={colors.white}>
      <ScrollView>
        <View style={{ height: 150, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Profile Pic</Text>
        </View>
        <Pressable
          style={styles.navSection}
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
          style={styles.navSection}
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
          <Button color={colors.red1} text="Logout" style={{ alignSelf: 'center' }} onPress={handleLogout} />
        </View>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
        >
          <Button color={colors.blue2dark} text="Give us feedback!" style={{ alignSelf: 'center' }} onPress={handleFeedback} />
        </View>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
        }}
        >
          <Button color={colors.blue2dark} text="Product Roadmap" style={{ alignSelf: 'center' }} onPress={handleProductRoadmap} />
        </View>
      </ScrollView>
    </Layout>
  );
}
