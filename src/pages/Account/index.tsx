import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  Alert,
  BackHandler,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {Picker} from '@react-native-picker/picker';
import Footer from '../../components/molecules/Footer';
import {getAuth, signOut, deleteUser} from 'firebase/auth';
import {getDatabase, ref, get, update, set, remove} from 'firebase/database';

const Account = ({navigation, route}) => {
  const [currentMood, setCurrentMood] = useState('happy');
  const [photo, setPhoto] = useState(require('../../assets/user-icon.png'));
  const [photoBased64, setPhotoBased64] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const db = getDatabase();
          const userRef = ref(db, `users/${currentUser.uid}`);

          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const userData = snapshot.val();
            setName(userData.name || '');
            setEmail(currentUser.email || '');
            if (userData.mood) {
              setCurrentMood(userData.mood);
            }
            if (userData.photo) {
              setPhoto({uri: userData.photo});
              setPhotoBased64(userData.photo);
            }
          } else {
            // Initialize user data if it doesn't EXIST
            await set(userRef, {
              name: currentUser.displayName || '',
              email: currentUser.email || '',
              mood: 'happy',
            });
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
    setShowDeleteModal(true);
  };

  const confirmAccountDeletion = () => {
    if (confirmationCode !== '123456') {
      showMessage({
        message: 'Invalid confirmation code',
        type: 'danger',
      });
      return;
    }

    Alert.alert(
      'Confirm Deletion',
      'Are you absolutely sure you want to delete your account? This will permanently erase all your data and cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteAccount(),
        },
      ],
      {cancelable: true},
    );
  };

  const deleteAccount = async () => {
    if (!currentUser) return;

    setIsDeleting(true);
    try {
      // Delete user data from Realtime Database
      const db = getDatabase();
      const userRef = ref(db, `users/${currentUser.uid}`);
      await remove(userRef);

      // Delete the user account
      await deleteUser(currentUser);

      showMessage({
        message: 'Account deleted successfully',
        type: 'success',
      });
      navigation.replace('SignIn');
    } catch (error) {
      console.error('Error deleting account:', error);
      showMessage({
        message: 'Failed to delete account. Please try again.',
        type: 'danger',
      });
    } finally {
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
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
      quality: 0.3,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
    });

    handleImageResult(result, 'kamera');
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.3,
      maxWidth: 500,
      maxHeight: 500,
      includeBase64: true,
    });

    handleImageResult(result, 'galeri');
  };

  const handleImageResult = async (result, source) => {
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
      console.log('Base64 length:', base64.length); // Debug: Log Base64 size
      setPhoto({uri: base64});
      setPhotoBased64(base64);

      // Save photo to Firebase Realtime Database
      if (currentUser) {
        try {
          const db = getDatabase();
          const userRef = ref(db, `users/${currentUser.uid}/photo`);
          console.log(
            'Attempting to save photo to:',
            `users/${currentUser.uid}/photo`,
          ); // Debug: Log path
          await set(userRef, base64);
          showMessage({
            message: 'Foto profil berhasil diperbarui dan disimpan!',
            type: 'success',
          });
        } catch (error) {
          console.error('Error saving photo:', error.message, error.code); // Debug: Detailed error
          showMessage({
            message: `Gagal menyimpan foto: ${error.message}`,
            type: 'danger',
          });
        }
      }
    } else {
      showMessage({
        message: 'Gagal mengambil gambar.',
        type: 'danger',
      });
    }
  };

  // Function to update mood in Firebase
  const updateMoodInDatabase = async newMood => {
    if (!currentUser) return;

    try {
      const db = getDatabase();
      const userRef = ref(db, `users/${currentUser.uid}`);

      await update(userRef, {
        mood: newMood,
      });

      showMessage({
        message: 'Mood updated successfully!',
        type: 'success',
      });
    } catch (error) {
      console.error('Error updating mood:', error);
      showMessage({
        message: 'Failed to update mood',
        type: 'danger',
      });
    }
  };

  const handleMoodChange = itemValue => {
    setCurrentMood(itemValue);
    updateMoodInDatabase(itemValue);
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
              onValueChange={handleMoodChange}
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
            <Text style={styles.lightButtonText1}>log out</Text>
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

      {/* Delete Account Modal */}
      <Modal
        visible={showDeleteModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.deleteCard}>
            <Text style={styles.deleteTitle}>Delete Account</Text>
            <Text style={styles.deleteWarning}>
              Warning: This action is irreversible! All your data will be permanently deleted.
            </Text>
            
            <Text style={styles.deleteInstructions}>
              To confirm deletion, please enter the confirmation code: 123456
            </Text>
            
            <TextInput
              style={styles.confirmationInput}
              keyboardType="numeric"
              value={confirmationCode}
              onChangeText={setConfirmationCode}
              autoFocus={true}
            />
            
            <View style={styles.deleteButtonRow}>
              <TouchableOpacity 
                style={styles.cancelDeleteButton}
                onPress={() => setShowDeleteModal(false)}>
                <Text style={styles.cancelDeleteText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.confirmDeleteButton}
                onPress={confirmAccountDeletion}
                disabled={isDeleting}>
                {isDeleting ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text style={styles.confirmDeleteText}>Delete Account</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Footer />
    </View>
  );
};

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
  buttonTextWhite: {
    color: '#000000',
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
  buttonTextDark: {
    color: '#ffffff',
    fontSize: 14,
  },
  footer: {
    marginTop: 20,
  },
  footerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#000000',
  },
  lightButtonText1: {
    color: '#fff',
  },
  // Delete Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  deleteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 350,
  },
  deleteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 15,
    textAlign: 'center',
  },
  deleteWarning: {
    color: '#d32f2f',
    marginBottom: 15,
    lineHeight: 20,
  },
  deleteInstructions: {
    color: '#333333',
    marginBottom: 20,
    lineHeight: 20,
  },
  confirmationInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
  },
  deleteButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelDeleteButton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  confirmDeleteButton: {
    backgroundColor: '#d32f2f',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  cancelDeleteText: {
    color: '#333333',
    fontWeight: 'bold',
  },
  confirmDeleteText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default Account;