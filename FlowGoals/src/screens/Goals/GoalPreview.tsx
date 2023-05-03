import React, { useState } from 'react';
import {
  View, StyleSheet, Text, Pressable, Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../components/utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: colors.dark100,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 0.75,
    marginTop: 75,
    marginBottom: 0,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: colors.columbiaBlue,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});

type GoalPreviewProps = {
  goal: {
    text: string
  }
};

function GoalPreview({ goal }: GoalPreviewProps) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >

        <View style={styles.modalView}>
          <View style={{ position: 'absolute', top: 10, right: 10 }}>
            <Ionicons
              name="close-outline"
              size={40}
              color={colors.dark100}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
        </View>

      </Modal>
      <Pressable
        style={[styles.container, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.text}>{goal.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalPreview;
