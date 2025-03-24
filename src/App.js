import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Components/Home";
// import Projects from "./Components/Projects";
import Skills from "./Components/Experiences";
// import Contact from "./Components/Contact";
import About from "./Components/About";
import "./Styles/App.css";

function App() {
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
            {/* <li>
              <Link to="/projects">Projetos</Link>
            </li>
            <li>
              <Link to="/contact">Contato</Link>
            </li> */}
          </ul>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiences" element={<Skills />} />
          {/* <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
