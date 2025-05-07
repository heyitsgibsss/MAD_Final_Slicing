import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput as PaperInput} from 'react-native-paper';
import Eye from '../../../assets/icons/eye.svg';
import EyeOff from '../../../assets/icons/eyeclose.svg';

const TextInput = ({label, isPassword, ...props}) => {
  const [secureText, setSecureText] = useState(isPassword);

  return (
    <View style={styles.container}>
      <PaperInput
        label={label}
        mode="flat"
        underlineColor="#000000"
        activeUnderlineColor="#000000"
        style={styles.input}
        secureTextEntry={secureText} // Kondisi untuk password
        {...props}
      />
      {isPassword && (
        <TouchableOpacity
          style={styles.eyeicon}
          onPress={() => setSecureText(!secureText)}>
          {secureText ? (
            <Eye width={20} height={20} />
          ) : (
            <EyeOff width={20} height={20} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    width: 279,
    marginBottom: 8,
    position: 'relative', // Untuk memastikan ikon mata berada di dalam container
  },
  input: {
    backgroundColor: 'transparent',
    fontSize: 16,
    color: '#000000',
    paddingHorizontal: 0,
    paddingVertical: 5,
  },
  eyeicon: {
    position: 'absolute',
    right: 10,
    top: 25, // Sesuaikan posisi ikon mata
  },
});
