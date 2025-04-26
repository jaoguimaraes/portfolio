import React, { useEffect, useState } from "react";
import { FaSun, FaMoon, FaBars, FaTimes } from "react-icons/fa";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
import Skills from "./Components/Experiences";
import About from "./Components/About";
import "./Styles/App.css";

function App() {
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

          <ul className={`desktop-menu ${isMobile ? "hidden" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">Sobre</Link>
            </li>
            <li>
              <Link to="/experiences">Experiencias</Link>
            </li>
          </ul>

          <div className={`theme-toggle-container ${menuOpen ? "hidden" : ""}`}>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle-button"
              aria-label="Alternar tema"
            >
              {darkMode ? <FaSun color="white" /> : <FaMoon color="white" />}
            </button>
          </div>

          {isMobile && menuOpen && (
            <div className="mobile-menu">
              <ul>
                <li>
                  <Link to="/" onClick={toggleMenu}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/About" onClick={toggleMenu}>
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link to="/experiences" onClick={toggleMenu}>
                    Experiencias
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
