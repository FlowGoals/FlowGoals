import React from "react";
import { View } from "react-native";
import { MainTabsParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Text, Section, SectionContent } from "react-native-rapi-ui";

export default function ({
  navigation,
  route,
}: NativeStackScreenProps<MainTabsParamList, "Profile">) {
  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Section style={{ marginTop: 20 }}>
          <SectionContent>
            <Text fontWeight="bold" style={{ textAlign: "center" }}>
              Profile Screen
            </Text>
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}
