import React from "react";
import "../Styles/About.css";
import { motion } from "framer-motion";
import ProfilePhoto from "../images/2024-5.png";
import WhatsAppIcon from "../images/icons/whatsapp.png";
import LinkedInIcon from "../images/icons/linkedin.png";
import GitHubIcon from "../images/icons/github.png";
import EmailIcon from "../images/icons/email.png";
import { Trans, useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <motion.section
      className="about-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="about-content">
        <div className="about-photo-container">
          <motion.div
            className="about-photo"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <img src={ProfilePhoto} alt="João Pedro" className="profile-img" />
          </motion.div>

          <motion.div
            className="social-container"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <div className="social-icons-row">
              <a
                href="https://api.whatsapp.com/send?phone=5512981800280"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={WhatsAppIcon}
                  alt="WhatsApp"
                  className="social-icon"
                />
              </a>
              <a
                href="mailto:joao.pedrogs@live.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={EmailIcon} alt="Email" className="social-icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/joao-guimaraes-silva/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={LinkedInIcon}
                  alt="LinkedIn"
                  className="social-icon"
                />
              </a>
              <a
                href="https://github.com/jaoguimaraes"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={GitHubIcon}
                  alt="GitHub"
                  className="social-icon github-icon"
                />
              </a>
            </div>

            <div className="download-button-container">
              <a
                href="/curriculo-joao-pedro-guimaraes-da-silva.pdf"
                download="Joao_Pedro_Backend_Developer.pdf"
                className="cta-button"
              >
                {t("about.button")}
              </a>
            </div>
          </motion.div>
        </div>
        <div className="about-text">
          <motion.p
            className="about-p"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <h2 className="about-h2">{t("about.title")}</h2>
          </motion.p>
          <motion.p
            className="about-p"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            {" "}
            <Trans
              i18nKey="about.description"
              components={{
                bold: <strong />,
                br: <br />,
              }}
            />
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}
