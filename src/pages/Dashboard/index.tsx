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

      {/* Food Images */}
      <View style={styles.grid}>
        <Image
          source={require('../../assets/saladbuah.jpg')}
          style={styles.foodImage}
        />
        <Image
          source={require('../../assets/yoghurt.jpg')} // ganti sesuai nama file gambar
          style={styles.foodImage}
        />
        <Image
          source={require('../../assets/macaroni.jpg')} // ganti sesuai nama file gambar
          style={styles.foodImage}
        />
        <Image
          source={require('../../assets/cupcakes.jpg')} // ganti sesuai nama file gambar
          style={styles.foodImage}
        />
      </View>

      {/* Quote */}
      <Text style={styles.quote}>
        "When life gets messy, I stir, simmer, and season my way back to peace."
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Others')}>
        <Text style={styles.buttonText}>see other happy recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
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
    paddingBottom: 160,
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
    marginBottom: 20,
  },
  foodImage: {
    width: '48%',
    aspectRatio: 1, // membuat gambar kotak
    borderRadius: 10,
    marginBottom: 12,
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#F4C542',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
    fontSize: 14,
  },
  footer: {
    fontSize: 12,
    color: '#000',
    marginTop: 20,
    textAlign: 'center',
  },
});
