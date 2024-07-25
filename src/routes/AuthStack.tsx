import { View, Text } from 'react-native';
import React from 'react';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// screens
import Signup from '../screens/Signup';
import Login from '../screens/Login';

// type checking
export type AuthStackParamList = {
  Signup: undefined;
  Login: undefined;
};


//navigators
const Stack = createNativeStackNavigator<AuthStackParamList>();


const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Signup' component={Signup} />
    </Stack.Navigator>
  )
};

export default AuthStack;
