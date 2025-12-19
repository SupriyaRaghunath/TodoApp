import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }) => {
  const navigateTo = screen => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Pressable
          style={styles.pressable}
          onPress={() => navigateTo('AddTask')}
        >
          <Text>Add Task</Text>
        </Pressable>
        <Pressable
          style={styles.pressable}
          onPress={() => navigateTo('ListTasks')}
        >
          <Text>List Tasks</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pressable: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
  },
});

export default HomeScreen;
