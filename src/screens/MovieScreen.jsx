import React from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import {Card, Text, Surface} from 'react-native-paper';
import useAxios from '../hooks/axios/useAxios';
import {axiosInstance2} from '../hooks/axios/axiosInstance';

const MovieScreen = () => {
  const {loading, response, error, fetchData} = useAxios(axiosInstance2, {
    url: '/api/movies',
  });

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Movies
      </Text>
      <FlatList
        data={response}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => {}}>
            <Surface elevation={2} style={styles.card}>
              <View style={styles.textContainer}>
                <Text style={styles.movieTitle}>{item.movie}</Text>
                <Text style={styles.rating}>Rating: {item.rating}</Text>
              </View>
            </Surface>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MovieScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 5,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888',
  },
});
