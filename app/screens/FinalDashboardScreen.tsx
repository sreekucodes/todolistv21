import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function FinalDashboardScreen({ route }) {
  const { tasks, improvements } = route.params;
  const [progress, setProgress] = useState(tasks.map(() => new Array(21).fill(false)));

  const toggleTaskProgress = (taskIndex, dayIndex) => {
    const newProgress = [...progress];
    newProgress[taskIndex][dayIndex] = !newProgress[taskIndex][dayIndex];
    setProgress(newProgress);
  };

  return (
    <View style={styles.container}>
      {tasks.map((task, taskIndex) => (
        <View key={taskIndex} style={styles.taskContainer}>
          <Text style={styles.taskText}>{task}</Text>
          <View style={styles.progressContainer}>
            {progress[taskIndex].map((done, dayIndex) => (
              <TouchableOpacity
                key={dayIndex}
                style={[
                  styles.progressDay,
                  { backgroundColor: done ? '#fff' : '#000' }
                ]}
                onPress={() => toggleTaskProgress(taskIndex, dayIndex)}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  taskContainer: {
    marginBottom: 20,
  },
  taskText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  progressDay: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: '#666',
  },
});