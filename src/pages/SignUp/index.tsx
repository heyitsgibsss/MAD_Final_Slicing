// screens/SignUp.tsx
import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import TextInput from '../../components/molecules/TextInput/signupindex';
import {Gap} from '../../components/atoms/index';
import Button from '../../components/atoms/Button';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
import {getDatabase, ref, set} from 'firebase/database';
import {showMessage} from 'react-native-flash-message';
import Footer from '../../components/molecules/Footer';

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onRegister = () => {
    if (password !== confirmPassword) {
      showMessage({
        message: 'Passwords do not match',
        type: 'danger',
      });
      return;
    }

    const auth = getAuth();
    const db = getDatabase();

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        set(ref(db, 'users/' + user.uid), {
          email: email,
        });
        showMessage({
          message: 'Registration success, please Log in',
          type: 'success',
        });
        navigation.navigate('SignIn');
        console.log(user);
      })
      .catch(error => {
        showMessage({
          message: error.message,
          type: 'danger',
        });
      });
  };

  return (
    <View style={styles.pageContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/Moodcook.png')}
          style={styles.logo}
        />
      </View>

      <Text style={styles.createAccount}>CREATE AN ACCOUNT</Text>

      <View style={styles.formContainer}>
        <TextInput label="name" onChangeText={setName} />
        <Gap height={2} />
        <TextInput
          label="email"
          placeholder="email"
          value={email}
          onChangeText={e => setEmail(e)}
        />
        <Gap height={2} />
        <TextInput
          label="password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <Gap height={2} />
        <TextInput
          label="confirm password"
          secureTextEntry
          onChangeText={setConfirmPassword}
        />
        <Gap height={2} />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.loginLink}> login here</Text>
          </TouchableOpacity>
        </View>

        <Button label="register" onPress={onRegister} />
      </View>

      <Footer />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 220,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 135,
    height: 135,
    resizeMode: 'contain',
  },
  createAccount: {
    fontFamily: 'Montserrat-Bold',
    marginTop: 25,
    marginBottom: 30,
    height: 22,
    letterSpacing: 0.5,
    fontSize: 16,
    textAlign: 'center',
    color: '#000000',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    fontFamily: 'FragmentMono-Regular',
    fontSize: 10,
    height: 22,
    color: '#000000 ',
    textAlign: 'center',
    marginTop: 8,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginLink: {
    fontFamily: 'FragmentMono-Regular',
    fontSize: 10,
    color: '#000000',
  },
  registerButton: {
    marginTop: 6,
    width: 285,
    height: 30,
    backgroundColor: '#333',
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  registerButtonText: {
    textAlign: 'center',
    alignItems: 'center',
    color: '#ffffff',
    fontSize: 16,
  },
  footerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#000',
    marginTop: 170,
  },
});
