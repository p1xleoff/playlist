// theme.ts
export type Theme = {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    card: string;
    tertiary: string;
};

export const lightTheme: Theme = {
    background: '#ffffff',
    text: '#000000',
    primary: '#000',
    secondary: '#4d4d4d',
    tertiary: '#111',
    card: '#fff',
};

export const darkTheme: Theme = {
    background: '#000000',
    text: '#FFFFFF',
    primary: '#ffffff',
    secondary: '#c9c9c9',
    tertiary: '#f5f5f5',
    card: '#111111',
};
