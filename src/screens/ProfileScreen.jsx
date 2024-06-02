import {StyleSheet, View} from 'react-native';
import {AnimatedFAB, Avatar, Text, Divider} from 'react-native-paper';
import React from 'react';
import useAuthStore from '../store/authZustand';

const ProfileScreen = () => {
  const onLogout = useAuthStore(state => state.onLogout);
  const isAuthenticated = useAuthStore(
    state => state.authState.isAuthenticated,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title} variant="titleLarge">
        ProfileScreen
      </Text>
      <Divider style={styles.divider} />
      <Avatar.Text size={104} label="XD" />
      <Text variant="titleMedium">Vaibhav</Text>

      <Text variant="titleMedium">Wicked@gmail.com</Text>
      <Divider style={styles.divider} />
      {isAuthenticated ? (
        <Text>User is authenticated!</Text>
      ) : (
        <Text>User is not authenticated!</Text>
      )}

      <AnimatedFAB
        icon={'logout'}
        style={styles.fabStyle}
        label={'Logout'}
        extended={true}
        onPress={() => onLogout()}
        visible={true}
        animateFrom={'right'}
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
  },
  divider: {
    width: '100%',
    margin: 10,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
    backgroundColor: '#007bff',
  },
});
