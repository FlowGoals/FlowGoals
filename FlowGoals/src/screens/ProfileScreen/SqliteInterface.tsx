import React, { useState } from 'react';
import {
  Layout,
  TopNav,
  TextInput,
  Button,
  Section,
  SectionContent,
  Text,
} from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { SQLError } from 'expo-sqlite';
import { useQuery } from 'react-query';
import { ScrollView } from 'react-native';
import { SqliteInterfaceProps } from '../../navigation/types';
import { colors } from '../../components/utils/Colors';
import {
  DROP_TABLE_GOAL, MUTATION_ADD_GOAL, MUTATION_DELETE_GOAL, QUERY_GET_GOALS,
} from '../../services/sqliteService';
import { Goal } from '../../interfaces/IGoal';

export default function SqliteInterface(props: SqliteInterfaceProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { navigation } = props;

  const [addGoalName, setAddGoalName] = useState('');
  const [deleteGoalName, setDeleteGoalName] = useState('');

  const [displayText, setDisplayText] = useState('');

  const {
    data, isLoading, isError, refetch,
  } = useQuery('queryGetGoals', QUERY_GET_GOALS);

  const handleAddGoal = async () => {
    // hard code for testing purposes
    const newGoal: Goal = {
      name: addGoalName,
      start: 0,
      current: 0,
      interval: 0,
      color: 'color',
    };
    setAddGoalName('');
    await MUTATION_ADD_GOAL(newGoal)
      .then((res) => {
        setDisplayText(`insertId: ${res}`);
        console.log(res);
      })
      .catch((err: SQLError) => {
        setDisplayText(err.message);
        console.log(err.message);
      });
    refetch();
  };

  const handleDeleteGoal = async () => {
    const goalName = deleteGoalName;
    setDeleteGoalName('');
    await MUTATION_DELETE_GOAL(goalName)
      .then((res) => {
        setDisplayText(`rows affected: ${res}`);
        console.log(res);
      })
      .catch((err: SQLError) => {
        setDisplayText(err.message);
        console.log(err.message);
      });
    refetch();
  };

  const handleDropTable = async () => {
    await DROP_TABLE_GOAL().then(() => {
      setDisplayText('success');
      console.log('success');
    });
    refetch();
  };

  return (
    <Layout>
      <TopNav
        middleContent={`Sqlite Interface (${process.env.ENV})`}
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
      <Text style={{ color: 'red', textAlign: 'center' }}>{displayText}</Text>
      <ScrollView>
        {isError ? (
          <Text>
            Error occured when fetching the data. Please reload the app
          </Text>
        )
          : !isLoading
            && (
              <>
                {data && data.map((goal: Goal) => {
                  const objectString = Object.entries(goal).map(([key, val]) => `${key}: ${val}`).join(', ');
                  return (
                    <Section key={goal.name}>
                      <SectionContent>
                        <Text>{objectString}</Text>
                      </SectionContent>
                    </Section>
                  );
                })}

                <Section>
                  <SectionContent>
                    <TextInput
                      value={addGoalName}
                      onChangeText={setAddGoalName}
                      editable
                    />
                    <Button text="add" onPress={handleAddGoal} />
                    <TextInput
                      value={deleteGoalName}
                      onChangeText={setDeleteGoalName}
                      editable
                    />
                    <Button text="delete" onPress={handleDeleteGoal} />
                  </SectionContent>
                </Section>
                <Section>
                  <SectionContent>
                    <Button
                      color="red"
                      text="Drop Table"
                      onPress={handleDropTable}
                    />
                  </SectionContent>
                </Section>
              </>
            )}
      </ScrollView>
    </Layout>
  );
}
