// screens/Dashboard.tsx
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/molecules/Header'; // Sesuaikan path jika perlu
import Footer from '../../components/molecules/Footer'; // Import Footer component

const RecipeDetails = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <View style={styles.card}>
        <Image
          source={require('../../assets/food1.jpg')}
          style={styles.recipeImage}
        />

        <View style={styles.recipeContent}>
          <Text style={styles.recipeTitle}>
            Pesto Pasta with Cherry Tomatoes
          </Text>
          <Text style={styles.recipeSubtitle}>A simple and flavorful dish</Text>

          <TouchableOpacity style={styles.bookmarkIcon}>
            <Image
              source={require('../../assets/bookmark.png')}
              style={styles.bookmarkImage}
            />
          </TouchableOpacity>

          <View style={styles.recipeDetails}>
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            <Text style={styles.recipeText}>
              Pasta, basil pesto, cherry tomatoes, parmesan, olive oil
            </Text>

            <Text style={styles.sectionTitle}>Instructions:</Text>
            <Text style={styles.recipeText}>
              1. Cook pasta and drain.{'\n'}
              2. Sauté halved cherry tomatoes in olive oil.{'\n'}
              3. Toss pasta with pesto and tomatoes. Top with parmesan.
            </Text>
          </View>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
};

export default RecipeDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 100,
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 50,
    resizeMode: 'contain',
  },
  greeting: {
    fontSize: 14,
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
  card: {
    width: '100%',
    height: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3, // untuk Android shadow
    shadowColor: '#000', // untuk iOS shadow
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
