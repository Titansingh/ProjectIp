import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Text, AnimatedFAB} from 'react-native-paper';
import useAuthStore from '../store/authZustand';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
