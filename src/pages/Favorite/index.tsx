import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Footer from '../../components/molecules/Footer';
import Header from '../../components/molecules/Header';
import {Gap} from '../../components/atoms/index';
import {getDatabase, ref, onValue, remove} from 'firebase/database';
import {getAuth} from 'firebase/auth';

// Mapping nama file gambar lokal ke require()
const imageMap = {
  'chocolatelavacake.jpeg': require('../../assets/recipes/chocolatelavacake.jpeg'),
  'avocadotoast.jpeg': require('../../assets/recipes/avocadotoast.jpeg'),
  'springrolls.jpeg': require('../../assets/recipes/springrolls.jpeg'),
  'lavenderhoneymilk.jpeg': require('../../assets/recipes/lavenderhoneymilk.jpeg'),
  'oatmeal.jpeg': require('../../assets/recipes/oatmeal.jpeg'),
  'rainbowsmoothies.jpeg': require('../../assets/recipes/rainbowsmoothies.jpeg'),
  'pastabake.jpeg': require('../../assets/recipes/pastabake.jpeg'),
  'fruitpancake.jpeg': require('../../assets/recipes/fruitpancake.jpeg'),
  'chickensoup.jpeg': require('../../assets/recipes/chickensoup.jpeg'),
  'mashedpotato.jpeg': require('../../assets/recipes/mashedpotato.jpeg'),
  'hotchoco.jpeg': require('../../assets/recipes/hotchoco.jpeg'),
  'mushroomrisotto.jpeg': require('../../assets/recipes/mushroomrisotto.jpeg'),
  'greentea.jpeg': require('../../assets/recipes/greentea.jpeg'),
  'pizza.jpeg': require('../../assets/recipes/pizza.jpeg'),
  'fruitskewers.jpeg': require('../../assets/recipes/fruitskewers.jpeg'),
  'sushiburito.jpeg': require('../../assets/recipes/sushiburito.jpeg'),
  'ramen.jpeg': require('../../assets/recipes/ramen.jpeg'),
  'hotwings.jpeg': require('../../assets/recipes/hotwings.jpeg'),
  'volcanodrink.jpeg': require('../../assets/recipes/volcanodrink.jpeg'),
  'hellfirenoodles.jpeg': require('../../assets/recipes/hellfirenoodles.jpeg'),
};

const Favorite = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const db = getDatabase();
    const favoritesRef = ref(db, `favorites/${currentUser.uid}`);

    const unsubscribe = onValue(favoritesRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const formattedData = Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        }));
        setFavorites(formattedData);
      } else {
        setFavorites([]);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  const removeFromFavorites = recipeId => {
    if (!currentUser) return;

    const db = getDatabase();
    const recipeRef = ref(db, `favorites/${currentUser.uid}/${recipeId}`);

    remove(recipeRef)
      .then(() => {
        console.log('Recipe removed from favorites');
      })
      .catch(error => {
        console.error('Error removing recipe from favorites:', error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />
      <Text style={styles.title}>MY FAVORITE</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite recipes yet.</Text>
      ) : (
        <View style={styles.imagesContainer}>
          {favorites.map(recipe => (
            <View key={recipe.id} style={styles.imageWrapper}>
              <Image
                source={
                  imageMap[recipe.image] || require('../../assets/sushi.png')
                }
                style={styles.recipeImage}
              />
              <TouchableOpacity onPress={() => removeFromFavorites(recipe.id)}>
                <Image
                  source={require('../../assets/bookmarkclose.png')}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
              <Text style={styles.recipeName}>{recipe.recipeName}</Text>
              <Text style={styles.recipeDescription}>{recipe.description}</Text>
            </View>
          ))}
        </View>
      )}

      <Footer />
    </ScrollView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 680,
    alignItems: 'center',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 15,
    color: '#000',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
  imagesContainer: {
    width: '100%',
    marginTop: 20,
  },
  imageWrapper: {
    position: 'relative',
    marginBottom: 20,
  },
  recipeImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  starIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 20,
    height: 20,
  },
  recipeName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  recipeDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});
