import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import React from 'react'

interface LoadingProps {
  style?: StyleProp<ViewStyle>;
}

export const Loading = ({ style }: LoadingProps) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size='large' color='#ff5e00' />
    </View>
  )
}

export const SmallLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='small' color='#c300ff' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  }
})
