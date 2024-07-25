import { View, Text } from 'react-native';
import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../services/contexts/AuthContext';

import Landing from '../screens/Landing'
import Signup from '../screens/Signup'
import Login from '../screens/Login'

type RouteStackParamList = {
    Landing: undefined;
    Login: undefined;
    Signup: undefined;
}

const Stack = createNativeStackNavigator<RouteStackParamList>();

const Router = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="Landing" component={Landing} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default Router;
export type { RouteStackParamList };