import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const BottomNav = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Home</Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: '#121212',
    }
})

export default BottomNav;