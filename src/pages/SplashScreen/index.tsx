import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.replace('SignIn'), 3500);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Moodcook.png')}
        style={{width: 251, height: 251}}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
  },
});
