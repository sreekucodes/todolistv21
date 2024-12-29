import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function DefineImprovementScreen({ route, navigation }) {
  const { tasks } = route.params;
  const [improvements, setImprovements] = useState(['', '', '', '', '']);

  const handleNext = () => {
    navigation.navigate('Dashboard', { tasks, improvements });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>Define a 1% improvement for each task:</Text>
      {tasks.map((task, index) => (
        <View key={index} style={styles.taskContainer}>
          <Text style={styles.taskText}>{task}</Text>
          <TextInput
            style={styles.input}
            placeholder="1% improvement"
            value={improvements[index]}
            onChangeText={(text) => {
              const newImprovements = [...improvements];
              newImprovements[index] = text;
              setImprovements(newImprovements);
            }}
          />
        </View>
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
  taskContainer: {
    marginBottom: 10,
  },
  taskText: {
    color: '#fff',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
  },
});