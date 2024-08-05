// useTheme.ts

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import { Theme } from './theme';
import { useTheme } from '../services/contexts/ThemeContext';

type ThemedStyles = {
  [key: string]: ViewStyle | TextStyle;
};

export const pxStyles = (styles: (theme: Theme) => ThemedStyles) => {
  return () => {
    const { theme } = useTheme();
    return StyleSheet.create(styles(theme));
  };
};
