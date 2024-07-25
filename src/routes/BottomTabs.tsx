import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

//mavigation imports
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//screens
import Home from '../screens/Home';
import Account from '../screens/Account';
import { RootStackParamList } from './Navigator';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  )
}


const styles = StyleSheet.create({})


export default BottomTabs;