import React, { useState } from "react";
import "../Styles/Experiences.css";
import Image from "../images/CRUD-Api.jpeg";
import encrypt from "../images/encryption.jpeg";
import { FiExternalLink, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const Experiences = () => {
  const { t } = useTranslation();
  const professionalExperiences = t("experiences.professionalList", {
    returnObjects: true,
  });
  const projectExperiences = t("experiences.projectList", {
    returnObjects: true,
  });

  const projectImages = {
    jotawallet: Image,
    "text-encryption": encrypt,
  };

  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="experiences-container">
      <div className="experiences-grid">
        <div className="professional-experiences">
          <h2 className="section-title">{t("experiences.professional")}</h2>
          {professionalExperiences.map((exp) => (
            <div
              key={exp.company}
              className={`experience-card ${
                expandedCard === exp.company ? "expanded" : ""
              }`}
              onClick={() => toggleExpand(exp.company)}
            >
              <h3>{exp.company}</h3>
              <p className="period">{exp.period}</p>
              <div className="roles">
                {exp.roles.map((role, index) => (
                  <p key={index}>{role}</p>
                ))}
              </div>
              {expandedCard === exp.company && (
                <div className="expanded-content">
                  {exp.description.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
                </div>
              )}
              <div className="expand-icon">
                {expandedCard === exp.company ? (
                  <FiChevronUp />
                ) : (
                  <FiChevronDown />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="project-experiences">
          <h2 className="section-title">{t("experiences.projects")}</h2>
          {projectExperiences.map((project) => (
            <div key={project.name} className="project-card">
              <div
                className="project-image"
                style={{
                  backgroundImage: `url(${projectImages[project.key]})`,
                }}
              />
              <h3>{project.name}</h3>
              <p className="project-description">{project.description}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <FiExternalLink style={{ marginRight: "8px" }} />
                {t("experiences.button")}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
