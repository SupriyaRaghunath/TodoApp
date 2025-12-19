import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const TaskContext = createContext();

const STORAGE_KEY = 'TASKS';

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  let loadTasks = async () => {
    let stored = AsyncStorage.getItem(STORAGE_KEY);

    setTasks(stored ? JSON.parse(stored) : []);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  let updateTask = async updated => {
    setTasks(updated);

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  let addTask = item => {
    let updated = [item, ...tasks];

    updateTask(updated);
  };

  let deleteTask = id => {
    let updated = tasks.filter(task => task.id !== id);

    updateTask(updated);
  };

  let toggleTask = id => {
    let updated = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task,
    );

    updateTask(updated);
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, deleteTask, toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskProvider;
