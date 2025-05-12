import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, get} from 'firebase/database';

const Header = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [userPhoto, setPhoto] = useState(null);

  useEffect(() => {
    // Function to fetch the current user's name and photo from Firebase
    const fetchUserData = async () => {
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
            // Set user photo if available
            if (userData.photo) {
              setPhoto(userData.photo);
            }
          } else {
            // If no data in database, use displayName or default
            setUsername(currentUser.displayName || 'user');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUsername('user');
        }
      } else {
        setUsername('guest');
      }
    };

    fetchUserData();

    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(fetchUserData);

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
        <Image
          source={require('../../../assets/Moodcook.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <View style={styles.headerRight}>
        <Text style={styles.greeting}>hi, {username}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <Image
            source={
              userPhoto
                ? {uri: userPhoto}
                : require('../../../assets/user-icon.png')
            }
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
