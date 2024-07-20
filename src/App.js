import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/routing/PrivateRoute";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Footer from "./components/layout/Footer";
import Emotions from "./pages/Emotions";
import Login from "./pages/Login";
import Profile from "./pages/user/Profile";
import Delete from "./pages/user/Delete";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <LanguageProvider>
            <Router>
              <div
                className="min-h-screen flex flex-col"
              >
                <Header />
                <main className="flex flex-col flex-grow bg-gray-100 dark:bg-gray-900">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/emotions" element={<Emotions />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/user/profile"
                      element={
                        <PrivateRoute>
                          <Profile />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/user/delete"
                      element={
                        <PrivateRoute>
                          <Delete />
                        </PrivateRoute>
                      }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </Router>
          </LanguageProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
