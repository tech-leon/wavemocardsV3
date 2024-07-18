import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

function DarkModeSwitch() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <>
      <button
        onClick={toggleDarkMode}
        className="flex items-center border rounded bg-gray-700  border-slate-600 dark:border-slate-400 hover:text-[#3c9daeff] hover:dark:bg-amber-100 hover:bg-gray-900 size-8 justify-center"
      >
        {isDarkMode ? "☀️" : "🌙"}
      </button>
    </>
  );
}

export default DarkModeSwitch;
