import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Header from '../../components/molecules/Header';
import Footer from '../../components/molecules/Footer';

const AllFood = ({navigation}) => {
  const [selectedMood, setSelectedMood] = useState('all');

  const recipes = [
    {id: 1, recipeId: 'chocolate-lava-cake', image: require('../../assets/recipes/chocolatelavacake.jpeg')},
    {id: 2, recipeId: 'rainbow-smoothies', image: require('../../assets/recipes/rainbowsmoothies.jpeg')},
    {id: 3, recipeId: 'pastabake', image: require('../../assets/recipes/pastabake.jpeg')},
    {id: 4, recipeId: 'fruit-pancake', image: require('../../assets/recipes/fruitpancake.jpeg')},
    {id: 5, recipeId: 'chicken-soup', image: require('../../assets/recipes/chickensoup.jpeg')},
    {id: 6, recipeId: 'mashed-potato', image: require('../../assets/recipes/mashedpotato.jpeg')},
    {id: 7, recipeId: 'hot-choco', image: require('../../assets/recipes/hotchoco.jpeg')},
    {id: 8, recipeId: 'mushroom-risotto', image: require('../../assets/recipes/mushroomrisotto.jpeg')},
    {id: 9, recipeId: 'green-tea', image: require('../../assets/recipes/greentea.jpeg')},
    {id: 10, recipeId: 'avocado-toast', image: require('../../assets/recipes/avocadotoast.jpeg')},
    {id: 11, recipeId: 'oatmeal', image: require('../../assets/recipes/oatmeal.jpeg')},
    {id: 12, recipeId: 'lavender-honey-milk', image: require('../../assets/recipes/lavenderhoneymilk.jpeg')},
    {id: 13, recipeId: 'spring-rolls', image: require('../../assets/recipes/springrolls.jpeg')},
    {id: 14, recipeId: 'pizza', image: require('../../assets/recipes/pizza.jpeg')},
    {id: 15, recipeId: 'fruit-skewers', image: require('../../assets/recipes/fruitskewers.jpeg')},
    {id: 16, recipeId: 'sushi-burrito', image: require('../../assets/recipes/sushiburito.jpeg')},
    {id: 17, recipeId: 'ramen', image: require('../../assets/recipes/ramen.jpeg')},
    {id: 18, recipeId: 'hot-wings', image: require('../../assets/recipes/hotwings.jpeg')},
    {id: 19, recipeId: 'volcano-drink', image: require('../../assets/recipes/volcanodrink.jpeg')},
    {id: 20, recipeId: 'hellfire-noodles', image: require('../../assets/recipes/hellfirenoodles.jpeg')},
  ];

  const moodFilter = {
    happy: ['chocolate-lava-cake', 'rainbow-smoothies', 'pastabake', 'fruit-pancake'],
    sad: ['chicken-soup', 'mashed-potato', 'hot-choco', 'mushroom-risotto'],
    excited: ['green-tea', 'avocado-toast', 'oatmeal', 'lavender-honey-milk'],
    angry: ['spring-rolls', 'pizza', 'fruit-skewers', 'sushi-burrito'],
    relaxed: ['ramen', 'hot-wings', 'volcano-drink', 'hellfire-noodles'],
    all: recipes.map(item => item.recipeId),
  };

  const filteredRecipes = recipes.filter(recipe =>
    moodFilter[selectedMood].includes(recipe.recipeId),
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header />

      <Text style={styles.title}>ALL RECIPES</Text>

      {/* Dropdown Menu */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedMood}
          onValueChange={value => setSelectedMood(value)}
          style={styles.picker}>
          <Picker.Item label="All" value="all" />
          <Picker.Item label="Happy" value="happy" />
          <Picker.Item label="Sad" value="sad" />
          <Picker.Item label="Excited" value="excited" />
          <Picker.Item label="Angry" value="angry" />
          <Picker.Item label="Relaxed" value="relaxed" />
        </Picker>
      </View>

      {/* Filtered Recipe Images */}
      {filteredRecipes.map(recipe => (
        <TouchableOpacity
          key={recipe.recipeId}
          style={styles.touchable}
          onPress={() => navigation.navigate('Details', { recipeId: recipe.recipeId })}>
          <Image source={recipe.image} style={styles.recipeImage} />
        </TouchableOpacity>
      ))}

      <Footer />
    </ScrollView>
  );
};

export default AllFood;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 140,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 14,
    marginBottom: 5,
    color: '#000',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  recipeImage: {
    width: '100%',
    height: 170,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  touchable: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
    marginTop: 20,
  },
});