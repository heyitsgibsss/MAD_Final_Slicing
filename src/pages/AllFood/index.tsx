import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Platform,
  ScrollView,
} from 'react-native';

const AllFood = () => {
  const recipes = [
    {id: 1, image: require('../../assets/supayam.png')},
    {id: 2, image: require('../../assets/macaroni.jpg')},
    {id: 3, image: require('../../assets/hotchoco.jpg')},
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/Moodcook.png')}
          style={styles.icon}
        />
        <View style={styles.headerRight}>
          <Text style={styles.greeting}>hi, angelika</Text>
          <Image
            source={require('../../assets/user-icon.png')}
            style={styles.profileIcon}
          />
        </View>
      </View>

      {/* Content Scroll */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
        <Text style={styles.footer}>created by avg</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllFood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  header: {
    backgroundColor: '#F4C149',
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
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
