import React from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {Button, Gap} from '../../components/atoms/index';
import {TextInput} from '../../components/molecules/index';
import Footer from '../../components/molecules/Footer'; // Import Footer

const SignIn = ({navigation}) => {
  return (
    <View style={styles.pageContainer}>
      <View style={styles.contentContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/Moodcook.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>moodcook</Text>
          <Text style={styles.subtitle}>
            Discover recipes that match{'\n'}your mood. Let your feelings{'\n'}
            guide your cooking.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <TextInput placeholder="email/username" />
          <Gap height={1} />
          <TextInput placeholder="password" secureTextEntry />
          <Gap height={24} />
          <Button label="sign in" />
          <Gap height={16} />
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.registerText}>
              don't have account yet?{' '}
              <Text style={styles.registerLink}>register here</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Component */}
      <Footer />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 62,
    paddingBottom: 20,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 204,
    height: 204,
    marginTop: 20,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'FragmentMono-Regular',
    fontSize: 16,
    marginTop: 12,
    color: '#000000',
  },
  subtitle: {
    fontFamily: 'FragmentMono-Regular',
    fontSize: 12,
    color: '#000000',
    textAlign: 'center',
    marginTop: 33,
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
  },
  registerText: {
    fontFamily: 'FragmentMono-Regular',
    fontSize: 10,
    color: '#000000',
    textAlign: 'center',
  },
  registerLink: {
    color: '#000000',
  },
});
