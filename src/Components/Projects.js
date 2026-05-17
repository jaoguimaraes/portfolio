import React, { useState, useRef, useEffect, useCallback } from "react";
import "../Styles/Projects.css";
import { FiGithub, FiExternalLink, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const TECH_COLORS = {
  "React 18":      { bg: "rgba(97,218,251,0.15)",  color: "#61DAFB", border: "rgba(97,218,251,0.35)" },
  "React 19":      { bg: "rgba(97,218,251,0.15)",  color: "#61DAFB", border: "rgba(97,218,251,0.35)" },
  "Next.js":       { bg: "rgba(255,255,255,0.1)",  color: "#ffffff", border: "rgba(255,255,255,0.25)" },
  "TypeScript":    { bg: "rgba(49,120,198,0.2)",   color: "#7CB9F4", border: "rgba(49,120,198,0.4)" },
  "TailwindCSS":   { bg: "rgba(6,182,212,0.15)",   color: "#06B6D4", border: "rgba(6,182,212,0.35)" },
  "Supabase":      { bg: "rgba(62,207,142,0.15)",  color: "#3ECF8E", border: "rgba(62,207,142,0.35)" },
  "Vite":          { bg: "rgba(100,108,255,0.15)", color: "#a78bfa", border: "rgba(100,108,255,0.35)" },
  "n8n":           { bg: "rgba(234,75,113,0.15)",  color: "#EA4B71", border: "rgba(234,75,113,0.35)" },
  "OpenAI":        { bg: "rgba(16,163,127,0.15)",  color: "#10A37F", border: "rgba(16,163,127,0.35)" },
  "React Router":  { bg: "rgba(202,66,69,0.15)",   color: "#F87171", border: "rgba(202,66,69,0.35)" },
  "Radix UI":      { bg: "rgba(139,92,246,0.15)",  color: "#c4b5fd", border: "rgba(139,92,246,0.35)" },
  "WhatsApp API":  { bg: "rgba(37,211,102,0.15)",  color: "#25D366", border: "rgba(37,211,102,0.35)" },
  "Redis":         { bg: "rgba(220,56,44,0.15)",   color: "#FF6B6B", border: "rgba(220,56,44,0.35)" },
};

const PROJECT_GRADIENTS = {
  "ta-euphonia":     "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)",
  "dashboard-atena": "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
  "webhook-sender":  "linear-gradient(135deg, #059669 0%, #0ea5e9 100%)",
  "link-hub":        "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
  "meu-gerenciador": "linear-gradient(135deg, #ec4899 0%, #f97316 100%)",
  "onboarding":      "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
};

const PROJECT_ICONS = {
  "ta-euphonia":     "🎯",
  "dashboard-atena": "🤖",
  "webhook-sender":  "⚡",
  "link-hub":        "🔗",
  "meu-gerenciador": "📋",
  "onboarding":      "🎓",
};

function TechBadge({ tech }) {
  const style = TECH_COLORS[tech] || { bg: "rgba(148,163,184,0.15)", color: "#94a3b8", border: "rgba(148,163,184,0.3)" };
  return (
    <span className="tech-badge" style={{ background: style.bg, color: style.color, borderColor: style.border }}>
      {tech}
    </span>
  );
}

function StatusBadge({ status, label }) {
  return <span className={`status-badge status-badge--${status}`}>{label}</span>;
}

function SARSection({ sar, labels }) {
  if (!sar) return null;
  const items = [
    { key: "situation", emoji: "🔍", label: labels.situation, text: sar.situation },
    { key: "action",    emoji: "⚙️", label: labels.action,    text: sar.action    },
    { key: "result",    emoji: "🚀", label: labels.result,    text: sar.result    },
  ];
  return (
    <div className="sar-section">
      {items.map(({ key, emoji, label, text }) => (
        <div key={key} className={`sar-item sar-item--${key}`}>
          <div className="sar-item__header">
            <span className="sar-item__emoji">{emoji}</span>
            <span className="sar-item__label">{label}</span>
          </div>
          <p className="sar-item__text">{text}</p>
        </div>
      ))}
    </div>
  );
}

// ── Drag-to-Reveal (used inside modules modal) ────────────────────────────────
function DragReveal({ front, back }) {
  const [pct, setPct] = useState(0);
  const [dragging, setDragging] = useState(false);
  const containerRef = useRef(null);
  const startRef = useRef({ x: 0, pct: 0 });

  const getX = (e) => (e.touches ? e.touches[0].clientX : e.clientX);

  const onStart = useCallback((e) => {
    setDragging(true);
    startRef.current = { x: getX(e), pct };
  }, [pct]);

  const onMove = useCallback((e) => {
    if (!containerRef.current) return;
    const dx = startRef.current.x - getX(e);
    const w = containerRef.current.offsetWidth;
    const next = Math.max(0, Math.min(100, startRef.current.pct + (dx / w) * 100));
    setPct(next);
  }, []);

  const onEnd = useCallback(() => {
    setDragging(false);
    setPct((p) => (p > 40 ? 100 : 0));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
    };
  }, [dragging, onMove, onEnd]);

  return (
    <div
      ref={containerRef}
      className={`drag-reveal${dragging ? " drag-reveal--dragging" : ""}`}
      onMouseDown={onStart}
      onTouchStart={onStart}
      onTouchMove={onMove}
      onTouchEnd={onEnd}
    >
      <div className="drag-reveal__back">{back}</div>
      <div
        className="drag-reveal__front"
        style={{
          clipPath: `inset(0 ${pct}% 0 0)`,
          transition: dragging ? "none" : "clip-path 0.35s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        {front}
      </div>
      {pct > 1 && pct < 99 && (
        <div className="drag-reveal__divider" style={{ left: `${100 - pct}%` }}>
          <div className="drag-reveal__divider-handle" />
        </div>
      )}
      {pct < 2 && !dragging && (
        <div className="drag-reveal__hint">
          <FiChevronLeft size={11} />
          <FiChevronLeft size={11} />
          <span>arraste</span>
        </div>
      )}
    </div>
  );
}

// ── Module Card — drag-to-reveal (video → SAR) ────────────────────────────────
function ModuleCard({ module, index, sarLabels }) {
  const front = (
    <div className="module-drag-front">
      {module.video ? (
        <video src={module.video} autoPlay muted loop playsInline className="module-media" />
      ) : module.screenshots?.length > 0 ? (
        <img src={module.screenshots[0]} alt={module.title} className="module-media" />
      ) : (
        <div className="module-placeholder">
          <span className="module-placeholder__icon">🎬</span>
          <p className="module-placeholder__text">Preview em breve</p>
        </div>
      )}
    </div>
  );

  const back = (
    <div className="drag-reveal__sar">
      <SARSection sar={module.sar} labels={sarLabels} />
    </div>
  );

  return (
    <div className="module-card">
      <div className="module-card__header">
        <span className="module-card__num">0{index + 1}</span>
        <h4 className="module-card__title">{module.title}</h4>
      </div>
      <DragReveal front={front} back={back} />
    </div>
  );
}

// ── Modules Modal ─────────────────────────────────────────────────────────────
function ModulesModal({ project, onClose }) {
  const { t } = useTranslation();
  const sarLabels = t("projects.sar", { returnObjects: true });
  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal__close" onClick={onClose}><FiX /></button>
        <div className="project-modal__cover">
          <div className="project-modal__cover-text" style={{ position: "relative", zIndex: 1 }}>
            <h2 className="project-modal__title">{project.name} — Módulos</h2>
            <StatusBadge status={project.status} label={project.statusLabel} />
          </div>
        </div>
        <div className="project-modal__body">
          <div className="project-modal__modules">
            {project.modules.map((mod, i) => (
              <ModuleCard key={i} module={mod} index={i} sarLabels={sarLabels} />
            ))}
          </div>
          <div className="project-modal__footer">
            <div className="project-card-new__tech">
              {project.tech.map((t) => <TechBadge key={t} tech={t} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Unified Project Card — flip effect for all projects ───────────────────────
function ProjectCard({ project, onOpenModules }) {
  const [flipped, setFlipped] = useState(false);
  const { t } = useTranslation();
  const sarLabels = t("projects.sar", { returnObjects: true });
  const gradient = PROJECT_GRADIENTS[project.key];
  const icon = PROJECT_ICONS[project.key];
  const hasSAR = project.sar && (project.sar.situation || project.sar.action || project.sar.result);

  return (
    <div className="pfc">
      <div className={`pfc__inner${flipped ? " pfc__inner--flipped" : ""}`}>

        {/* Front */}
        <div className={`pfc__face pfc__front${(project.cover || project.video) ? " pfc__front--cover" : ""}`} onClick={() => hasSAR && setFlipped(true)}>
          {project.video ? (
            <div className="pfc__img-wrap">
              <video src={project.video} autoPlay muted loop playsInline className="pfc__img" />
              {hasSAR && (
                <div className="pfc__hint pfc__hint--cover">
                  <span>{t("projects.tapForAnalysis")}</span>
                  <FiChevronRight size={13} />
                </div>
              )}
            </div>
          ) : project.cover ? (
            <>
              <div className="pfc__img-wrap">
                <img src={project.cover} alt={project.name} className="pfc__img" />
                {hasSAR && (
                  <div className="pfc__hint pfc__hint--cover">
                    <span>{t("projects.tapForAnalysis")}</span>
                    <FiChevronRight size={13} />
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="pfc__gradient" style={{ background: gradient }}>
                <span className="pfc__icon">{icon}</span>
              </div>
              <div className="pfc__overlay" />
              <div className="pfc__content">
                <div className="pfc__top">
                  <StatusBadge status={project.status} label={project.statusLabel} />
                </div>
                <div className="pfc__bottom">
                  <h3 className="pfc__title">{project.name}</h3>
                  <p className="pfc__desc">{project.description}</p>
                  {hasSAR && (
                    <div className="pfc__hint">
                      <span>{t("projects.tapForAnalysis")}</span>
                      <FiChevronRight size={13} />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Back */}
        <div className="pfc__face pfc__back">
          <div className="pfc__back-scroll">
            <h3 className="pfc__back-title">{project.name}</h3>
            <SARSection sar={project.sar} labels={sarLabels} />
            <div className="pfc__tech">
              {project.tech.map((tech) => <TechBadge key={tech} tech={tech} />)}
            </div>
            {project.modules?.length > 0 && (
              <button
                className="flip-modules-btn"
                onClick={(e) => { e.stopPropagation(); onOpenModules(project); }}
              >
                {t("projects.seeModules", { count: project.modules.length })}
              </button>
            )}
            <div className="pfc__links">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-card-new__link project-card-new__link--github">
                  <FiGithub size={14} /> GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-card-new__link project-card-new__link--demo">
                  <FiExternalLink size={14} /> Demo
                </a>
              )}
            </div>
          </div>
          <button
            className="pfc__back-btn"
            onClick={(e) => { e.stopPropagation(); setFlipped(false); }}
          >
            <FiChevronLeft size={14} /> {t("projects.back")}
          </button>
        </div>

      </div>
    </div>
  );
}

// ── Projects Page ─────────────────────────────────────────────────────────────
const Projects = () => {
  const { t } = useTranslation();
  const projectList = t("projects.list", { returnObjects: true });
  const [filter, setFilter] = useState("all");
  const [modulesProject, setModulesProject] = useState(null);

  const categories = t("projects.categories", { returnObjects: true });

  const filtered = filter === "all"
    ? projectList
    : projectList.filter((p) => p.category === filter);

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
            {["React", "Next.js", "TypeScript", "TailwindCSS", "Supabase", "n8n", "OpenAI", "WhatsApp API"].map((tech) => (
              <TechBadge key={tech} tech={tech} />
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

      <div className="projects-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.key} project={project} onOpenModules={setModulesProject} />
        ))}
      </div>

      {modulesProject && (
        <ModulesModal project={modulesProject} onClose={() => setModulesProject(null)} />
      )}
    </div>
  );
};

export default Projects;
