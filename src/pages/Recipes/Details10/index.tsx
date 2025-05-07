import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/molecules/Header';
import Footer from '../../../components/molecules/Footer';
import {getDatabase, ref, set, remove} from 'firebase/database';
import {getAuth} from 'firebase/auth';

const Details10 = () => {
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (recipeId, recipeName) => {
    if (!currentUser) {
      console.log('User not logged in');
      return;
    }

    const db = getDatabase();
    const favoritesRef = ref(db, `favorites/${currentUser.uid}/${recipeId}`);

    if (isBookmarked) {
      remove(favoritesRef)
        .then(() => {
          console.log('Recipe removed from favorites');
          setIsBookmarked(false);
        })
        .catch(error => {
          console.error('Error removing from favorites:', error);
        });
    } else {
      set(favoritesRef, {
        recipeName: recipeName,
        timestamp: new Date().toISOString(),
      })
        .then(() => {
          console.log('Recipe saved to favorites');
          setIsBookmarked(true);
        })
        .catch(error => {
          console.error('Error saving to favorites:', error);
        });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.card}>
        <Image
          source={require('../../../assets/recipes/avocadotoast.jpeg')}
          style={styles.recipeImage}
        />

        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>Chocolate Lava Cake</Text>
          <Text style={styles.recipeSubtitle}>
            Kue cokelat lembut dengan isian lumer yang menghibur hati
          </Text>

          <TouchableOpacity
            style={styles.bookmarkIcon}
            onPress={() =>
              toggleBookmark('chocolate-lava-cake', 'Chocolate Lava Cake')
            }>
            <Image
              source={
                isBookmarked
                  ? require('../../../assets/bookmarkclose.png')
                  : require('../../../assets/bookmark.png')
              }
              style={styles.bookmarkImage}
            />
          </TouchableOpacity>

          <View style={styles.recipeDetails}>
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            <Text style={styles.recipeText}>
              100g dark chocolate{'\n'}
              100g mentega{'\n'}2 butir telur{'\n'}
              50g gula{'\n'}
              30g tepung terigu
            </Text>

            <Text style={styles.sectionTitle}>Instructions:</Text>
            <Text style={styles.recipeText}>
              1. Lelehkan cokelat dan mentega bersama-sama.{'\n'}
              2. Kocok telur dan gula hingga mengembang.{'\n'}
              3. Campurkan lelehan cokelat dan kocokan telur.{'\n'}
              4. Tambahkan tepung, aduk rata.{'\n'}
              5. Tuang ke dalam cetakan, panggang 8–10 menit.
            </Text>
          </View>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

export default Details10;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 100,
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
  },
  recipeImage: {
    width: '100%',
    height: 330,
  },
  recipeContent: {
    padding: 15,
    position: 'relative',
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  recipeSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  bookmarkIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  bookmarkImage: {
    width: 24,
    height: 24,
  },
  recipeDetails: {
    backgroundColor: '#F4C149',
    height: '60%',
    padding: 10,
    borderRadius: 15,
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 18,
    marginTop: 10,
    marginBottom: 5,
    color: '#000',
    marginInlineStart: 10,
    marginInlineEnd: 10,
  },
  recipeText: {
    color: '#333',
    fontSize: 18,
    lineHeight: 20,
    marginInlineStart: 20,
    marginInlineEnd: 20,
    marginBlockStart: 5,
    marginBlockEnd: 5,
  },
});
