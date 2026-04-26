import React, { useState } from "react";
import "../Styles/Projects.css";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const TECH_COLORS = {
  "React 18":     { bg: "rgba(97,218,251,0.15)", color: "#61DAFB", border: "rgba(97,218,251,0.35)" },
  "React 19":     { bg: "rgba(97,218,251,0.15)", color: "#61DAFB", border: "rgba(97,218,251,0.35)" },
  "Next.js":      { bg: "rgba(255,255,255,0.1)",  color: "#ffffff", border: "rgba(255,255,255,0.25)" },
  "TypeScript":   { bg: "rgba(49,120,198,0.2)",   color: "#7CB9F4", border: "rgba(49,120,198,0.4)" },
  "TailwindCSS":  { bg: "rgba(6,182,212,0.15)",   color: "#06B6D4", border: "rgba(6,182,212,0.35)" },
  "Supabase":     { bg: "rgba(62,207,142,0.15)",  color: "#3ECF8E", border: "rgba(62,207,142,0.35)" },
  "Vite":         { bg: "rgba(100,108,255,0.15)", color: "#a78bfa", border: "rgba(100,108,255,0.35)" },
  "n8n":          { bg: "rgba(234,75,113,0.15)",  color: "#EA4B71", border: "rgba(234,75,113,0.35)" },
  "OpenAI":       { bg: "rgba(16,163,127,0.15)",  color: "#10A37F", border: "rgba(16,163,127,0.35)" },
  "React Router": { bg: "rgba(202,66,69,0.15)",   color: "#F87171", border: "rgba(202,66,69,0.35)" },
  "Radix UI":     { bg: "rgba(139,92,246,0.15)",  color: "#c4b5fd", border: "rgba(139,92,246,0.35)" },
};

const PROJECT_GRADIENTS = {
  "ta-euphonia":      "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
  "dashboard-atena":  "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  "webhook-sender":   "linear-gradient(135deg, #059669 0%, #0ea5e9 100%)",
  "link-hub":         "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
  "meu-gerenciador":  "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
};

const PROJECT_ICONS = {
  "ta-euphonia":      "🎯",
  "dashboard-atena":  "🤖",
  "webhook-sender":   "⚡",
  "link-hub":         "🔗",
  "meu-gerenciador":  "📋",
};

function TechBadge({ tech }) {
  const style = TECH_COLORS[tech] || {
    bg: "rgba(148,163,184,0.15)",
    color: "#94a3b8",
    border: "rgba(148,163,184,0.3)",
  };
  return (
    <span
      className="tech-badge"
      style={{ background: style.bg, color: style.color, borderColor: style.border }}
    >
      {tech}
    </span>
  );
}

function StatusBadge({ status, label }) {
  return (
    <span className={`status-badge status-badge--${status}`}>
      {label}
    </span>
  );
}

function ProjectCard({ project, featured }) {
  const gradient = PROJECT_GRADIENTS[project.key];
  const icon = PROJECT_ICONS[project.key];

  return (
    <div className={`project-card-new ${featured ? "project-card-new--featured" : ""}`}>
      <div className="project-card-new__cover" style={{ background: gradient }}>
        <span className="project-card-new__icon">{icon}</span>
        <StatusBadge status={project.status} label={project.statusLabel} />
      </div>

      <div className="project-card-new__body">
        <h3 className="project-card-new__title">{project.name}</h3>
        <p className="project-card-new__description">{project.description}</p>

        <div className="project-card-new__tech">
          {project.tech.map((t) => (
            <TechBadge key={t} tech={t} />
          ))}
        </div>

        <div className="project-card-new__links">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-new__link project-card-new__link--github"
            >
              <FiGithub size={14} />
              GitHub
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-new__link project-card-new__link--demo"
            >
              <FiExternalLink size={14} />
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const Projects = () => {
  const { t } = useTranslation();
  const projectList = t("projects.list", { returnObjects: true });
  const [filter, setFilter] = useState("all");

  const categories = t("projects.categories", { returnObjects: true });

  const featured = projectList.filter((p) => p.featured);
  const regular = projectList.filter((p) => !p.featured);

  const filteredFeatured =
    filter === "all" ? featured : featured.filter((p) => p.category === filter);
  const filteredRegular =
    filter === "all" ? regular : regular.filter((p) => p.category === filter);

  return (
    <div className="projects-container">
      <div className="projects-header">
        <h2 className="projects-title">{t("projects.title")}</h2>
        <p className="projects-subtitle">{t("projects.subtitle")}</p>
      </div>

      <div className="projects-ecosystem">
        <div className="ecosystem-banner">
          <div className="ecosystem-banner__label">{t("projects.ecosystemLabel")}</div>
          <h3 className="ecosystem-banner__title">{t("projects.ecosystemTitle")}</h3>
          <p className="ecosystem-banner__description">{t("projects.ecosystemDescription")}</p>
          <div className="ecosystem-banner__stack">
            {["React", "Next.js", "TypeScript", "TailwindCSS", "Supabase", "n8n", "OpenAI"].map((t) => (
              <TechBadge key={t} tech={t} />
            ))}
          </div>
        </div>
      </div>

      <div className="projects-filter">
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            className={`filter-btn ${filter === key ? "filter-btn--active" : ""}`}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </div>

      {filteredFeatured.length > 0 && (
        <div className="projects-featured">
          {filteredFeatured.map((project) => (
            <ProjectCard key={project.key} project={project} featured />
          ))}
        </div>
      )}

      <div className="projects-grid">
        {filteredRegular.map((project) => (
          <ProjectCard key={project.key} project={project} featured={false} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
