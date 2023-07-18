import React from 'react';
import { View } from 'react-native';
import {
  Layout, Text, Section, SectionContent,
} from 'react-native-rapi-ui';
import { FriendsScreenProp } from '../../navigation/types';
import { colors } from '../../components/utils/Colors';

export default function Friends(props: FriendsScreenProp) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { navigation } = props;
  return (
    <Layout backgroundColor={colors.white}>
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
              Friends Screen (in progress)
            </Text>
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
