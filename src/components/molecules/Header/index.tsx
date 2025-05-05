import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, get} from 'firebase/database';

const Header = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Function to fetch the current user's name from Firebase
    const fetchUsername = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (currentUser) {
        try {
          // Initialize database and create a reference to the user's data
          const db = getDatabase();
          const userRef = ref(db, `users/${currentUser.uid}`);

          // Get user data
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            const userData = snapshot.val();
            if (userData.name) {
              setUsername(userData.name);
            } else {
              // Fallback to displayName if available
              setUsername(currentUser.displayName || 'user');
            }
          } else {
            // If no data in database, use displayName or default
            setUsername(currentUser.displayName || 'user');
          }
        } catch (error) {
          console.error('Error fetching username:', error);
          setUsername('user'); // Default fallback on error
        }
      } else {
        setUsername('guest');
      }
    };

    fetchUsername();

    // Listen for auth state changes to update username accordingly
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(fetchUsername);

    // Clean up listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Moodcook.png')}
        style={styles.icon}
      />
      <View style={styles.headerRight}>
        <Text style={styles.greeting}>hi, {username}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Image
            source={require('../../../assets/user-icon.png')}
            style={styles.profileIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4C149',
    width: '111%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    height: 50,
    paddingHorizontal: 20,
  },
  icon: {
    width: 40,
    height: 50,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 12,
    marginRight: 8,
    fontWeight: '600',
    color: '#000',
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ccc',
  },
});
