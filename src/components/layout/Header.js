import React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from 'react-router-dom';
import styled from "styled-components";

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: ${props => props.theme.colors.headerBackground};
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(({ isActive, ...props }) => <Link {...props} />)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  &:hover {
    text-decoration: underline;
  }
`;

const LanguageButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ThemeToggle = styled.button`
  // 樣式...
`;

function Header({ toggleTheme, isDarkMode }) {
  const { t, i18n } = useTranslation();
  // console.log('Current language:', i18n.language);
  // console.log('Available languages:', i18n.languages);
  // console.log('Translation for nav.home:', t('nav.home'));
  const location = useLocation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <HeaderWrapper>
      <Nav>
        <NavLink to="/" isActive={location.pathname === '/'}>{t('nav.home')}</NavLink>
        <NavLink to="/about" isActive={location.pathname === '/about'}>{t('nav.about')}</NavLink>
        <NavLink to="/contact" isActive={location.pathname === '/contact'}>{t('nav.contact')}</NavLink>
      </Nav>
      <LanguageButtons>
        <button onClick={() => changeLanguage('zh-TW')}>中文</button>
        <button onClick={() => changeLanguage('en')}>English</button>
        <button onClick={() => changeLanguage('ja')}>日本語</button>
      </LanguageButtons>
      <ThemeToggle onClick={toggleTheme}>
        {isDarkMode ? t('theme.light') : t('theme.dark')}
      </ThemeToggle>
    </HeaderWrapper>
  );
}

export default Header;
