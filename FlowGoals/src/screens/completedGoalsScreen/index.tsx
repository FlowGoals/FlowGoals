import React, { useContext } from 'react';
import {
  Text, View, Pressable, ScrollView, SafeAreaView,
} from 'react-native';
import { useQuery } from 'react-query';
import {
  Layout, TopNav,
} from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { Goal } from '@prisma/client';
import tinycolor from 'tinycolor2';
import { colors } from '../../components/utils/Colors';
import { CompletedGoalsProp } from '../../navigation/types';
import { getGoals } from '../../services/axiosService';
import AuthContext from '../../context/AuthContext';
import styles from '../../components/utils/styles';

const backgroundColor = (mainColor: string) => (tinycolor(mainColor).lighten(30).toHexString());

export default function CompletedGoals({ navigation }: CompletedGoalsProp) {
  const { user } = useContext(AuthContext);
  const {
    data, isError,
  } = useQuery<Goal[]>('queryGetGoals', () => getGoals(user!.id));
  // add '!' for proper functionality
  const completedGoals = data?.filter((goal) => !goal.isActive);

  return (
    <Layout backgroundColor={colors.white}>
      <TopNav
        middleContent="Completed Goals"
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
      <ScrollView style={{ marginHorizontal: 10 }}>
        {isError && (
          <View>
            <SafeAreaView style={{ flex: 1 }}>
              <Text>Unable to fetch goals. Please reload app</Text>
            </SafeAreaView>
          </View>
        )}
        {completedGoals && completedGoals.length !== 0 ? (completedGoals.map((goal) => (
          <View key={goal.title} style={{ marginTop: 10 }}>
            <Pressable style={{
              ...styles.preview,
              backgroundColor: backgroundColor(goal.color),
              paddingHorizontal: 30,
            }}
            >
              <View>
                <Ionicons
                  name="trophy-sharp"
                  size={50}
                  color={goal.color}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.nameText}>{goal.title}</Text>
              </View>
            </Pressable>
          </View>
        ))) : (
          <View style={{ marginHorizontal: 30, marginVertical: 30 }}>
            <Text style={{ fontSize: 25, textAlign: 'center' }}>You haven&apos;t completed any goals yet!</Text>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}
