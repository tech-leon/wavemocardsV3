import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";

export default function Example() {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  const backgroundImage = isDarkMode
    ? "url('/images/background-dark.svg')"
    : "url('/images/background-light.svg')";

  return (
    <>
      <section
        className="relative h-full flex flex-col items-center justify-center bg-local bg-cover bg-center transition-all duration-300"
        style={{ backgroundImage }}
      >
        <div className="relative">
          <h1 className="text-7xl md:text-8xl font-bold text-white mb-4 lg:pr-[300px]">
            {t("pages.home.title")}
          </h1>{" "}
        </div>
        <div className="relative z-10 text-right">
          <h1 className="text-7xl md:text-8xl font-bold text-white mt-4 lg:pl-[300px]">
            {t("pages.home.subtitle")}
          </h1>
        </div>
      </section>
    </>
  );
}
