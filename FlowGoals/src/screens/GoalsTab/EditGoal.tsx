import React, { useState } from 'react';
import {
  Layout, TopNav, Text, Button, RadioButton,
} from 'react-native-rapi-ui';
import {
  ScrollView, View, StyleSheet, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPicker from 'react-native-wheel-color-picker';
import { useQueryClient } from 'react-query';
import { colors } from '../../components/utils/Colors';
import { EditGoalProp } from '../../navigation/types';
import { MUTATION_ADD_GOAL } from '../../services/sqliteService';
import { Goal } from '../../interfaces/IGoal';

const styles = StyleSheet.create({
  inputBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.columbiaBlue,
  },
  inlineInputBox: {
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: colors.columbiaBlue,
  },
  dropdown: {
    padding: 0,
    borderRadius: 10,
    marginHorizontal: 5,
    width: '30%',
    borderWidth: 0,
    backgroundColor: colors.columbiaBlue,
  },
});

export default function EditGoal({ navigation, route } : EditGoalProp) {
  const queryClient = useQueryClient();
  const { goal } = route.params || {};

  const [name, setName] = useState(goal.name);
  const [endValue, setEndValue] = useState(goal.end.toString());
  const [startValue, setStartValue] = useState(goal.current.toString());
  const [endDate, setEndDate] = useState(goal.end_date ? new Date(goal.end_date) : undefined);
  const [interval, setInterval] = useState(goal.interval.toString());
  const [color, setColor] = useState(goal.color);

  const [goalType, setGoalType] = useState(goal.interval === 1 ? 'oneTime' : 'repeat');

  const clearFields = () => {
    setEndValue(goal.end.toString());
    setStartValue(goal.current.toString());
    setEndDate(new Date());
    setInterval(goal.interval.toString());
    setColor(goal.color);
  };

  const complete = (name
    && endValue
    && startValue
    && interval
    && color
    && goalType
  );

  const handleUpdateGoal = async () => {
    const updatedGoal: Goal = {
      name,
      start: parseFloat(startValue),
      end: parseFloat(endValue),
      current: parseFloat(startValue),
      interval: parseFloat(interval),
      end_date: endDate ? endDate.toISOString() : undefined,
      color,
    };
    try {
      await MUTATION_ADD_GOAL(updatedGoal);
    } catch (error) {
      console.log('Error creating goal', error);
    } finally {
      // invalidate query "queryGetGoals" in cache to trigger refetch on GoalsScreen
      queryClient.invalidateQueries('queryGetGoals');
      navigation.goBack();
    }
  };

  return (
    <Layout backgroundColor={colors.white}>
      <TopNav
        // middleContent="New Goal"
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
        <View style={{ margin: 10, flex: 1, rowGap: 10 }}>
          <Text>Goal Name</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={name}
              placeholder="ex: Bench 225"
              onChangeText={(change) => setName(change)}
              maxLength={15}
              style={{ fontSize: 16 }}
            />
          </View>
          <Text>Repeating Goal</Text>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>Yes</Text>
              <RadioButton
                value={goalType === 'repeat'}
                onValueChange={() => {
                  setGoalType('repeat');
                  clearFields();
                  // repeat specific values
                  setStartValue('0');
                }}
                style={{ marginHorizontal: 20 }}
              />
              <Text>No</Text>
              <RadioButton
                value={goalType === 'oneTime'}
                onValueChange={() => {
                  setGoalType('oneTime');
                  clearFields();
                  // oneTime specific values
                  setInterval('1');
                }}
                style={{ marginHorizontal: 20 }}
              />
            </View>
          </View>
          {goalType !== ''
          && (goalType === 'repeat'
            ? (
              <View style={{ rowGap: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>Complete</Text>
                  <View style={[styles.inlineInputBox, { width: '15%' }]}>
                    <TextInput
                      value={endValue}
                      placeholder="ex: 4"
                      onChangeText={(change) => setEndValue(change)}
                      maxLength={3}
                      keyboardType="numeric"
                    />
                  </View>
                  <Text>/</Text>
                  <View style={[styles.inlineInputBox, { width: '25%' }]}>
                    <TextInput
                      value={interval}
                      placeholder="month"
                      onChangeText={(change) => setInterval(change)}
                      maxLength={20}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>End date</Text>
                  <DateTimePicker
                    mode="date"
                    // value={endDate}
                    value={endDate || new Date()}
                    onChange={(event, selectedDate) => setEndDate(selectedDate || endDate)}
                    minimumDate={new Date()}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>Color </Text>
                  <Ionicons
                    name="ellipse"
                    size={30}
                    color={color}
                  />
                </View>
                <ColorPicker
                  color={color}
                  onColorChange={(change) => setColor(change)}
                  thumbSize={30}
                  sliderSize={30}
                  noSnap
                  swatchesOnly
                  row={false}
                />
              </View>
            )
            : (
              <View style={{ rowGap: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flexDirection: 'column', rowGap: 10, margin: 5 }}>
                    <Text>Current</Text>
                    <View style={styles.inputBox}>
                      <TextInput
                        value={startValue}
                        placeholder="ex: 0"
                        onChangeText={(change) => setStartValue(change)}
                        maxLength={4}
                        style={{ fontSize: 16 }}
                      />
                    </View>
                  </View>
                  <View style={{ flexDirection: 'column', rowGap: 10, margin: 5 }}>
                    <Text>Target</Text>
                    <View style={styles.inputBox}>
                      <TextInput
                        value={endValue}
                        placeholder="ex: 10"
                        onChangeText={(change) => setEndValue(change)}
                        maxLength={4}
                        style={{ fontSize: 16 }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>Complete by</Text>
                  <DateTimePicker
                    mode="date"
                    // value={endDate}
                    value={endDate || new Date()}
                    onChange={(event, selectedDate) => setEndDate(selectedDate || endDate)}
                    minimumDate={new Date()}
                  />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>Color </Text>
                  <Ionicons
                    name="ellipse"
                    size={30}
                    color={color}
                  />
                </View>
                <ColorPicker
                  color={color}
                  onColorChange={(change) => setColor(change)}
                  thumbSize={30}
                  sliderSize={30}
                  noSnap
                  swatchesOnly
                  row={false}
                />
              </View>
            )
          )}
          <Button text="Update" style={{ alignItems: 'center', zIndex: -1 }} disabled={!complete} onPress={handleUpdateGoal} />
        </View>
      </ScrollView>
    </Layout>
  );
}
