import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native'
import React from 'react'

type CardProps = {
  children: JSX.Element | JSX.Element[];
  style?: StyleProp<ViewStyle>;
}

const Card = ({ children, style }: CardProps) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  )
}


const styles = StyleSheet.create({
  card: {
    padding: 11,
    marginHorizontal: 10,
    marginVertical: 3,
    borderRadius: 3,
    backgroundColor: '#fff',
    elevation: 5
  }
})

export default Card;