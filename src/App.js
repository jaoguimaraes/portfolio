import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
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

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">Sobre</Link>
            </li>
            <li>
              <Link to="/experiences">Experiencias</Link>
            </li>
            <div className="App">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="theme-toggle-button"
                aria-label="Alternar tema"
              >
                {darkMode ? <FaSun color="white" /> : <FaMoon color="white" />}
              </button>
            </div>
          </ul>
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
