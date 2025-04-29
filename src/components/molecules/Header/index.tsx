import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const Header = ({username = 'angelika'}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/Moodcook.png')}
        style={styles.icon}
      />
      <View style={styles.headerRight}>
        <Text style={styles.greeting}>hi, {username}</Text>
        <Image
          source={require('../../../assets/user-icon.png')}
          style={styles.profileIcon}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
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
});
