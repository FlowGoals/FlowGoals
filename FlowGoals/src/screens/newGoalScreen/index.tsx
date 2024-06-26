import React, { useContext, useState } from 'react';
import {
  Layout, TopNav, Text, Button, RadioButton, Picker,
} from 'react-native-rapi-ui';
import {
  ScrollView, View, TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ColorPicker from 'react-native-wheel-color-picker';
import { useQueryClient } from 'react-query';
import { Prisma } from '@prisma/client';
import { colors } from '../../components/utils/Colors';
import { NewGoalProp } from '../../navigation/types';
import AuthContext from '../../context/AuthContext';
import { createGoal } from '../../services/axiosService';
import styles from '../../components/utils/styles';

export default function NewGoal({ navigation } : NewGoalProp) {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // goal state variables
  const [title, setTitle] = useState('');
  // userId: number;
  // created date set on creation
  const [targetDate, setTargetDate] = useState<Date | null>(null); // or null
  const [startValue, setStartValue] = useState('0');
  // currentValue set to startValue on creation
  const [targetValue, setTargetValue] = useState('');
  const [interval, setInterval] = useState< string | null>(null); // or null
  // isActive set to true on creation
  const [color, setColor] = useState('#1632e5');
  // extraData: Prisma.JsonValue;

  // radio button state variables
  const [oneTime, setOneTime] = useState< boolean | null>(null);
  const [hasEndDate, setHasEndDate] = useState < boolean | null>(null);

  const handleNumChange = (varSetter: (value: string) => void) => (change: string) => {
    const numericValue = change.replace(/[^0-9]/g, '');
    varSetter(numericValue);
  };

  const intervalOptions = [
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
    { label: 'Year', value: 'year' },
  ];

  const [isCreating, setIsCreating] = useState(false);

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

  const handleCreateGoal = async () => {
    // prevent multiple goal creations
    setIsCreating(true);
    const newGoal: Prisma.GoalCreateInput = {
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
      await createGoal(newGoal);
    } catch (error) {
      console.log('Error creating goal', error);
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
              placeholder="ex: Learn how to play guitar"
              onChangeText={(change) => setTitle(change)}
              maxLength={30}
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
                      onChangeText={handleNumChange(setTargetValue)}
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
                  <View style={{
                    flexDirection: 'column', rowGap: 10, marginRight: 10, width: '20%',
                  }}
                  >
                    <Text>Current</Text>
                    <View style={styles.inputBox}>
                      <TextInput
                        value={startValue}
                        placeholder="ex: 0"
                        onChangeText={handleNumChange(setStartValue)}
                        style={{ fontSize: 16 }}
                      />
                    </View>
                  </View>
                  <View style={{
                    flexDirection: 'column', rowGap: 10, width: '20%',
                  }}
                  >
                    <Text>Target</Text>
                    <View style={styles.inputBox}>
                      <TextInput
                        value={targetValue}
                        placeholder="ex: 10"
                        onChangeText={handleNumChange(setTargetValue)}
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
          <Button
            text="Create"
            style={{ alignItems: 'center', zIndex: -1 }}
            disabled={!(title
    && targetValue
    && startValue
    && (oneTime === !interval)
    && color
    && oneTime !== null
    && hasEndDate !== null
    && !isCreating)}
            onPress={handleCreateGoal}
          />
        </View>
      </ScrollView>
    </Layout>
  );
}
