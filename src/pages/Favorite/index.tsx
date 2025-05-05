// screens/Favorite.tsx
import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import Footer from '../../components/molecules/Footer';
import Header from '../../components/molecules/Header';
import {Gap} from '../../components/atoms/index';
import {G} from 'react-native-svg';

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
            source={require('../../assets/sushi.png')}
            style={styles.recipeImage}
          />
          <Image
            source={require('../../assets/bookmark.png')}
            style={styles.starIcon}
          />
        </View>
        <Gap height={15} />

        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/icecream.png')}
            style={styles.recipeImage}
          />
          <Image
            source={require('../../assets/bookmark.png')}
            style={styles.starIcon}
          />
        </View>
        <Gap height={15} />

        <View style={styles.imageWrapper}>
          <Image
            source={require('../../assets/pastatomat.png')}
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
    paddingBottom: 130,
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
});
