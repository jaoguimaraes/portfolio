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
import ReactJSIcon from "../images/icons/reactjs.png";
import TypeScriptIcon from "../images/icons/typescript.png";
import PostgreSQLIcon from "../images/icons/postgresql.png";
import ZabbixIcon from "../images/icons/zabbix.png";
import GrafanaIcon from "../images/icons/grafana.png";
import DataDogIcon from "../images/icons/datadog.png";
import "../Styles/Home.css";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";

export default function Home() {
  const { t } = useTranslation();

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
              <Trans
                i18nKey="home.title"
                components={{ highlight: <span className="name-highlight" /> }}
              />
            </h1>
            <h2>{t("home.subtitle")}</h2>
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
                  {t("home.highlights.item1")}
                </li>
                <li>
                  <span className="highlight-icon">▹</span>
                  {t("home.highlights.item2")}
                </li>
                <li>
                  <span className="highlight-icon">▹</span>
                  {t("home.highlights.item3")}
                </li>
                <li>
                  <span className="highlight-icon">▹</span>
                  {t("home.highlights.item4")}
                </li>
              </ul>
            </div>
            <br />
            <div className="action-section">
              <a
                href="/curriculo-joao-pedro-guimaraes-da-silva.pdf"
                download="curriculo-joao-pedro-guimaraes.pdf"
                className="cta-button"
              >
                {t("home.button")}
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
        <h3 className="tech-title">{t("home.technologies")}</h3>
        <div className="tech-icons-grid">
          <div className="tech-icon">
            <img src={ZabbixIcon} alt="Zabbix" />
            <span>Zabbix</span>
          </div>
          <div className="tech-icon">
            <img src={GrafanaIcon} alt="Grafana" />
            <span>Grafana</span>
          </div>
          <div className="tech-icon">
            <img src={DataDogIcon} alt="DataDog" />
            <span>Datadog</span>
          </div>
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
            <img src={ReactJSIcon} alt="React.js" />
            <span>React.js</span>
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
          <div className="tech-icon">
            <img src={PostgreSQLIcon} alt="PostgreSQL" />
            <span>PostgreSQL</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
