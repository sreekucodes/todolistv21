import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, FlatList, Modal } from 'react-native';

interface Task {
  id: string;
  text: string;
  dailyGoal: string;
  progress: boolean[];
  startDate: Date;
}

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [dailyGoal, setDailyGoal] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  
  const addTask = () => {
    if (newTask.length > 0 && tasks.length < 5) {
      const task: Task = {
        id: Math.random().toString(),
        text: newTask,
        dailyGoal: dailyGoal,
        progress: new Array(21).fill(false),
        startDate: new Date()
      };
      setTasks([...tasks, task]);
      setNewTask('');
      setDailyGoal('');
      setModalVisible(false);
    }
  };

  const toggleProgress = (taskId: string, day: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newProgress = [...task.progress];
        newProgress[day] = !newProgress[day];
        return { ...task, progress: newProgress };
      }
      return task;
    }));
  };

  // ... existing code ...

const getOverallProgress = () => {
  if (tasks.length === 0) return 'rgb(0,0,0)'; // Start with pitch black if no tasks

  const totalProgress = tasks.reduce((acc, task) => {
    const completedDays = task.progress.filter(day => day).length;
    return acc + (completedDays / 21);
  }, 0);

  const averageProgress = totalProgress / tasks.length;
  const brightness = Math.floor(averageProgress * 255);
  return `rgb(${brightness},${brightness},${brightness})`;
};

// ... existing code ..

  const getProgressColor = (progress: boolean[]) => {
    const completedDays = progress.filter(day => day).length;
    const percentage = completedDays / 21;
    const brightness = Math.floor(percentage * 255);
    return `rgb(${brightness},${brightness},${brightness})`;
  };

  const getCurrentDay = (startDate: Date) => {
    const diff = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    return Math.min(Math.max(diff, 0), 20);
  };

  return (
    <View style={[styles.container, { backgroundColor: getOverallProgress() }]}>
      <Text style={styles.title}>21-Day Productivity Detox</Text>

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
        disabled={tasks.length >= 5}
      >
        <Text style={styles.addButtonText}>
          {tasks.length >= 5 ? 'Max 5 tasks reached' : 'Add New Task'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={[styles.taskCard, { backgroundColor: getProgressColor(item.progress) }]}>
            <Text style={styles.taskText}>{item.text}</Text>
            <Text style={styles.goalText}>Daily Goal: {item.dailyGoal}</Text>
            
            <View style={styles.progressContainer}>
              {item.progress.map((done, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.progressDay,
                    { 
                      backgroundColor: done ? '#fff' : '#000',
                      opacity: index <= getCurrentDay(item.startDate) ? 1 : 0.3
                    }
                  ]}
                  onPress={() => toggleProgress(item.id, index)}
                  disabled={index > getCurrentDay(item.startDate)}
                />
              ))}
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter task name"
              value={newTask}
              onChangeText={setNewTask}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter 1% daily improvement goal"
              value={dailyGoal}
              onChangeText={setDailyGoal}
            />
            <TouchableOpacity style={styles.modalButton} onPress={addTask}>
              <Text style={styles.modalButtonText}>Add Task</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]} 
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  taskCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  taskText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  goalText: {
    fontSize: 14,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
  },
  modalButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});