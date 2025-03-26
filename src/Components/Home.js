import React from "react";
import Image from "../images/2024-5.png";
import GitHubIcon from "../images/icons/github.png";
import LinkedinIcon from "../images/icons/linkedin.png";
import WhatsAppIcon from "../images/icons/whatsapp.png";
import EmailIcon from "../images/icons/email.png";
import GitIcon from "../images/icons/git.png";
import GraphQLIcon from "../images/icons/graphql.png";
import JavaScriptIcon from "../images/icons/javascript.png";
import MongoDBIcon from "../images/icons/mongodb.png";
import NodeJSIcon from "../images/icons/nodejs.png";
import TypeScriptIcon from "../images/icons/typescript.png";
import "../Styles/Home.css";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="home-session">
      <div className="content-wrapper">
        <div className="text-content">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h1 className="home-title">
              Olá, eu sou <span className="name-highlight">João Pedro</span>
            </h1>
            <h2 className="home-subtitle">Desenvolvedor Backend</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="content-block"
          >
            <div className="highlights">
              <ul>
                <li>
                  <span className="highlight-icon">▹</span>
                  Mais de 1 ano de experiência diária com desenvolvimento
                </li>
                <li>
                  <span className="highlight-icon">▹</span>
                  Cursando Ciência da Computação com ênfase em Fullstack
                </li>
                <li>
                  <span className="highlight-icon">▹</span>
                  Apaixonado por tecnologia e atento as novidades do mercado
                </li>
                <li>
                  <span className="highlight-icon">▹</span>O Desenvolvedor
                  curioso e técnico que você estava procurando!
                </li>
              </ul>
            </div>
            <br />
            <div className="action-section">
              <a
                href="/curriculo-joao-pedro-guimaraes-da-silva.pdf"
                download="Joao_Pedro_Backend_Developer.pdf"
                className="cta-button"
              >
                Baixar Currículo
              </a>

              <div className="social-links">
                <a
                  href="https://github.com/jaoguimaraes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={GitHubIcon} alt="GitHub" />
                </a>
                <a
                  href="https://www.linkedin.com/in/joao-guimaraes-silva/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={LinkedinIcon} alt="LinkedIn" />
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=5512981800280"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={WhatsAppIcon} alt="WhatsApp" />
                </a>
                <a
                  href="mailto:joao.pedrogs@live.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={EmailIcon} alt="Email" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="profile-image-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          <img
            src={Image}
            alt="João Pedro - Desenvolvedor Backend"
            className="profile-image"
          />
        </motion.div>
      </div>

      <motion.div
        className="tech-stack"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <h3 className="tech-title">Tecnologias que trabalho</h3>
        <div className="tech-icons-grid">
          <div className="tech-icon">
            <img src={NodeJSIcon} alt="Node.js" />
            <span>Node.js</span>
          </div>
          <div className="tech-icon">
            <img src={TypeScriptIcon} alt="TypeScript" />
            <span>TypeScript</span>
          </div>
          <div className="tech-icon">
            <img src={JavaScriptIcon} alt="JavaScript" />
            <span>JavaScript</span>
          </div>
          <div className="tech-icon">
            <img src={MongoDBIcon} alt="MongoDB" />
            <span>MongoDB</span>
          </div>
          <div className="tech-icon">
            <img src={GraphQLIcon} alt="GraphQL" />
            <span>GraphQL</span>
          </div>
          <div className="tech-icon">
            <img src={GitIcon} alt="Git" />
            <span>Git</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
