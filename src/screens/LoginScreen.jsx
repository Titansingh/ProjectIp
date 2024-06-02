import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text, TextInput, Button, Card} from 'react-native-paper';
import {Formik} from 'formik';
import * as yup from 'yup';
import useAxios from '../hooks/axios/useAxios';
import useAuthStore from '../store/authZustand';
import {axiosInstanceAuth} from '../hooks/axios/axiosInstance';

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

const LoginScreen = ({navigation}) => {
  const setToken = useAuthStore(state => state.setToken);
  const {loading, response, error, fetchData, sendData} = useAxios(
    axiosInstanceAuth,
    {
      url: '/auth/login',
      isLazy: true,
    },
  );

  useEffect(() => {
    if (response) {
      setToken(response?.token, '');
    }
  }, [response]);

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <View style={styles.container}>
      <Card style={styles.topContainer}>
        <Text style={styles.headingText}>Project IP</Text>
      </Card>
      <View style={styles.formContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#007bff" />
        ) : (
          <Formik
            initialValues={{username: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={async (values, {setSubmitting}) => {
              setSubmitting(true);
              console.log('Login Pressed', values);
              sendData({
                username: 'mor_2314',
                password: '83r5^_',
              });
              setSubmitting(false);
            }}>
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View>
                <TextInput
                  style={styles.input}
                  mode="outlined"
                  label="Username"
                  value={values.username}
                  onChangeText={handleChange('username')}
                  placeholder="Enter Username"
                />
                {touched.username && errors.username && (
                  <Text style={styles.errorText}>{errors.username}</Text>
                )}
                <TextInput
                  style={styles.input}
                  mode="outlined"
                  label="Password"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="Enter Password"
                  secureTextEntry
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TouchableOpacity
                  onPress={() => console.log('forgot password')}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
                <Button
                  style={styles.button}
                  mode="elevated"
                  onPress={handleSubmit}
                  disabled={isSubmitting}>
                  {isSubmitting ? 'Logging in...' : 'Login'}
                </Button>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SignupScreen');
                    console.log('Create Account');
                  }}>
                  <Text style={styles.signupText}>Create Account</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        )}
      </View>
    </View>
  );
};

export default LoginScreen;

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
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
  },
  input: {
    marginBottom: 15,
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    marginTop: 10,
    color: '#007bff',
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    backgroundColor: '#007bff',
  },
  signupText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
  },
});
