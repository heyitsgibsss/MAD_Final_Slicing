import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Alert} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {Picker} from '@react-native-picker/picker';
import Footer from '../../components/molecules/Footer';
import {getAuth, signOut} from 'firebase/auth';
import {getDatabase, ref, get} from 'firebase/database';

const Account = ({navigation, route}) => {
  const [currentMood, setCurrentMood] = useState('happy');
  const [photo, setPhoto] = useState(require('../../assets/user-icon.png'));
  const [photoBased64, setPhotoBased64] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    // Fetch user data from Firebase Realtime Database
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          // Initialize database and create a reference to the user's data
          const db = getDatabase();
          const userRef = ref(db, `users/${currentUser.uid}`);

          // Get user data
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setName(userData.name || '');
            setEmail(currentUser.email || '');
          } else {
            // If user data doesn't exist in database, at least set email from auth
            setEmail(currentUser.email || '');
            setName(currentUser.displayName || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          showMessage({
            message: 'Failed to fetch user data',
            type: 'danger',
          });
        } finally {
          setLoading(false);
        }
      } else {
        // No user is signed in, redirect to sign-in
        navigation.replace('SignIn');
      }
    };

    fetchUserData();
  }, [currentUser, navigation]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('SignIn');
        showMessage({
          message: 'Logged out successfully',
          type: 'success',
        });
      })
      .catch(error => {
        console.error('Error signing out:', error);
        showMessage({
          message: 'Failed to log out',
          type: 'danger',
        });
      });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Implement delete account functionality here
            // This would involve deleting from Authentication and Database
            showMessage({
              message:
                'Account deletion functionality will be implemented soon',
              type: 'info',
            });
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleImagePicker = () => {
    Alert.alert(
      'Pilih Foto',
      'Ambil gambar dari:',
      [
        {
          text: 'Kamera',
          onPress: () => openCamera(),
        },
        {
          text: 'Galeri',
          onPress: () => openGallery(),
        },
        {
          text: 'Batal',
          style: 'cancel',
        },
      ],
      {cancelable: true},
    );
  };

  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
    });

    handleImageResult(result, 'kamera');
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.5,
      includeBase64: true,
    });

    handleImageResult(result, 'galeri');
  };

  const handleImageResult = (result, source) => {
    if (result.didCancel) {
      showMessage({
        message: `Pemilihan foto dari ${source} dibatalkan.`,
        type: 'warning',
      });
    } else if (result.errorCode) {
      showMessage({
        message: `Terjadi kesalahan: ${result.errorMessage}`,
        type: 'danger',
      });
    } else if (result.assets && result.assets.length > 0) {
      const asset = result.assets[0];

      if (!asset.base64 || !asset.type?.startsWith('image/')) {
        showMessage({
          message: 'File yang dipilih bukan gambar yang valid.',
          type: 'danger',
        });
        return;
      }

      const base64 = `data:${asset.type};base64,${asset.base64}`;
      setPhoto({uri: base64});
      setPhotoBased64(base64);

      showMessage({
        message: 'Foto profil berhasil diperbarui!',
        type: 'success',
      });
    } else {
      showMessage({
        message: 'Gagal mengambil gambar.',
        type: 'danger',
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.pageContainer, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/Moodcook.png')}
          style={styles.logo}
        />

        <TouchableOpacity onPress={handleImagePicker}>
          <Image source={photo} style={styles.profileImage} />
        </TouchableOpacity>

        <Text style={styles.greetingText}>hi, {name}!</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            editable={false}
            placeholder="email"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>current mood:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={currentMood}
              onValueChange={itemValue => setCurrentMood(itemValue)}
              style={styles.picker}>
              <Picker.Item label="happy" value="happy" />
              <Picker.Item label="sad" value="sad" />
              <Picker.Item label="excited" value="excited" />
              <Picker.Item label="angry" value="angry" />
              <Picker.Item label="relaxed" value="relaxed" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => navigation.navigate('Favorite')}>
          <Text style={styles.favoriteButtonText}>my favorite recipes</Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.lightButtonText}>log out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.passwordButton}
            onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={styles.lightButtonText1}>change password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={handleDeleteAccount}>
          <Text style={styles.lightButtonText}>delete my account</Text>
        </TouchableOpacity>
      </View>

      <Footer />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 42,
    paddingBottom: 20,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  profileImage: {
    width: 160,
    height: 160,
    borderRadius: 100,
    marginTop: 20,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  greetingText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 45,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '90%',
  },
  label: {
    marginLeft: 27,
    fontSize: 16,
    color: '#000000',
    width: 100,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#cccccc',
    right: 35,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  pickerWrapper: {
    width: '37%',
    borderColor: '#ffffff',
    overflow: 'hidden',
  },
  picker: {
    height: 60,
    width: '100%',
    marginLeft: 12,
  },
  favoriteButton: {
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '80%',
    alignItems: 'center',
  },
  favoriteButtonText: {
    color: '#888888',
    fontSize: 14,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    width: '80%',
    height: 40,
  },
  logoutButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '40%',
    alignItems: 'center',
  },
  passwordButton: {
    backgroundColor: '#4caf50',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '55%',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 12,
    width: '80%',
    alignItems: 'center',
  },
  lightButtonText: {
    color: '#ffffff',
    fontSize: 14,
  },
  lightButtonText1: {
    color: '#000',
    fontSize: 14,
  },
});
