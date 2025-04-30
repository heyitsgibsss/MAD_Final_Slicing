import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import Header from '../../components/molecules/Header';
import Footer from '../../components/molecules/Footer';

const AllFood = () => {
  const recipes = [
    {id: 1, image: require('../../assets/supayam.png')},
    {id: 2, image: require('../../assets/macaroni.jpg')},
    {id: 3, image: require('../../assets/hotchoco.jpg')},
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header />

      {/* Title */}
      <Text style={styles.title}>ALL RECIPES</Text>

      {/* Recipe Images */}
      {recipes.map(recipe => (
        <Image
          key={recipe.id}
          source={recipe.image}
          style={styles.recipeImage}
        />
      ))}

      {/* Footer */}
      <Footer />
    </ScrollView>
  );
};

export default AllFood;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    alignSelf: 'flex-start',
    marginVertical: 20,
  },
  recipeImage: {
    width: '100%',
    height: 170,
    borderRadius: 10,
    resizeMode: 'cover',
    marginBottom: 20,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
    marginTop: 20,
  },
});
