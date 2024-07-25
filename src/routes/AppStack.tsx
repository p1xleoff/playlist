import { View, Text } from 'react-native';
import React from 'react';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


// screens
import Landing from '../screens/Landing';

// type checking
export type AuthStackParamList = {
    Landing: undefined;
};


//navigators
const Stack = createNativeStackNavigator<AuthStackParamList>();


const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Landing' component={Landing} />
    </Stack.Navigator>
  )
};

export default AppStack;
