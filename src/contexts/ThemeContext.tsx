import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemeVariant = 'inferno' | 'anden-jungle' | 'underground-lab';

interface ThemeSettings {
  variant: ThemeVariant;
  customBackground?: string;
}

interface ThemeContextType {
  theme: ThemeSettings;
  setThemeVariant: (variant: ThemeVariant) => void;
  setCustomBackground: (url: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeSettings>(() => {
    const saved = localStorage.getItem('shop-theme');
    return saved ? JSON.parse(saved) : { variant: 'inferno' };
  });

  useEffect(() => {
    localStorage.setItem('shop-theme', JSON.stringify(theme));
    document.documentElement.setAttribute('data-theme', theme.variant);
    
    if (theme.customBackground) {
      document.documentElement.style.setProperty('--custom-bg', `url(${theme.customBackground})`);
    }
  }, [theme]);

  const setThemeVariant = (variant: ThemeVariant) => {
    setTheme(prev => ({ ...prev, variant }));
  };

  const setCustomBackground = (url: string) => {
    setTheme(prev => ({ ...prev, customBackground: url }));
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeVariant, setCustomBackground }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
