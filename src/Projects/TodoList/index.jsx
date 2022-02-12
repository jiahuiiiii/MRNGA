/* eslint-disable linebreak-style */
/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import {
  View, Text, ScrollView, TextInput,
} from 'react-native';
import { FAB, Checkbox } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import Swipeout from 'react-native-swipeout';
import Animated, { SlideInLeft, Layout, SlideOutRight } from 'react-native-reanimated';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

function TodoList() {
  const [task, setTask] = useState({});

  useEffect(() => {
    AsyncStorageLib.getItem('@mrnga:todo', (err, res) => {
      if (err) throw err;
      if (res != null) {
        setTask(JSON.parse(res));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorageLib.setItem('@mrnga:todo', JSON.stringify(task));
  }, [task]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView style={{ margin: 16 }}>
        {Object.keys(task).map((id) => (
          <Animated.View
            key={id}
            entering={SlideInLeft.duration(300)}
            exiting={SlideOutRight.duration(1000)}
            layout={Layout}
          >
            <Swipeout
              style={{
                marginBottom: 8,
              }}
              backgroundColor="white"
              right={(() => [
                {
                  text: (
                    <Text
                      numberOfLines={1}
                      style={{
                        fontWeight: 'bold',
                        color: 'white',
                      }}
                    >
                      Delete
                    </Text>
                  ),
                  backgroundColor: 'red',
                  onPress: () => {
                    delete task[id];
                    setTask({ ...task });
                  },
                },
              ])()}
            >
              <View
                key={id}
                style={{
                  borderWidth: 1,
                  borderColor: '#E2E8F0',
                  padding: 16,
                  borderRadius: 6,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <TextInput
                  style={{
                    fontSize: 16,
                    flex: 1,
                    textDecorationStyle: 'solid',
                    textDecorationLine: task[id].completed
                      ? 'line-through'
                      : 'none',
                  }}
                  value={task[id].name}
                  editable={!task[id].completed}
                  onChangeText={(e) => {
                    task[id].name = e;
                    setTask({ ...task });
                  }}
                  placeholder="Type your task here"
                  selectionColor="#fcd34d"
                />
                <Checkbox
                  status={task[id].completed ? 'checked' : 'unchecked'}
                  onPress={() => {
                    task[id].completed = !task[id].completed;
                    setTask({ ...task });
                  }}
                  color="#fbbf24"
                />
              </View>
            </Swipeout>

          </Animated.View>
        ))}
      </ScrollView>
      <FAB
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: 16,
          backgroundColor: '#F43F5E',
        }}
        onPress={() => {
          const newTask = {};
          newTask[Date.now()] = {
            name: '',
            completed: false,
          };
          setTask({ ...newTask, ...task });
        }}
        icon={() => <Feather name="plus" size={24} color="white" />}
      />
    </View>
  );
}

export default TodoList;
