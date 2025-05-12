import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Footer from '../../components/molecules/Footer';
import {getDatabase, ref as dbRef, get, set} from 'firebase/database';
import {getAuth} from 'firebase/auth';

const moods = [
  {label: 'happy', emoji: '😊'},
  {label: 'sad', emoji: '😢'},
  {label: 'excited', emoji: '🤩'},
  {label: 'angry', emoji: '😡'},
  {label: 'relaxed', emoji: '😌'},
];

const MoodRegister = ({navigation}) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [username, setUsername] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const userRef = dbRef(db, `users/${user.uid}/username`);

      get(userRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            setUsername(snapshot.val());
          } else {
            console.warn('Username not found');
          }
        })
        .catch(error => {
          console.error('Error fetching username:', error);
        });
    }
  }, [user]);

  const handleMoodSelect = mood => {
    setSelectedMood(mood);

    if (user) {
      const db = getDatabase();
      const moodRef = dbRef(db, `users/${user.uid}/mood`);

      set(moodRef, mood)
        .then(() => {
          navigation.replace('Dashboard', {uid: user.uid});
        })
        .catch(error => {
          console.error('Error saving mood:', error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>CHOOSE YOUR MOOD</Text>

      <View style={styles.moodGrid}>
        {moods.map((mood, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.moodButton,
              selectedMood === mood.label && styles.selectedMood,
            ]}
            onPress={() => handleMoodSelect(mood.label)}>
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={styles.label}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Footer />
    </SafeAreaView>
  );
};

export default MoodRegister;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    paddingHorizontal: 20,
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
    width: 150,
    height: 150,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  selectedMood: {
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
});
