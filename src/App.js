import React, { useEffect, useState } from "react";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Components/Home";
import Skills from "./Components/Experiences";
import About from "./Components/About";
import "./Styles/App.css";
import "./i18n";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

function App() {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLang = currentLanguage === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLang);
  };

  const [darkMode, setDarkMode] = useState(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return localStorage.getItem("theme")
      ? localStorage.getItem("theme") === "dark"
      : prefersDark;
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      <header>
        <nav>
          {isMobile && (
            <button
              className="hamburger-button"
              onClick={toggleMenu}
              aria-label="Abrir menu"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          )}
          {!isMobile && (
            <ul className="desktop-menu">
              <li>
                <Link to="/" className={isActive("/") ? "active" : ""}>
                  {t("header.home")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={isActive("/about") ? "active" : ""}
                >
                  {t("header.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/experiences"
                  className={isActive("/experiences") ? "active" : ""}
                >
                  {t("header.experiencie")}
                </Link>
              </li>
            </ul>
          )}

          <div className="theme-toggle-container">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle-button"
              aria-label="Alternar tema"
            >
              {darkMode ? <FaSun color="white" /> : <FaMoon color="white" />}
            </button>

            <button onClick={toggleLanguage} className="language-toggle-button">
              <Flag
                code={currentLanguage === "pt" ? "US" : "BR"}
                style={{ width: 24, height: 16 }}
              />
            </button>
          </div>

          {isMobile && menuOpen && (
            <div className="mobile-menu active">
              <ul className="mobile-menu-list">
                <li>
                  <Link to="/" className={isActive("/") ? "active" : ""}>
                    HOME
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className={isActive("/about") ? "active" : ""}
                  >
                    SOBRE
                  </Link>
                </li>
                <li>
                  <Link
                    to="/experiences"
                    className={isActive("/experiences") ? "active" : ""}
                  >
                    EXPERIENCIAS
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiences" element={<Skills />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
