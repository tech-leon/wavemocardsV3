import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/layout/Footer";

function App() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <Router>
        <div className={`h-screen flex flex-col ${isDarkMode ? "dark" : ""}`}>
          <Header />
          <main className="bg-gray-100 dark:bg-gray-900 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </Router>
    </>
  );
}

export default App;