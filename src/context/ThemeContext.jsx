import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * ThemeContext provides the current theme and a function to toggle the theme.
 *
 * @context
 * @property {string} themeName - The current theme name, either 'dark' or '' (light).
 * @property {Function} toggleTheme - Function to toggle between light and dark themes.
 */
const ThemeContext = createContext();

/**
 * ThemeProvider component that wraps its children with ThemeContext.
 *
 * @component
 * @param {Object} props - The props of the component.
 * @param {React.ReactNode} props.children - The child components that will be wrapped by the ThemeProvider.
 *
 * @returns {JSX.Element} A JSX element that provides theme context to its children.
 *
 * @example
 * // To use the ThemeContext:
 * import { useContext } from 'react';
 * import { ThemeContext } from './ThemeContext';
 *
 * const { themeName, toggleTheme } = useContext(ThemeContext);
 */
const ThemeProvider = ({ children }) => {

  const [themeName, setThemeName] = useState('');

  useEffect(() => {
    // Check if there is a stored theme preference in localStorage
    const storedThemeName = localStorage.getItem('themeName');
    if (storedThemeName) {
      console.log('Tema tercihi mevcut:', storedThemeName);
    } else {
      console.log('Tema tercihi mevcut değil');
    }

    if (storedThemeName) {
      setThemeName(storedThemeName);
    } else {
      // Fallback to system preference
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setThemeName(darkMediaQuery.matches ? 'dark' : '');
      
      darkMediaQuery.addEventListener('change', (e) => {
        setThemeName(e.matches ? 'dark' : '');
      });
    }
  }, []);

  useEffect(() => {
    if (themeName === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [themeName]);

  /**
   * Toggles the theme between light and dark mode.
   */
  const toggleTheme = () => {
    const name = themeName === 'dark' ? '' : 'dark';
    localStorage.setItem('themeName', name);
    setThemeName(name);
  };

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ThemeProvider, ThemeContext };
