import { Appearance } from 'react-native';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type ThemeContextType = {
    theme: typeof light;
    toggleTheme: () => void;
    layout: 'dark' | 'light';
};

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isDark, setIsDark] = useState(true);
    const layout = isDark ? 'dark' : 'light';
    const theme = isDark ? dark : light;

    const toggleTheme = () => {
        setIsDark((prev) => !prev);
    };

    useEffect(() => {
        Appearance.setColorScheme(isDark ? 'dark' : 'light');
    }, [isDark]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, layout }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);


const light = {
    primary: '#004075',
    black: '#000000',
    white: '#FFFFFF',
    background: '#FAFAFA',
    zinc: '#27272a'
};
const dark = {
    primary: '#004075',
    black: '#FFFFFF',
    white: '#000000',
    background: '#151515',
    zinc: '#27272a'
};