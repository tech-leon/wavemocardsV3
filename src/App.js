import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/layout/Footer";
import Emotions from "./pages/Emotions";

function App() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <Router>
        <Header />
        {/* <div className={`h-full flex flex-col ${isDarkMode ? "dark" : ""}`}> */}
          <main className="flex flex-col bg-gray-100 dark:bg-gray-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/emotions" element={<Emotions />} />
            </Routes>
          </main>
        {/* </div> */}
        <Footer />
      </Router>
    </>
  );
}

export default App;
