import HomeScreen from '../screens/HomeScreen';
import React, {useEffect} from 'react';
import useAuthStore from '../store/authZustand';
import AuthStackNavigator from './AuthStackNavigator';
import BottomTabNavigator from './AppStackNavigator';

export default function MainNavigator() {
  const checkAuthenticationStatus = useAuthStore(
    state => state.checkAuthenticationStatus,
  );

  useEffect(() => {
    checkAuthenticationStatus();
  }, []);

  const isAuthenticated = useAuthStore(
    state => state.authState.isAuthenticated,
  );
  return isAuthenticated ? <BottomTabNavigator /> : <AuthStackNavigator />;
}
