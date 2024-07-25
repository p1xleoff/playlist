import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Snackbar from 'react-native-snackbar';

interface SnackBarProps {
    message: string;
    duration?: number;
    action?: {
        text: string,
        onPress: () => void,
        textColor?: string,
    };
    backgroundColor: string;
    textColor: string;
}

const SnackReBar = ({
  message, 
  duration, 
  action, 
  backgroundColor = '#e7e7e7',
  textColor= '#000',
}: SnackBarProps) => {
  const showSnackBar = () => {
    Snackbar.show({
      text: message,
      duration: duration,
      backgroundColor: backgroundColor,
    })
  }
}


const styles = StyleSheet.create({})
export default SnackReBar;