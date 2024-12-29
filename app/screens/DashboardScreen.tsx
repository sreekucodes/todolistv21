import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function DashboardScreen({ route, navigation }) {
  const { tasks, improvements } = route.params;

  const handleSubscription = () => {
    navigation.navigate('Subscription');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tasks</Text>
      {tasks.map((task, index) => (
        <View key={index} style={styles.taskContainer}>
          <Text style={styles.taskText}>{task}</Text>
          <Text style={styles.improvementText}>1% Improvement: {improvements[index]}</Text>
        </View>
      ))}
      <Text style={styles.walkthrough}>Walkthrough: Learn how the app works...</Text>
      <Button title="Let's Go" onPress={handleSubscription} />
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
  title: {
    color: '#fff',
    fontSize: 24,
    marginBottom: 20,
  },
  taskContainer: {
    marginBottom: 10,
  },
  taskText: {
    color: '#fff',
    fontSize: 18,
  },
  improvementText: {
    color: '#fff',
    fontSize: 14,
  },
  walkthrough: {
    color: '#fff',
    marginTop: 20,
    marginBottom: 20,
  },
});