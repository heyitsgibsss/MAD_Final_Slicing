import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  Platform,
} from 'react-native';

const AllRecipes = () => {
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

      {/* Title */}
      <Text style={styles.title}>ALL RECIPES</Text>

      {/* Footer */}
      <Text style={styles.footer}>created by avg</Text>
    </SafeAreaView>
  );
};

export default AllRecipes;

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
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginVertical: 20,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#000',
    marginBottom: 20,
  },
});
