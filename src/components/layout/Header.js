import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import NavBar from "../common/NavBar";
import { ThemeContext } from "../../context/ThemeContext";

function Header() {
  const { t, i18n } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <header className="sticky top-0 text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-white shadow-md z-50">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <NavBar />
          <a href="/" className="flex order-first lg:order-none lg:w-1/3 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0">
            <img src="/images/logos/logo.png" alt="logo"></img>
            <span className="ml-3 text-2xl text-[#3c9daeff]">{t("nav.app")}</span>
          </a>
          <div className="lg:w-1/3 inline-flex lg:justify-end ml-5 lg:ml-0">
            <button
              onClick={() => changeLanguage("zh-TW")}
              className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
            >
              中文
            </button>
            <button
              onClick={() => changeLanguage("ja")}
              className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
            >
              日語文
            </button>
            <button
              onClick={() => changeLanguage("en")}
              className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0"
            >
              English
            </button>
            <button className="inline-flex items-center bg-gray-200 border-0 py-1 px-3 focus:outline-none hover:bg-gray-300 rounded text-base mt-4 md:mt-0">
              {t('nav.login')}
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
            <button
              onClick={toggleDarkMode}
              className="text-sm bg-yellow-500 hover:bg-yellow-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white font-bold py-1 px-2 rounded transition-colors duration-200"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
