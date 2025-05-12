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
    {id: 1, image: require('../../assets/recipes/chocolatelavacake.jpeg')},
    {id: 2, image: require('../../assets/recipes/rainbowsmoothies.jpeg')},
    {id: 3, image: require('../../assets/recipes/pastabake.jpeg')},
    {id: 4, image: require('../../assets/recipes/fruitpancake.jpeg')},
    {id: 5, image: require('../../assets/recipes/chickensoup.jpeg')},
    {id: 6, image: require('../../assets/recipes/mashedpotato.jpeg')},
    {id: 7, image: require('../../assets/recipes/hotchoco.jpeg')},
    {id: 8, image: require('../../assets/recipes/mushroomrisotto.jpeg')},
    {id: 9, image: require('../../assets/recipes/greentea.jpeg')},
    {id: 10, image: require('../../assets/recipes/avocadotoast.jpeg')},
    {id: 11, image: require('../../assets/recipes/oatmeal.jpeg')},
    {id: 12, image: require('../../assets/recipes/lavenderhoneymilk.jpeg')},
    {id: 13, image: require('../../assets/recipes/springrolls.jpeg')},
    {id: 14, image: require('../../assets/recipes/pizza.jpeg')},
    {id: 15, image: require('../../assets/recipes/fruitskewers.jpeg')},
    {id: 16, image: require('../../assets/recipes/sushiburito.jpeg')},
    {id: 17, image: require('../../assets/recipes/ramen.jpeg')},
    {id: 18, image: require('../../assets/recipes/hotwings.jpeg')},
    {id: 19, image: require('../../assets/recipes/volcanodrink.jpeg')},
    {id: 20, image: require('../../assets/recipes/hellfirenoodles.jpeg')},
  ];

  const moodFilter = {
    happy: [1, 2, 3, 4],
    sad: [5, 6, 7, 8],
    bored: [9, 10, 11, 12],
    stressed: [13, 14, 15, 16],
    angry: [17, 18, 19, 20],
    all: recipes.map(item => item.id),
  };

  const filteredRecipes = recipes.filter(recipe =>
    moodFilter[selectedMood].includes(recipe.id),
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
          <Picker.Item label="Bored" value="bored" />
          <Picker.Item label="Stressed" value="stressed" />
          <Picker.Item label="Angry" value="angry" />
        </Picker>
      </View>

      {/* Filtered Recipe Images */}
      {filteredRecipes.map(recipe => (
        <TouchableOpacity
          key={recipe.id}
          style={styles.touchable}
          onPress={() => navigation.navigate(`Details${recipe.id}`)}>
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
