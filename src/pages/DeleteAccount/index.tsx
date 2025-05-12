import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Footer from '../../components/molecules/Footer';
import {getAuth, deleteUser} from 'firebase/auth';
import {getDatabase, ref, onValue, remove} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';

const CONFIRMATION_CODE = '123456';

const DeleteAccount = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
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

  const handleDeleteAccount = () => {
    if (!user) {
      showMessage({
        message: 'No user is signed in',
        type: 'danger',
      });
      navigation.navigate('SignIn');
      return;
    }

    // Show confirmation alert
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Confirm',
          style: 'destructive',
          onPress: async () => {
            // Validate confirmation code
            if (!confirmationCode) {
              showMessage({
                message: 'Please enter the confirmation code',
                type: 'danger',
              });
              return;
            }

            if (confirmationCode !== CONFIRMATION_CODE) {
              showMessage({
                message: 'Incorrect confirmation code',
                type: 'danger',
              });
              return;
            }

            setLoading(true);
            console.log('Starting account deletion, loading:', true);

            try {
              // Delete user data from Realtime Database
              const db = getDatabase();
              const userRef = ref(db, `users/${user.uid}`);
              await remove(userRef);
              console.log('User data deleted from database:', user.uid);

              // Delete user from Firebase Authentication
              await deleteUser(user);
              console.log('User account deleted from auth:', user.uid);

              showMessage({
                message: 'Account deleted successfully',
                type: 'success',
              });
              navigation.navigate('SignIn');
            } catch (error) {
              if (error.code === 'auth/requires-recent-login') {
                showMessage({
                  message: 'Please re-login to delete your account',
                  type: 'warning',
                });
                navigation.navigate('SignIn');
              } else {
                showMessage({
                  message: error.message || 'Failed to delete account',
                  type: 'danger',
                });
                console.error('Account deletion error:', error.message);
              }
            } finally {
              setTimeout(() => {
                setLoading(false);
                console.log('Account deletion complete, loading:', false);
              }, 500); // 500ms minimum loading time
            }
          },
        },
      ],
      {cancelable: true},
    );
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
          <Text style={styles.label}>Enter Confirmation Code (123456)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter code"
            value={confirmationCode}
            onChangeText={setConfirmationCode}
            keyboardType="numeric"
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonRed, loading && styles.buttonDisabled]}
          onPress={handleDeleteAccount}
          disabled={loading}>
          <Text style={styles.buttonText}>
            {loading ? 'Deleting...' : 'Delete Account'}
          </Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};

export default DeleteAccount;

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
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    color: '#000000',
    fontSize: 14,
  },
  buttonRed: {
    backgroundColor: '#dc3545',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: 240,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: '#ff6b6b',
    opacity: 0.7,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
