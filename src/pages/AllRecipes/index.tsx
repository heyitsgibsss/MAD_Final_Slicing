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

      {/* Title */}
      <Text style={styles.title}>ALL RECIPES</Text>

      {/* Mood Dropdown Placeholder (tidak ditampilkan) */}
      {/* Jika ingin ditambahkan kembali tinggal pasang di sini */}

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
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    justifyContent: 'space-between',
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
