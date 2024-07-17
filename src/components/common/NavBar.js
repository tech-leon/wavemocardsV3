import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function NavBar() {
  const { t } = useTranslation();
  return (
    <>
      <nav className="flex lg:w-1/3 flex-wrap items-center text-base md:ml-auto">
        <Link to="/" className="mr-5 hover:text-gray-900">{t("nav.home")}</Link>
        <Link to="/about" className="mr-5 hover:text-gray-900">{t("nav.about")}</Link>
        {/* <a class="mr-5 hover:text-gray-900">Third Link</a>
        <a class="hover:text-gray-900">Fourth Link</a> */}
      </nav>
    </>

    // <nav className="bg-blue-500 p-4">
    //   <ul className="flex space-x-4">
    //     <li>
    //       <Link to="/" className="text-white hover:text-gray-200">{t('nav.home')}</Link>
    //     </li>
    //     <li>
    //       <Link to="/about" className="text-white hover:text-gray-200">{t('nav.about')}</Link>
    //     </li>
    //   </ul>
    // </nav>
  );
}

export default NavBar;
