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
import {getDatabase, ref, onValue} from 'firebase/database';
import {Gap} from '../../components/atoms/index';

const Dashboard = ({navigation}) => {
  const [name, setName] = useState('');
  const [mood, setMood] = useState('');
  const [randomQuote, setRandomQuote] = useState('');
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  // Define quotes for each mood
  const moodQuotes = {
    happy: [
      'Life is a recipe for joy—mix laughter, love, and a pinch of sunshine!',
      'Happiness is a warm kitchen filled with the aroma of your favorite dish.',
      'Stir up some smiles and let your heart bake in the glow of today!',
    ],
    sad: [
      'Even on cloudy days, a comforting meal can wrap you in warmth.',
      'Let the gentle simmer of a cozy dish soothe your soul.',
      'Tough moments pass, but a good recipe can be your quiet comfort.',
    ],
    excited: [
      'Life’s a feast—grab a vibrant dish and dive into the adventure!',
      'Spice up your day with bold flavors and boundless energy!',
      'Every bite is a spark of excitement waiting to ignite your spirit!',
    ],
    angry: [
      'Channel that fire into a sizzling dish and cook away the heat!',
      'A fiery recipe can match your passion and cool your temper.',
      'Pound the dough, spice it up, and let the kitchen tame the storm!',
    ],
    relaxed: [
      'Savor the calm with a slow-cooked dish that whispers peace.',
      'Let the rhythm of chopping and stirring be your kitchen meditation.',
      'A gentle sip of warmth can make any moment feel like home.',
    ],
  };

  // Function to select a random quote for the current mood
  const selectRandomQuote = (currentMood: string): string => {
    const quotes = moodQuotes[currentMood] || [
      'When life gets messy, I stir, simmer, and season my way back to peace.',
    ];
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  useEffect(() => {
    if (currentUser) {
      const db = getDatabase();
      const userRef = ref(db, `users/${currentUser.uid}`);

      const unsubscribe = onValue(
        userRef,
        snapshot => {
          const userData = snapshot.val();
          if (userData) {
            setName(userData.name || '');
            setMood(userData.mood || '');
            setRandomQuote(selectRandomQuote(userData.mood || '')); // Set initial quote
          }
          setLoading(false);
        },
        error => {
          console.error('Error fetching user data:', error);
          setLoading(false);
        },
      );

      // Update quote on navigation focus
      const unsubscribeFocus = navigation.addListener('focus', () => {
        setRandomQuote(selectRandomQuote(mood));
      });

      return () => {
        unsubscribe();
        unsubscribeFocus();
      };
    }
  }, [currentUser, navigation, mood]);

  // Define recipe items with associated moods and recipeIds
  const recipeItems = [
    {
      image: require('../../assets/recipes/chocolatelavacake.jpeg'),
      recipeId: 'chocolate-lava-cake',
      moods: ['happy'],
    },
    {
      image: require('../../assets/recipes/rainbowsmoothies.jpeg'),
      recipeId: 'rainbow-smoothies',
      moods: ['happy'],
    },
    {
      image: require('../../assets/recipes/pastabake.jpeg'),
      recipeId: 'pastabake',
      moods: ['happy'],
    },
    {
      image: require('../../assets/recipes/fruitpancake.jpeg'),
      recipeId: 'fruit-pancake',
      moods: ['happy'],
    },
    {
      image: require('../../assets/recipes/chickensoup.jpeg'),
      recipeId: 'chicken-soup',
      moods: ['sad'],
    },
    {
      image: require('../../assets/recipes/mashedpotato.jpeg'),
      recipeId: 'mashed-potato',
      moods: ['sad'],
    },
    {
      image: require('../../assets/recipes/hotchoco.jpeg'),
      recipeId: 'hot-choco',
      moods: ['sad'],
    },
    {
      image: require('../../assets/recipes/mushroomrisotto.jpeg'),
      recipeId: 'mushroom-risotto',
      moods: ['sad'],
    },
    {
      image: require('../../assets/recipes/greentea.jpeg'),
      recipeId: 'green-tea',
      moods: ['excited'],
    },
    {
      image: require('../../assets/recipes/avocadotoast.jpeg'),
      recipeId: 'avocado-toast',
      moods: ['excited'],
    },
    {
      image: require('../../assets/recipes/oatmeal.jpeg'),
      recipeId: 'oatmeal',
      moods: ['excited'],
    },
    {
      image: require('../../assets/recipes/lavenderhoneymilk.jpeg'),
      recipeId: 'lavender-honey-milk',
      moods: ['excited'],
    },
    {
      image: require('../../assets/recipes/springrolls.jpeg'),
      recipeId: 'spring-rolls',
      moods: ['angry'],
    },
    {
      image: require('../../assets/recipes/pizza.jpeg'),
      recipeId: 'pizza',
      moods: ['angry'],
    },
    {
      image: require('../../assets/recipes/fruitskewers.jpeg'),
      recipeId: 'fruit-skewers',
      moods: ['angry'],
    },
    {
      image: require('../../assets/recipes/sushiburito.jpeg'),
      recipeId: 'sushi-burrito',
      moods: ['angry'],
    },
    {
      image: require('../../assets/recipes/ramen.jpeg'),
      recipeId: 'ramen',
      moods: ['relaxed'],
    },
    {
      image: require('../../assets/recipes/hotwings.jpeg'),
      recipeId: 'hot-wings',
      moods: ['relaxed'],
    },
    {
      image: require('../../assets/recipes/volcanodrink.jpeg'),
      recipeId: 'volcano-drink',
      moods: ['relaxed'],
    },
    {
      image: require('../../assets/recipes/hellfirenoodles.jpeg'),
      recipeId: 'hellfire-noodles',
      moods: ['relaxed'],
    },
  ];

  // Filter recipes based on current mood
  const filteredRecipes = recipeItems.filter(item => item.moods.includes(mood));

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.textContainer}>
        <Text style={styles.moodText}>{name.toLowerCase()},</Text>
        <Text style={styles.currentMood}>your current mood is {mood}</Text>
      </View>
      <Gap height={20} />

      {filteredRecipes.length > 0 ? (
        <>
          <View style={styles.grid}>
            {filteredRecipes.slice(0, 2).map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('Details', {recipeId: item.recipeId})
                }
                style={styles.foodImage}>
                <Image
                  source={item.image}
                  style={styles.imageInside}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.quoteContainer}>
            <Text style={styles.quote}>{randomQuote}</Text>
          </View>

          <View style={styles.grid}>
            {filteredRecipes.slice(2, 4).map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('Details', {recipeId: item.recipeId})
                }
                style={styles.foodImage}>
                <Image
                  source={item.image}
                  style={styles.imageInside}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.noRecipesContainer}>
          <Text style={styles.noRecipesText}>
            No recipes found for your current mood "{mood}".
          </Text>
          <TouchableOpacity
            style={styles.exploreButton}
            onPress={() => navigation.navigate('AllFood')}>
            <Text style={styles.exploreButtonText}>Explore All Recipes</Text>
          </TouchableOpacity>
        </View>
      )}

      <Gap height={20} />
      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('Others')}>
        <Text style={styles.buttonText}>see other {mood} recipes</Text>
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
    paddingBottom: 110,
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
  noRecipesContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  noRecipesText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 10,
  },
  exploreButton: {
    backgroundColor: '#F4C542',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: '#F3891B',
    borderWidth: 2,
  },
  exploreButtonText: {
    fontSize: 15,
    color: '#000',
    fontFamily: 'OpenSans',
  },
});
