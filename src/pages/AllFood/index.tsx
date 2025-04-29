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
          style={styles.logo}
        />
        <View style={styles.userSection}>
          <Text style={styles.username}>hi, angelika</Text>
          <Image
            source={require('../../assets/user-icon.png')}
            style={styles.userIcon}
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
    backgroundColor: '#F9C841',
    height: 50,
    borderRadius: 8,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 14,
    color: '#000',
    marginRight: 5,
  },
  userIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
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
