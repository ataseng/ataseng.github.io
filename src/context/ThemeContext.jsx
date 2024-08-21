import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Tema sağlamak için context oluşturma
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Tema adını saklamak için state oluşturma
  const [themeName, setThemeName] = useState('');

  // Component ilk render edildiğinde ve themeName değiştiğinde çalışacak useEffect
  useEffect(() => {
    // LocalStorage'dan saklanan tema adını alıma
    const storedThemeName = localStorage.getItem('themeName');
    if (storedThemeName) {
      // Eğer tema adı varsa, state'i güncelleme
      setThemeName(storedThemeName);
    } else {
      // Yoksa, kullanıcının sistem tercihine göre tema adını belirleme
      const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setThemeName(darkMediaQuery.matches ? 'dark' : '');
      
      // Kullanıcı tema tercihini değiştirdiğinde state'i güncellemek için event listener ekleme
      darkMediaQuery.addEventListener('change', (e) => {
        setThemeName(e.matches ? 'dark' : '');
      });
    }
  }, []);

  // Tema adını değiştirirken body elementinin sınıfını güncelleme
  useEffect(() => {
    if (themeName === 'dark') {
      // Tema koyu ise body'ye 'dark-mode' sınıfını ekliyoruz
      document.body.classList.add('dark-mode');
    } else {
      // Tema açık ise 'dark-mode' sınıfını kaldırıyoruz
      document.body.classList.remove('dark-mode');
    }
  }, [themeName]);

  // Temayı değiştirmek için toggle fonksiyonu
  const toggleTheme = () => {
    const name = themeName === 'dark' ? '' : 'dark';
    localStorage.setItem('themeName', name);
    setThemeName(name);
  };

  // Tema adını ve toggle fonksiyonunu context değeri olarak sağlama
  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export { ThemeProvider, ThemeContext };
