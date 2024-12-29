import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SubscriptionScreen({ navigation }) {
  const handleSkip = () => {
    navigation.navigate('FinalDashboard');
  };

  const handleSubscribe = () => {
    // Implement subscription logic here
    navigation.navigate('FinalDashboard');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prompt}>Commit to your goals with a $21 subscription for 21 days.</Text>
      <Button title="Subscribe" onPress={handleSubscribe} />
      <Button title="Skip" onPress={handleSkip} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  prompt: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});