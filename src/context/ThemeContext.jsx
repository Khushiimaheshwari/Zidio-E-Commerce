import { createContext, useState, useEffect, useContext } from 'react';

// Create the theme context
const ThemeContext = createContext();

// Theme provider component
export function ThemeProvider({ children }) {
  // Always use dark mode
  const [darkMode, setDarkMode] = useState(true);

  // Update document class for dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Dummy toggle function (not used anymore)
  const toggleTheme = () => {
    // Do nothing - we're always in dark mode
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
