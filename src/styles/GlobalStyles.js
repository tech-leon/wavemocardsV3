import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans TC';
    src: url('/fonts/NotoSansTC-VariableFont_wght.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url('/fonts/Ubuntu-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
  }

  body {
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    font-family: ${props => props.theme.fontFamily.content};
    transition: all 0.3s ease-in-out;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fontFamily.title};
  }
`;