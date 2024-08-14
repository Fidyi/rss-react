import React, { createContext, useState, useContext, ReactNode } from 'react';

export const themes = {
  light: {
    background: 'bg-white',
    color: 'text-black',
  },
  dark: {
    background: 'bg-gray-900',
    color: 'text-white',
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
      <div className={`${theme.background} ${theme.color} min-h-screen`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
