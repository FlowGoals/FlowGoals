import React from 'react';
import { View } from 'react-native';
import {
  Layout, Text, Section, SectionContent,
} from 'react-native-rapi-ui';
import { FriendsScreenProp } from '../../navigation/types';

export default function Friends(props: FriendsScreenProp) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { navigation } = props;
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
