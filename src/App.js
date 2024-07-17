import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useTranslation } from 'react-i18next';
import createTheme from './styles/themes';
import { GlobalStyles } from './styles/GlobalStyles';
import Header from './components/layout/Header';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import './i18n/config';


function App() {
  const { i18n } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(true); // 預設為暗色主題

  const theme = createTheme(i18n.language, isDarkMode);

  // 切換主題的函數
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 可以將主題偏好保存到 localStorage
  useEffect(() => {
    localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // 在組件加載時從 localStorage 讀取主題偏好
  useEffect(() => {
    const savedMode = localStorage.getItem('isDarkMode');
    if (savedMode !== null) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Suspense fallback={<div>Loading...</div>}>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        </Suspense>
      </ThemeProvider>
    </Router>
  );
}

export default App;