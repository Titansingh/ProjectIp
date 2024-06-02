import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, TextInput, Button, Card} from 'react-native-paper';

const SignupScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Card style={styles.topContainer}>
        <Text style={styles.headingText}>Create an Account</Text>
      </Card>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Username"
          placeholder="Enter Username"
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Password"
          placeholder="Enter Password"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Confirm Password"
          placeholder="Re-enter Password"
          secureTextEntry
        />

        <Button
          style={styles.button}
          mode="elevated"
          onPress={() => console.log('Create Account Pressed')}>
          Create Account
        </Button>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LogInScreen');
            console.log('Already have an account?');
          }}>
          <Text style={styles.signInText}>
            Already have an account? Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  topContainer: {
    marginBottom: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    elevation: 2,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#007bff',
  },
  signInText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});
