import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Layout, Text, Section, SectionContent,
} from 'react-native-rapi-ui';
import { MainTabsParamList } from '../navigation/types';

export default function Friends({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  route,
}: NativeStackScreenProps<MainTabsParamList, 'Friends'>) {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Section style={{ marginTop: 20 }}>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: 'center' }}>
              Friends Screen
            </Text>
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
