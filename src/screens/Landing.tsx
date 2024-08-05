import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

import { useNavigation } from '@react-navigation/native'

import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

import { Button } from '../components/Utils';
import { RootStackParamList } from '../routes/Navigator';
import { Loader } from '../components/Loading';
import { pxStyles } from '../theme/useTheme';


type LandingProps = NativeStackNavigationProp<RootStackParamList, 'Landing'>;

const Landing = () => {
  const navigation = useNavigation<LandingProps>();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.title}>
          Welcome to playlist. Log in or Sign up to get started!
        </Text>
        <Button title='Login' onPress={() => navigation.navigate('Login')} />
        <Button title='Signup' onPress={() => navigation.navigate('Signup')} />
      </View>
    </View>
  )
}


const useStyles = pxStyles((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 10
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  title: {
    fontSize: 32,
    marginBottom: 20,
    fontWeight: '900',
    color: '#ffffff'
  },
  text: {
    marginTop: 15,
    alignSelf: 'center',
    fontSize: 16
  },

}));

export default Landing;