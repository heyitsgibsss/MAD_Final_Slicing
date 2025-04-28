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

const recipeDetails = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>hi, angelika</Text>
        <Image
          source={require('../../assets/user-icon.png')}
          style={styles.profileIcon}
        />
      </View>

      {/* Recipe Card */}
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

          {/* Bookmark Icon */}
          <TouchableOpacity style={styles.bookmarkIcon}>
            <Image
              source={require('../../assets/bookmark.png')}
              style={styles.bookmarkImage}
            />
          </TouchableOpacity>

          {/* Ingredients and Instructions */}
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

      {/* Footer */}
      <Text style={styles.footer}>created by avg</Text>
    </ScrollView>
  );
};

export default recipeDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
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
    height: 200,
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
    backgroundColor: '#eee',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 5,
    color: '#000',
  },
  recipeText: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: '#000',
  },
});
