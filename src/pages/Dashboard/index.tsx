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

const Dashboard = ({navigation}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <Header username="angelika" />

      {/* Greeting */}
      <View style={styles.textContainer}>
        <Text style={styles.moodText}>angelika,</Text>
        <Text style={styles.currentMood}>your current mood is happy</Text>
      </View>

      {/* Food Images - Top Grid */}
      <View style={styles.grid}>
        {[
          require('../../assets/saladbuah.jpg'),
          require('../../assets/yoghurt.jpg'),
        ].map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Details')}
            style={styles.foodImage}>
            <Image
              source={image}
              style={styles.imageInside}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Quote */}
      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>
          "When life gets messy, I stir, simmer, and season my way back to
          peace."
        </Text>
      </View>

      {/* Food Images - Bottom Grid */}
      <View style={styles.grid}>
        {[
          require('../../assets/macaroni.jpg'),
          require('../../assets/cupcakes.jpg'),
        ].map((image, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Details')}
            style={styles.foodImage}>
            <Image
              source={image}
              style={styles.imageInside}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button1}
        onPress={() => navigation.navigate('Others')}>
        <Text style={styles.buttonText}>see other happy recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate('AllFood')}>
        <Text style={styles.buttonText}>
          see all recipes available [ALL MOOD]
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Footer />
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingBottom: 70,
    alignItems: 'center',
  },
  textContainer: {
    alignSelf: 'flex-start',
    marginVertical: 15,
  },
  moodText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
    textTransform: 'lowercase',
  },
  currentMood: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  foodImage: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageInside: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  quoteContainer: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#444',
    textAlign: 'left',
    marginBottom: 10,
  },
  button1: {
    backgroundColor: '#F4C542',
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 5,
    width: 195,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  button2: {
    backgroundColor: '#F4C542',
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 5,
    width: 286,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  buttonText: {
    textAlign: 'left',
    fontFamily: 'OpenSans',
    color: '#000',
    fontSize: 15.5,
    marginLeft: 10,
  },
  footer: {
    fontSize: 12,
    color: '#000',
    marginTop: 20,
    textAlign: 'center',
  },
});
