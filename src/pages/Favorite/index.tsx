// screens/Favorite.tsx
import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import Footer from '../../components/molecules/Footer';
import Header from '../../components/molecules/Header';

const Favorite = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header />

      {/* Title */}
      <Text style={styles.title}>MY FAVORITE</Text>

      {/* Favorite Recipes */}
      <View style={styles.imagesContainer}>
        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/supayam.png')}
            style={styles.recipeImage}
          />
          <Image
            source={require('../../assets/bookmark.png')}
            style={styles.starIcon}
          />
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/supayam.png')}
            style={styles.recipeImage}
          />
          <Image
            source={require('../../assets/bookmark.png')}
            style={styles.starIcon}
          />
        </View>

        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/supayam.png')}
            style={styles.recipeImage}
          />
          <Image
            source={require('../../assets/bookmark.png')}
            style={styles.starIcon}
          />
        </View>
      </View>

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
    paddingBottom: 190,
    alignItems: 'center',
  },
  header: {
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
  title: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  imagesContainer: {
    width: '100%',
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
  footer: {
    marginTop: 30,
    fontSize: 12,
    color: '#000',
  },
});
