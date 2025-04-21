// components/molecules/TextInput.tsx
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput as PaperInput} from 'react-native-paper';

const TextInput = ({label, ...props}) => {
  return (
    <View style={styles.container}>
      <PaperInput
        label={label}
        mode="flat"
        underlineColor="#000000"
        activeUnderlineColor="#000000"
        style={styles.input}
        {...props}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: 279,
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#000000',
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
});
