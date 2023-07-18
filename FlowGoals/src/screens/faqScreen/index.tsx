import React from 'react';
import {
  Layout, Text, TopNav,
} from 'react-native-rapi-ui';
import {
  ScrollView, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../components/utils/Colors';
import { FAQProp } from '../../navigation/types';
import styles from '../../components/utils/styles';

export default function Faq(props: FAQProp) {
  const { navigation } = props;
  return (
    <Layout backgroundColor={colors.white}>
      <TopNav
        middleContent="FAQ"
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
        <View style={styles.navSection}>
          <Text>Temporary text</Text>
        </View>
      </ScrollView>
    </Layout>
  );
}
