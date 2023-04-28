import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Layout, Text, Section, SectionContent,
} from 'react-native-rapi-ui';
import { MainTabsParamList } from '../navigation/types';

export default function Profile({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  route,
}: NativeStackScreenProps<MainTabsParamList, 'Profile'>) {
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
              Profile Screen
            </Text>
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
