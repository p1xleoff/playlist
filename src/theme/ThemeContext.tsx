import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Theme, darkTheme, lightTheme,  } from './theme';


type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
};

type ThemeProviderProps = {
  children: ReactNode;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemTheme = Appearance.getColorScheme();
  const [theme, setTheme] = useState<Theme>(systemTheme === 'dark' ? darkTheme : lightTheme);
  const [currentTheme, setCurrentTheme] = useState<string>(systemTheme || 'light');
  const [userPreference, setUserPreference] = useState<string>('systemTheme');

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setUserPreference(savedTheme);
        if (savedTheme === 'systemTheme') {
          setCurrentTheme(systemTheme || 'light');
          setTheme(systemTheme === 'dark' ? darkTheme : lightTheme);
        } else {
          setCurrentTheme(savedTheme);
          setTheme(savedTheme === 'dark' ? darkTheme : lightTheme);
        }
      } else {
        setUserPreference('systemTheme');
        setCurrentTheme(systemTheme || 'light');
        setTheme(systemTheme === 'dark' ? darkTheme : lightTheme);
      }
    };
    loadTheme();
  }, [systemTheme]);

  const updateTheme = async (themeName: string) => {
    setUserPreference(themeName);
    if (themeName === 'systemTheme') {
      const systemColorScheme = Appearance.getColorScheme();
      setCurrentTheme(systemColorScheme || 'light');
      setTheme(systemColorScheme === 'dark' ? darkTheme : lightTheme);
    } else {
      setCurrentTheme(themeName);
      setTheme(themeName === 'dark' ? darkTheme : lightTheme);
    }
    await AsyncStorage.setItem('theme', themeName);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: (theme: Theme) => setTheme(theme), currentTheme: userPreference, setCurrentTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;
