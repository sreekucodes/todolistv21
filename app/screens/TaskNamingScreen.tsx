import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function TaskNamingScreen({ navigation }) {
  const [tasks, setTasks] = useState(['', '', '', '', '']);

  const handleNext = () => {
    navigation.navigate('DefineImprovement', { tasks });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>Name 5 habits you'd like to form:</Text>
      {tasks.map((task, index) => (
        <TextInput
          key={index}
          style={styles.input}
          placeholder={`Habit ${index + 1}`}
          value={task}
          onChangeText={(text) => {
            const newTasks = [...tasks];
            newTasks[index] = text;
            setTasks(newTasks);
          }}
        />
      ))}
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  prompt: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});