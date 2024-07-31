import React, { createContext, useState, useContext, ReactNode } from 'react';

export const themes = {
  light: {
    background: '#ffffff',
    color: '#000000',
  },
  dark: {
    background: '#000000',
    color: '#ffffff',
  },
};

type ThemeContextType = {
  theme: typeof themes.light;
  setTheme: (theme: typeof themes.light) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState(themes.light);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
