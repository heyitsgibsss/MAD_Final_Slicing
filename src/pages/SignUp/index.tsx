// screens/SignUp.tsx
import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import TextInput from '../../components/molecules/TextInput/signupindex';
import {Gap} from '../../components/atoms/index';
const SignUp = ({navigation}) => {
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
        <TextInput label="name" />
        <Gap height={2} />
        <TextInput label="email" keyboardType="email-address" />
        <Gap height={2} />
        <TextInput label="password" secureTextEntry />
        <Gap height={2} />
        <TextInput label="confirm password" secureTextEntry />
        <Gap height={2} />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.loginLink}> login here</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>register</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>created by avg</Text>
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
    paddingBottom: 20,
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
