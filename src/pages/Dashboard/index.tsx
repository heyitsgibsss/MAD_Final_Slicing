import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../../components/molecules/Header';
import Footer from '../../components/molecules/Footer';
import {getAuth} from 'firebase/auth';
import {getDatabase, ref, get, onValue} from 'firebase/database';
import {Gap} from '../../components/atoms/index';

const Dashboard = ({navigation}) => {
  const [name, setName] = useState('');
  const [currentMood, setCurrentMood] = useState('happy');
  const [loading, setLoading] = useState(true);

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
            setCurrentMood(userData.currentMood || 'happy');
          } else {
            setName(currentUser.displayName || '');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  // Daftar gambar dan navigasi tujuannya
  const recipeItems = [
    {
      image: require('../../assets/recipes/chocolatelavacake.jpeg'),
      screen: 'Details1',
    },
    {
      image: require('../../assets/recipes/rainbowsmoothies.jpeg'),
      screen: 'Details2',
    },
    {
      image: require('../../assets/recipes/pastabake.jpeg'),
      screen: 'Details3',
    },
    {
      image: require('../../assets/recipes/fruitpancake.jpeg'),
      screen: 'Details4',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.textContainer}>
        <Text style={styles.moodText}>{name.toLowerCase()},</Text>
        <Text style={styles.currentMood}>
          your current mood is {currentMood}
        </Text>
      </View>
      <Gap height={20} />
      <Gap height={20} />

      {/* Grid Atas */}
      <View style={styles.grid}>
        {recipeItems.slice(0, 2).map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.screen)}
            style={styles.foodImage}>
            <Image
              source={item.image}
              style={styles.imageInside}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Quote di tengah */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>
          "When life gets messy, I stir, simmer, and season my way back to
          peace."
        </Text>
      </View>

      {/* Grid Bawah */}
      <View style={styles.grid}>
        {recipeItems.slice(2, 4).map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.screen)}
            style={styles.foodImage}>
            <Image
              source={item.image}
              style={styles.imageInside}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      <Gap height={20} />
      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('Others')}>
        <Text style={styles.buttonText}>see other happy recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate('AllFood')}>
        <Text style={styles.buttonText}>
          see all recipes available [ALL MOOD]
        </Text>
      </TouchableOpacity>

      <Footer />
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
    alignItems: 'center',
  },
  textContainer: {
    alignSelf: 'flex-start',
  },
  moodText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textTransform: 'lowercase',
  },
  currentMood: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  foodImage: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  imageInside: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  quoteContainer: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#444',
    textAlign: 'left',
    marginBottom: 10,
  },
  button1: {
    backgroundColor: '#F4C542',
    paddingVertical: 12,
    marginTop: 5,
    borderRadius: 5,
    width: 195,
    marginBottom: 6,
    alignSelf: 'stretch',
    borderColor: '#F3891B',
    borderWidth: 2,
  },
  button2: {
    backgroundColor: '#F4C542',
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 5,
    width: 286,
    marginBottom: 10,
    alignSelf: 'stretch',
    borderColor: '#F3891B',
    borderWidth: 2,
  },
  buttonText: {
    textAlign: 'left',
    fontFamily: 'OpenSans',
    color: '#000',
    fontSize: 15.5,
    marginLeft: 10,
  },
});
