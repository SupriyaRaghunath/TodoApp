import React, { useContext } from 'react';
import { View, StyleSheet, Pressable, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckBox from './Checkbox';
import { TaskContext } from '../providers/TaskProvider';

const ListTasks = ({ navigation }) => {
  let { tasks, deleteTask } = useContext(TaskContext);

  let header = (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text>{`<- Back`}</Text>
      </Pressable>
    </View>
  );

  let renderItem = ({ item, index }) => {
    let { done, category } = item;

    let remove = async id => {
      deleteTask(id);
    };

    return (
      <View style={{ borderWidth: 1 }}>
        <Text>{item.title}</Text>
        <Text>{category || ''}</Text>
        <CheckBox checked={done} />
        <Pressable style={styles.pressable} onPress={() => remove(item.id)}>
          <Text>delete</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>{header}</View>
      <FlatList data={tasks} renderItem={renderItem} keyExtractor={id => id} />
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
