import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';
import {Button, Gap} from '../../components/atoms/index';
import {TextInput} from '../../components/molecules/index';
import Eye from '../../assets/icons/eye.svg';
import EyeOff from '../../assets/icons/eyeclose.svg';
import Footer from '../../components/molecules/Footer';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {showMessage} from 'react-native-flash-message';
import {getDatabase, ref, get, child} from 'firebase/database';

const SignIn = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false); 

  const onSubmit = () => {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        const uid = user.uid;

        const db = getDatabase();
        const dbRef = ref(db, `users/${uid}`);

        get(dbRef)
          .then(snapshot => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              const mood = userData.mood;
              const username = userData.username || '';
              const email = user.email;

              if (mood) {
                navigation.navigate('Dashboard', {uid});
              } else {
                navigation.navigate('MoodRegister', {
                  uid,
                  username,
                  email,
                });
              }
            } else {  
              const email = user.email;
              const username = email?.split('@')[0] || 'user';

              // Store initial user info without mood
              set(ref(db, `users/${uid}`), {
                username,
                email,
              }).then(() => {
                navigation.navigate('MoodRegister', {
                  uid,
                  username,
                  email,
                });
              });
            }
          })
          .catch(error => {
            console.error('Database read error:', error);
            showMessage({
              message: 'Error reading user data',
              type: 'danger',
            });
          });
      })
      .catch(error => {
        const errorMessage = error.message;
        showMessage({
          message: errorMessage,
          type: 'danger',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

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
          <TextInput
            placeholder="email"
            value={email}
            onChangeText={e => setEmail(e)}
          />
          <Gap height={24} />
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.input}
              placeholder="password"
              secureTextEntry={secureText}
              onChangeText={setPassword}
              value={password}
            />
            {password.length > 0 && (
              <TouchableOpacity
                style={styles.eyeicon}
                onPress={() => setSecureText(!secureText)}>
                {secureText ? (
                  <Eye width={20} height={20} />
                ) : (
                  <EyeOff width={20} height={20} />
                )}
              </TouchableOpacity>
            )}
          </View>
          <Gap height={24} />
          <Button
            label={loading ? 'Signing in...' : 'sign in'}
            onPress={onSubmit}
            disabled={loading}
          />
          <Gap height={16} />
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>don't have account yet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.registerLink}> register here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

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
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: '#020202',
    width: 285,
    padding: 10,
    alignSelf: 'center',
    height: 40,
  },
  input: {
    right: 5,
    bottom: 10,
    height: 48,
    color: '#000000',
    fontSize: 14,
  },
  eyeicon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  registerText: {
    fontFamily: 'FragmentMono-Regular',
    fontSize: 10,
    color: '#000000',
    textAlign: 'center',
  },
  registerLink: {
    color: '#000000',
    fontSize: 10,
    fontFamily: 'FragmentMono-Regular',
  },
});
