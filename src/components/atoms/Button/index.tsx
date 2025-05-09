import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const Button = ({
  label,
  color = '#F4C149',
  textColor = '#000000',
  onPress,
  disabled = false, // new prop
}) => {
  return (
    <TouchableOpacity
      style={[styles.button(color), disabled && styles.disabledButton]}
      activeOpacity={0.5}
      onPress={!disabled ? onPress : null}
      disabled={disabled}>
      <Text style={[styles.label(textColor), disabled && styles.disabledText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: color => ({
    backgroundColor: color,
    borderRadius: 8,
    paddingVertical: 8,
    width: 285, 
    alignSelf: 'center',
  }),
  label: textColor => ({
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: textColor,
  }),
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    color: '#666666',
  },
});
