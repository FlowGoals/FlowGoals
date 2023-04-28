import React from 'react';
import { View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Layout,
  Text,
  TopNav,
  Section,
  SectionContent,
} from 'react-native-rapi-ui';
import { MainTabsParamList } from '../navigation/types';

export default function Goals({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  route,
}: NativeStackScreenProps<MainTabsParamList, 'Goals'>) {
  //   const auth = getAuth();
  return (
    <Layout>
      <TopNav
        middleContent="Your Goals"
      />
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
              Goals Screen
            </Text>
            {/* <Button
              text="Go to second screen"
              onPress={() => {
                navigation.navigate("SecondScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />
            <Button
              status="danger"
              text="Logout"
              onPress={() => {
                signOut(auth);
              }}
              style={{
                marginTop: 10,
              }}
            /> */}
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
