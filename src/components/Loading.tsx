import { ActivityIndicator, StyleProp, View, ViewStyle } from 'react-native'
import React from 'react'

import { pxStyles } from '../theme/useTheme';

interface LoadingProps {
  style?: StyleProp<ViewStyle>;
}

export const Loading = ({ style }: LoadingProps) => {
  const styles = useStyles();
  return (
    <View style={[styles.loader, style]}>
      <ActivityIndicator size='large' color='#ff5e00' />
    </View>
  )
}

export const SmallLoader = () => {
  const styles = useStyles();
  return (
    <View style={styles.smolLoader}>
      <ActivityIndicator size='small' color='#7700ff' />
    </View>
  )
}

export const Loader = () => {
  const styles = useStyles();
  return (
    <View style={styles.ReLoader}>
      <ActivityIndicator size={30} color={'#ff1e00'} />
    </View>
  )
}

const useStyles = pxStyles((theme) => ({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.background
  },
  smolLoader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ReLoader: {
    flex: 1,
    alignItems: 'center',
    padding: 0
  },
}));
