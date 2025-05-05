import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {showMessage} from 'react-native-flash-message';
import {Picker} from '@react-native-picker/picker';

const Account = ({navigation}) => {
  const [currentMood, setCurrentMood] = useState('happy');
  const [photo, setPhoto] = useState(require('../../assets/user-icon.png'));
  const [photoBased64, setPhotoBased64] = useState('');
  const email = 'angelika@example.com'; // contoh email
  const name = 'angelika';

  const getImage = async () => {
    const result = await launchImageLibrary({
      maxHeight: 100,
      maxWidth: 100,
      quality: 0.5,
      includeBase64: true,
      mediaType: 'photo',
    });

    if (result.didCancel) {
      showMessage({
        message: 'Foto tidak jadi dipilih.',
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

  return (
    <View style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <Image
          source={require('../../assets/Moodcook.png')}
          style={styles.logo}
        />

        <TouchableOpacity onPress={getImage}>
          <Image source={photo} style={styles.profileImage} />
        </TouchableOpacity>

        <Text style={styles.greetingText}>hi, {name}!</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>email:</Text>
          <TextInput style={styles.input} value={email} editable={false} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>current mood:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={currentMood}
              onValueChange={itemValue => setCurrentMood(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Happy" value="happy" />
              <Picker.Item label="Sad" value="sad" />
              <Picker.Item label="Excited" value="excited" />
              <Picker.Item label="Angry" value="angry" />
              <Picker.Item label="Relaxed" value="relaxed" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          style={styles.buttonWhite}
          onPress={() => navigation.navigate('Favorite')}>
          <Text style={styles.buttonTextWhite}>my favorite recipes</Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonDark}>
            <Text style={styles.buttonTextDark}>log out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonDark1}
            onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={styles.buttonTextDark1}>change password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonWhite1}>
          <Text style={styles.buttonTextWhite}>delete my account</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>created by avg</Text>
      </View>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    marginBottom: 12,
  },
  greetingText: {
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  inputGroup: {
    width: '100%',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 4,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
    color: '#000000',
  },
  buttonWhite: {
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonWhite1: {
    backgroundColor: '#B00000',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 12,
    width: '100%',
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
    width: '100%',
  },
  buttonDark: {
    backgroundColor: '#333333',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '48%',
    alignItems: 'center',
  },
  buttonDark1: {
    backgroundColor: '#69B927',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '48%',
    alignItems: 'center',
  },
  buttonTextDark: {
    color: '#ffffff',
    fontSize: 14,
  },
  buttonTextDark1: {
    color: '#131313',
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
});
