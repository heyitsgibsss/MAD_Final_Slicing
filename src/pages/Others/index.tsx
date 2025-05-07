import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Header from '../../components/molecules/Header';
import Footer from '../../components/molecules/Footer';
import {Gap} from '../../components/atoms/index';

const Others = ({navigation}) => {
  const recipeItems = [
    {
      image: require('../../assets/recipes/chocolatelavacake.jpeg'),
      screen: 'Details1',
    },
    {
      image: require('../../assets/recipes/rainbowsmoothies.jpeg'),
      screen: 'Details2',
    },
    {
      image: require('../../assets/recipes/pastabake.jpeg'),
      screen: 'Details3',
    },
    {
      image: require('../../assets/recipes/fruitpancake.jpeg'),
      screen: 'Details4',
    },
  ];

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
        {recipeItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(item.screen)}>
            <Image source={item.image} style={styles.recipeImage} />
            <Gap height={15} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <Footer />
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
    marginBottom: 10,
  },
});
