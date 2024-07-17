const lightColors = {
  background: '#FFFFFF',
  text: '#333333',
  // 其他亮色主題顏色...
};

const darkColors = {
  background: '#222222',
  text: '#FFFFFF',
  // 其他暗色主題顏色...
};

const createTheme = (language, isDark) => {
  const colors = isDark ? darkColors : lightColors;
  
  const fontFamilies = {
    'zh-TW': {
      title: 'Noto Sans TC, sans-serif',
      content: 'Noto Sans TC, sans-serif',
    },
    'en': {
      title: 'Ubuntu, sans-serif',
      content: 'Lato, sans-serif',
    },
    'ja': {
      title: 'Noto Sans JP, sans-serif',
      content: 'Noto Sans JP, sans-serif',
    },
  };

  return {
    colors,
    fontFamily: fontFamilies[language] || fontFamilies['en'],
    isDark,
  };
};

export default createTheme;