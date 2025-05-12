import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import Footer from '../../components/molecules/Footer';
import {
  getAuth,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import {getDatabase, ref, onValue} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';

const ChangePassword = ({navigation}) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  // Fetch username in real-time
  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}/name`);

      const unsubscribe = onValue(
        userRef,
        snapshot => {
          if (snapshot.exists()) {
            setUsername(snapshot.val() || 'User');
          } else {
            setUsername(user.displayName || 'User');
            console.warn('Username not found in database');
          }
        },
        error => {
          console.error('Error fetching username:', error);
          setUsername(user.displayName || 'User');
        },
      );

      return () => unsubscribe();
    } else {
      setUsername('Guest');
    }
  }, [user]);

  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      showMessage({
        message: 'Please fill in both password fields',
        type: 'danger',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage({
        message: 'Passwords do not match',
        type: 'danger',
      });
      return;
    }

    if (newPassword.length < 6) {
      showMessage({
        message: 'Password must be at least 6 characters',
        type: 'danger',
      });
      return;
    }

    if (!user) {
      showMessage({
        message: 'No user is signed in',
        type: 'danger',
      });
      navigation.navigate('SignIn');
      return;
    }

    setLoading(true);
    console.log('Starting password change, loading:', true);

    try {
      await updatePassword(user, newPassword);
      showMessage({
        message: 'Password updated successfully',
        type: 'success',
      });
      console.log('Password updated for user:', user.uid);
      navigation.goBack(); // Return to previous screen (e.g., Account)
    } catch (error) {
      if (error.code === 'auth/requires-recent-login') {
        showMessage({
          message: 'Please re-login to update your password',
          type: 'warning',
        });
        navigation.navigate('SignIn');
      } else {
        showMessage({
          message: error.message || 'Failed to update password',
          type: 'danger',
        });
        console.error('Password change error:', error.message);
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
        console.log('Password change complete, loading:', false);
      }, 500); // 500ms minimum loading time
    }
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/Moodcook.png')}
          style={styles.logo}
        />

        <Text style={styles.nameText}>{username}</Text>

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

        <TouchableOpacity
          style={[styles.buttonBlue, loading && styles.buttonDisabled]}
          onPress={handleChangePassword}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Updating...' : 'confirm change password'}
          </Text>
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
  buttonDisabled: {
    backgroundColor: '#99ccff',
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
