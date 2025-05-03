import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Header from '../../components/molecules/Header';

const moods = [
  {label: 'happy', emoji: '😊'},
  {label: 'sad', emoji: '😢'},
  {label: 'bored', emoji: '😐'},
  {label: 'stress', emoji: '😫'},
  {label: 'angry', emoji: '😡'},
];

const MoodRegister = () => {
  const [selectedMood, setSelectedMood] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Header username="angelika" />
      </View>

      {/* Title */}
      <Text style={styles.title}>CHOOSE YOUR MOOD</Text>

      {/* Mood Grid */}
      <View style={styles.moodGrid}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.moodButton,
              selectedMood === mood.label && styles.selectedMood,
            ]}
            onPress={() => setSelectedMood(mood.label)}>
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={styles.label}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Footer */}
      <Text style={styles.footer}>created by avg</Text>
    </SafeAreaView>
  );
};

export default MoodRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#F9C841',
    height: 50,
    borderRadius: 8,
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  moodGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  moodButton: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  selectedMood: {
    borderColor: '#007BFF',
    borderWidth: 3,
  },
  emoji: {
    fontSize: 36,
  },
  label: {
    marginTop: 5,
    fontSize: 14,
    color: '#000',
    textTransform: 'capitalize',
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
    marginVertical: 20,
  },
});
