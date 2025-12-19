import React, { useContext, useState } from 'react';
import { View, StyleSheet, TextInput, Pressable, Text } from 'react-native';
import Checkbox from './Checkbox';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskContext } from '../providers/TaskProvider';

const AddTask = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [check, setCheck] = useState(true);

  const { addTask } = useContext(TaskContext);
  let onChangeTitle = val => {
    setTitle(val);
  };

  let onChangeCategory = val => {
    setCategory(val);
  };

  let onCheck = () => {
    setCheck(_check => setCheck(!_check));
  };

  let onSubmit = async () => {
    let validate = () => true;

    addTask({
      id: `${Date.now()}-${Math.random()}`,
      title,
      category,
      done: check,
      createdAt: Date.now(),
    });
  };

  let header = (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text>{`<- Back`}</Text>
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {header}
      <View style={styles.container}>
        <TextInput
          value={title}
          onChangeText={onChangeTitle}
          placeholder="Add title"
          style={styles.textInput}
        />
        <TextInput
          value={category}
          onChangeText={onChangeCategory}
          placeholder="Add Category"
          style={styles.textInput}
        />
        <Checkbox checked={check} onCheck={onCheck} />
      </View>
      <Pressable style={styles.submit} onPress={onSubmit}>
        <Text>{'Submit'}</Text>
      </Pressable>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {},
  textInput: {
    padding: 10,
    backgroundColor: '#fff',
    shadowOffset: 2,
    shadowColor: 'lightGray',
    shadowOpacity: 0.5,
    marginVertical: 10,
  },
  backButton: {},
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  submit: {
    borderWidth: 1,
    shadowOffset: 2,
    shadowColor: 'lightGray',
    shadowOpacity: 0.5,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 2,
    height: 50,
    padding: 10,
    width: 100,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddTask;
