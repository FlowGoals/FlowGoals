import React from 'react';
import {
  Layout, Text, TopNav,
} from 'react-native-rapi-ui';
import {
  ScrollView, View, StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../components/utils/Colors';
import { FAQProp } from '../../navigation/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    padding: 10,
    margin: 1,
    backgroundColor: colors.columbiaBlue,
  },
});

export default function Faq(props: FAQProp) {
  const { navigation } = props;
  return (
    <Layout>
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
        <View style={styles.container}>
          <Text>Hardcoded text</Text>
        </View>
      </ScrollView>
    </Layout>
  );
}
