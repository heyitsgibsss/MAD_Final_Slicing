// screens/Dashboard.tsx
import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import Header from '../../components/molecules/Header';
import Footer from '../../components/molecules/Footer';
import {Gap} from '../../components/atoms/index';
const Others = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header />
      <Gap height={20} />

      {/* Title */}
      <Text style={styles.title}>OTHER HAPPY RECIPES</Text>

      <Gap height={20} />

      {/* Images */}
      <View style={styles.imagesContainer}>
        <Image
          source={require('../../assets/avocadotoast.jpg')}
          style={styles.recipeImage}
        />
        <Gap height={15} />
        <Image
          source={require('../../assets/yoghurt.jpg')}
          style={styles.recipeImage}
        />
        <Gap height={15} />
        <Image
          source={require('../../assets/cupcakes.jpg')}
          style={styles.recipeImage}
        />
      </View>

      {/* Footer */}
      <Footer />

      {/* Greeting */}
    </ScrollView>
  );
};

export default Others;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: 120,
    alignItems: 'center',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  imagesContainer: {
    width: '100%',
    marginTop: 20,
  },
  recipeImage: {
    width: '100%',
    height: 160,
    borderRadius: 10,
    marginBottom: 20,
  },
});
