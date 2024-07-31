import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Reload from '../components/Reload'

const Dummy = () => {
  return (
    <View>
      <Text>Dummy</Text>
      <Reload  onPress={() => console.log('reload')}/>
    </View>
  )
}

export default Dummy

const styles = StyleSheet.create({})