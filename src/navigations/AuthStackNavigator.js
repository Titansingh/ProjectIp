import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
const AuthStack = createNativeStackNavigator();

export default function AuthStackNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name={'LogInScreen'} component={LoginScreen} />
      <AuthStack.Screen name={'SignupScreen'} component={SignupScreen} />
    </AuthStack.Navigator>
  );
}
