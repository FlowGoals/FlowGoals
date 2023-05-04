import React, { useState } from 'react';
import {
  Layout, TopNav, Text,
} from 'react-native-rapi-ui';
import {
  ScrollView, View, StyleSheet, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../components/utils/Colors';
import { NewGoalProp } from '../../navigation/types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 10,
    width: '50%',
    borderRadius: 10,
    backgroundColor: colors.columbiaBlue,
  },
});

export default function NewGoal(props: NewGoalProp) {
  const { navigation } = props;
  const [title, setTitle] = useState('');

  return (
    <Layout>
      <TopNav
        middleContent="New Goal"
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
        <View style={{ margin: 20 }}>
          <View>
            <Text>Goal Name</Text>
          </View>
          <View style={styles.container}>
            <TextInput
              placeholder="Goal Name"
              value={title}
              onChangeText={(change) => setTitle(change)}
              maxLength={15}
              textAlign="center"
              style={{ fontSize: 25 }}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
