import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const Account = ({navigation}) => {
  const [currentMood, setCurrentMood] = useState('happy');
  const email = 'angelika@example.com'; // contoh email
  const name = 'angelika';

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

        <Text style={styles.greetingText}>hi, {name}!</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            editable={false} // email tidak bisa diubah
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>current mood:</Text>
          <TextInput
            style={styles.input}
            value={currentMood}
            onChangeText={setCurrentMood} // user bisa ketik mood sendiri
          />
        </View>

        <TouchableOpacity style={styles.buttonWhite}>
          <Text style={styles.buttonTextWhite}>my favorite recipes</Text>
        </TouchableOpacity>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonDark}>
            <Text style={styles.buttonTextDark}>log out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDark}>
            <Text style={styles.buttonTextDark}>change password</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.buttonWhite}>
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
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  profileInitial: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: 'bold',
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
});
