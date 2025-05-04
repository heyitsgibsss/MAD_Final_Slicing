import {StyleSheet, Text, View, TextInput as Input} from 'react-native';
import React from 'react';

const TextInput = ({label, placeholder, ...rest}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <Input placeholder={placeholder} style={styles.input} {...rest} />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 0.2,
    borderColor: '#020202',
    borderRadius: 8,
    padding: 10,
    width: 285,
    alignSelf: 'center',
  },
});
