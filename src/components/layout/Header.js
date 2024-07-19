import React from "react";
import { useTranslation } from "react-i18next";
import NavBar from "../common/NavBar";
import ChangeLng from "../common/ChangeLng";
import DarkModeSwitch from "../common/DarkModeSwitch";
import UserIcon from "../common/UserIcon";

function Header() {
  const { t } = useTranslation();

  return (
    <>
      <header className="sticky top-0 text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-white shadow-md z-50">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <NavBar />
          <a
            href="/"
            className="flex order-first lg:order-none lg:w-1/3 title-font font-medium items-center lg:items-center lg:justify-center mb-4 md:mb-0"
          >
            <img
              className="size-9"
              src="/images/logos/logo.png"
              alt="logo"
            ></img>
            <span className="ml-3 text-3xl text-[#3c9daeff]">
              {t("nav.app")}
            </span>
          </a>
          <div className="lg:w-1/3 inline-flex lg:justify-end ml-5 lg:ml-0">
            <UserIcon />
            <ChangeLng />
            <DarkModeSwitch />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
