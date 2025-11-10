import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

const ThemeContext = createContext({
  themeName: 'light',
  setThemeName: () => {},
  theme: {
    primary: '#2563EB',
    secondary: '#F59E0B',
    error: '#EF4444',
    background: 'var(--bg)',
    surface: 'var(--surface)',
    text: 'var(--text)',
  }
});

// PUBLIC_INTERFACE
export function useTheme() {
  /** Access the current theme object and name. */
  return useContext(ThemeContext);
}

/**
 * Provides Ocean Professional theme variables across the app.
 * Persists selected themeName in localStorage using key 'oceanpro-theme'.
 */
export default function ThemeProvider({ children }) {
  const [themeName, setThemeName] = useState(() => {
    return localStorage.getItem('oceanpro-theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('oceanpro-theme', themeName);
  }, [themeName]);

  const theme = useMemo(
    () => ({
      primary: '#2563EB',
      secondary: '#F59E0B',
      error: '#EF4444',
      text: 'var(--text)',
      background: 'var(--bg)',
      surface: 'var(--surface)',
      gradient: 'var(--ocean-gradient)',
    }),
    []
  );

  const value = useMemo(() => ({ themeName, setThemeName, theme }), [themeName, theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
