import React, { useContext, useState } from 'react';
import {
  Layout, TopNav, Text, Button, RadioButton, Picker,
} from 'react-native-rapi-ui';
import {
  ScrollView, View, StyleSheet, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPicker from 'react-native-wheel-color-picker';
import { useQueryClient } from 'react-query';
import { Prisma } from '@prisma/client';
import { colors } from '../../components/utils/Colors';
import { EditGoalProp } from '../../navigation/types';
import AuthContext from '../../context/AuthContext';
import { updateGoal } from '../../services/axiosService';

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
  const { goal } = route.params || {};
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // goal state variables
  const [title, setTitle] = useState(goal.title);
  // userId: number;
  // created date set on creation
  const [targetDate, setTargetDate] = useState<Date | null>(
    goal.targetDate instanceof Date ? goal.targetDate : null,
  );
  const [startValue, setStartValue] = useState(goal.startValue.toString());
  // currentValue set to startValue on creation
  const [targetValue, setTargetValue] = useState(goal.targetValue.toString());
  const [interval, setInterval] = useState< string | null>(
    typeof goal.interval === 'number' ? goal.interval.toString() : null,
  );
  // isActive set to true on creation
  const [color, setColor] = useState(goal.color);
  // extraData: Prisma.JsonValue;

  // radio button state variables
  const [oneTime, setOneTime] = useState< boolean >(goal.interval === null);
  const [hasEndDate, setHasEndDate] = useState < boolean>(goal.targetDate !== null);

  const intervalOptions = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ];

  const complete = (title
    && targetValue
    && startValue
    && (oneTime === !interval)
    && color
    && oneTime !== null
    && hasEndDate !== null
  );

  const parseInterval = (val: string | null) => {
    switch (val) {
      case 'day':
        return 1;
      case 'week':
        return 7;
      case 'month':
        return 30;
      case 'year':
        return 365;
      default:
        return null;
    }
  };

  const handleUpdateGoal = async () => {
    const updatedGoal: Prisma.GoalUpdateInput = {
      title,
      startValue: parseFloat(startValue),
      targetValue: parseFloat(targetValue),
      currentValue: parseFloat(startValue),
      interval: parseInterval(interval),
      targetDate,
      createdDate: new Date(),
      color,
      isActive: true,
      user: { connect: { id: user!.id } },
    };
    try {
      await updateGoal(goal.id, updatedGoal);
    } catch (error) {
      console.log('Error updating goal', error);
    }
    // invalidate query "queryGetGoals" in cache to trigger refetch on GoalsScreen
    queryClient.invalidateQueries('queryGetGoals');
    navigation.goBack();
  };

  return (
    <Layout backgroundColor={colors.white}>
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
        <View style={{ margin: 10, flex: 1, rowGap: 10 }}>
          <Text>Goal Name</Text>
          <View style={styles.inputBox}>
            <TextInput
              value={title}
              placeholder="ex: Bench 225"
              onChangeText={(change) => setTitle(change)}
              maxLength={15}
              style={{ fontSize: 16 }}
            />
          </View>
          <Text>Repeating Goal</Text>
          <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>Yes</Text>
              <RadioButton
                value={oneTime === false}
                onValueChange={() => {
                  setOneTime(false);
                  // repeat specific values
                  setStartValue('0');
                }}
                style={{ marginHorizontal: 20 }}
              />
              <Text>No</Text>
              <RadioButton
                value={oneTime === true}
                onValueChange={() => {
                  setOneTime(true);
                  // oneTime specific values
                  setStartValue('');
                  setInterval(null);
                }}
                style={{ marginHorizontal: 20 }}
              />
            </View>
          </View>
          {oneTime !== null
          && (!oneTime
            ? (
              <View style={{ rowGap: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text>Complete</Text>
                  <View style={[styles.inlineInputBox, { width: '15%' }]}>
                    <TextInput
                      value={targetValue}
                      placeholder="ex: 4"
                      onChangeText={(change) => setTargetValue(change)}
                      maxLength={3}
                      keyboardType="numeric"
                    />
                  </View>
                  <Text>/</Text>
                  <View style={{ width: '40%', marginLeft: 5 }}>
                    <Picker
                      items={intervalOptions}
                      value={interval}
                      placeholder="Select interval"
                      onValueChange={(change) => setInterval(change)}
                      backgroundColor={colors.columbiaBlue}
                    />
                  </View>
                </View>
                <Text>Will this goal end on a specific date?</Text>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Yes</Text>
                    <RadioButton
                      value={hasEndDate === true}
                      onValueChange={() => {
                        setHasEndDate(true);
                      }}
                      style={{ marginHorizontal: 20 }}
                    />
                    <Text>No</Text>
                    <RadioButton
                      value={hasEndDate === false}
                      onValueChange={() => {
                        setHasEndDate(false);
                        setTargetDate(null);
                      }}
                      style={{ marginHorizontal: 20 }}
                    />
                  </View>
                </View>
                {hasEndDate !== null
                && hasEndDate && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>End date</Text>
                    <DateTimePicker
                      mode="date"
                      value={targetDate || new Date()}
                      onChange={(event, selectedDate) => setTargetDate(selectedDate || targetDate)}
                      minimumDate={new Date()}
                    />
                  </View>
                ) }
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
                        value={targetValue}
                        placeholder="ex: 10"
                        onChangeText={(change) => setTargetValue(change)}
                        maxLength={4}
                        style={{ fontSize: 16 }}
                      />
                    </View>
                  </View>
                </View>
                <Text>Will this goal end on a specific date?</Text>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>Yes</Text>
                    <RadioButton
                      value={hasEndDate === true}
                      onValueChange={() => {
                        setHasEndDate(true);
                      }}
                      style={{ marginHorizontal: 20 }}
                    />
                    <Text>No</Text>
                    <RadioButton
                      value={hasEndDate === false}
                      onValueChange={() => {
                        setHasEndDate(false);
                        setTargetDate(null);
                      }}
                      style={{ marginHorizontal: 20 }}
                    />
                  </View>
                </View>
                {hasEndDate !== null
                && hasEndDate && (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text>End date</Text>
                    <DateTimePicker
                      mode="date"
                      value={targetDate || new Date()}
                      onChange={(event, selectedDate) => setTargetDate(selectedDate || targetDate)}
                      minimumDate={new Date()}
                    />
                  </View>
                ) }
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
