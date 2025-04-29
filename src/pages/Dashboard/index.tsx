import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

const Dashboard = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/Moodcook.png')} // Icon kiri atas
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

      {/* Mood Section */}
      <Text style={styles.moodText}>angelika,</Text>
      <Text style={styles.currentMood}>your current mood is happy</Text>

      {/* Images */}
      <View style={styles.imagesContainer}>
        <Image
          source={require('../../assets/yoghurt.jpg')}
          style={styles.foodImage}
        />
        <Image
          source={require('../../assets/saladbuah.jpg')}
          style={styles.foodImage}
        />
      </View>
      <View style={styles.imagesContainer}>
        <Image
          source={require('../../assets/macaroni.jpg')}
          style={styles.foodImage}
        />
        <Image
          source={require('../../assets/cupcakes.jpg')}
          style={styles.foodImage}
        />
      </View>

      {/* Quote */}
      <Text style={styles.quote}>
        "When life gets messy, I stir, simmer, and season my way back to peace."
      </Text>

      {/* Buttons */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>see other happy recipes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          see all recipes available [ALL MOOD]
        </Text>
      </TouchableOpacity>

      {/* Footer */}
      <Text style={styles.footer}>created by avg</Text>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
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
  moodText: {
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'flex-start',
    color: '#000',
  },
  currentMood: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    alignSelf: 'flex-start',
    color: '#000',
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  foodImage: {
    width: '48%',
    height: 130,
    borderRadius: 10,
  },
  quote: {
    fontStyle: 'italic',
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 20,
    color: '#555',
  },
  button: {
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
  },
  buttonText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '500',
  },
  footer: {
    marginTop: 30,
    fontSize: 12,
    color: '#000',
  },
});
