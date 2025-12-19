import { Pressable, Text, StyleSheet } from 'react-native';

const CheckBox = ({ checked, onCheck }) => {
  return (
    <Pressable style={styles.pressable} onPress={onCheck}>
      {checked ? <Text>✓</Text> : <></>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    borderWidth: 1,
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CheckBox;
