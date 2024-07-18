import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ChangeLng = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "zh-TW", name: "中文" },
    { code: "ja", name: "日本語" },
    { code: "en", name: "English" },
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  // 點擊外部關閉下拉菜單
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative max-w-fit mx-1" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center border rounded border-slate-600 dark:border-slate-400 hover:text-[#3c9daeff] hover:dark:bg-white hover:bg-gray-800 justify-center space-x-1 focus:outline-none size-8"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 py-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-xl z-20">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => changeLanguage(lang.code)}
              className="block hover:text-[#3c9daeff] hover:dark:bg-white hover:bg-gray-800 px-4 py-2 text-sm w-full text-left"
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChangeLng;
