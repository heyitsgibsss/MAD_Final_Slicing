import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Footer from '../../components/molecules/Footer';

const ChangePassword = ({navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/Moodcook.png')}
          style={styles.logo}
        />

        <View style={styles.profileCircle}>
          <Text style={styles.profileInitial}>A</Text>
        </View>

        <Text style={styles.nameText}>angelika</Text>

        <View style={styles.inputContainer}>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.input}
              placeholder="new password"
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              onPress={toggleShowNewPassword}
              style={styles.eyeIcon}>
              <Text>👁️</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.input}
              placeholder="confirm new password"
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              onPress={toggleShowConfirmPassword}
              style={styles.eyeIcon}>
              <Text>👁️</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.buttonBlue}>
          <Text style={styles.buttonText}>confirm change password</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 16,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logo: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  profileCircle: {
    width: 130,
    height: 130,
    borderRadius: 80,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileInitial: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '600',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 32,
  },
  inputContainer: {
    width: 240,
    marginBottom: 20,
    marginTop: 35,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 6,
    marginBottom: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  input: {
    flex: 1,
    height: 48,
    color: '#000000',
    fontSize: 14,
  },
  eyeIcon: {
    padding: 6,
  },
  buttonBlue: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: 240,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#000000',
  },
});
