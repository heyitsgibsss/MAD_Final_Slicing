import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>created by avg</Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
  },
  footerText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#000000',
  },
});
