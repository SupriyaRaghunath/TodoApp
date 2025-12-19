import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from './Checkbox';

const ListTasks = ({ navigation }) => {
  let [tasks, setTasks] = useState({});

  let getItems = async () => {
    let keys = await AsyncStorage.getAllKeys();
    let data = await AsyncStorage.multiGet(keys);

    let _data = {};

    data.forEach(item => {
      _data[item[0]] = JSON.parse(item[1]);
    });

    setTasks(_data);
  };
  useEffect(() => {
    getItems();
  }, []);

  let header = (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text>{`<- Back`}</Text>
      </Pressable>
    </View>
  );

  let renderItem = ({ item, index }) => {
    let { done, category } = tasks[item];

    let deleteTask = async item => {
      AsyncStorage.removeItem(item);
    };

    return (
      <View style={{ borderWidth: 1 }}>
        <Text>{item}</Text>
        <Text>{category || ''}</Text>
        <CheckBox checked={done} />
        <Pressable style={styles.pressable} onPress={() => deleteTask(item)}>
          <Text>delete</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>{header}</View>
      <FlatList data={Object.keys(tasks)} renderItem={renderItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: { alignSelf: 'flex-start' },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  listItem: {},
});
export default ListTasks;
