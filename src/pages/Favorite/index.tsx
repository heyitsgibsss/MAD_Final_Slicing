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

const Favorite = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!currentUser) return;

    const db = getDatabase();
    const favoritesRef = ref(db, `favorites/${currentUser.uid}`);

    // Ambil data favorit dari database
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
      {/* Header */}
      <Header />

      {/* Title */}
      <Text style={styles.title}>MY FAVORITE</Text>

      {/* Favorite Recipes */}
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorite recipes yet.</Text>
      ) : (
        <View style={styles.imagesContainer}>
          {favorites.map(recipe => (
            <View key={recipe.id} style={styles.imageWrapper}>
              <Image
                source={require('../../assets/sushi.png')} // Ganti sesuai gambar resep
                style={styles.recipeImage}
              />
              <TouchableOpacity onPress={() => removeFromFavorites(recipe.id)}>
                <Image
                  source={require('../../assets/bookmarkclose.png')}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
              <Text style={styles.recipeName}>{recipe.recipeName}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Footer */}
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
});
