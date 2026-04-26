import React, { useState, useEffect, useCallback, useRef } from "react";
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
import N8NIcon from "../images/icons/n8n.svg";
import OpenAIIcon from "../images/icons/openai.svg";
import SupabaseIcon from "../images/icons/supabase.svg";
import AWSIcon from "../images/icons/aws.svg";
import "../Styles/Home.css";
import { motion } from "framer-motion";
import { Trans, useTranslation } from "react-i18next";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

// ── Hero Stats (mini strip inside hero) ──────────────────────────
function HeroStats() {
  const { t } = useTranslation();
  const defs = [
    { target: 5,   suffix: "",   key: "home.stats.systems"  },
    { target: 100, suffix: "+",  key: "home.stats.students" },
    { target: 30,  suffix: "+",  key: "home.stats.automations" },
    { target: 10,  suffix: "+",  key: "home.stats.years"    },
  ];
  const [counts, setCounts] = useState(defs.map(() => 0));

  useEffect(() => {
    const ivs = [];
    const timer = setTimeout(() => {
      defs.forEach(({ target }, i) => {
        let v = 0;
        const inc = Math.max(1, Math.ceil(target / 30));
        const iv = setInterval(() => {
          v = Math.min(v + inc, target);
          setCounts(prev => { const n = [...prev]; n[i] = v; return n; });
          if (v >= target) clearInterval(iv);
        }, 30);
        ivs.push(iv);
      });
    }, 500);
    return () => { clearTimeout(timer); ivs.forEach(clearInterval); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="hero-stats-strip">
      {defs.map((s, i) => (
        <div key={i} className="hero-stat">
          <span className="hero-stat__val">{counts[i]}{s.suffix}</span>
          <span className="hero-stat__lbl">{t(s.key)}</span>
        </div>
      ))}
    </div>
  );
}

// ── Scroll Indicator ──────────────────────────────────────────────
function ScrollIndicator() {
  return (
    <div className="scroll-indicator" aria-hidden="true">
      <span className="scroll-indicator__text">scroll</span>
      <svg className="scroll-indicator__arrow" width="16" height="20" viewBox="0 0 16 20" fill="none">
        <path d="M8 1v14M2 10l6 7 6-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ── Automation Demo ───────────────────────────────────────────────
const SCENARIOS = [
  {
    id: "webhook", label: "Webhook → N8N", icon: "⚡", accent: "cyan",
    steps: [
      { label: "POST /webhook received",          detail: '{ event: "new_student", id: 847 }',      ms: 18  },
      { label: "Validate & filter payload",        detail: "schema OK · all fields present",          ms: 32  },
      { label: "Lookup record in Supabase",        detail: "1 match · status: pending",               ms: 94  },
      { label: "Activate N8N onboarding flow",     detail: "workflow_id: onboarding_v3",              ms: 142 },
      { label: "Log event to dashboard",           detail: "status: enrolled ✓",                      ms: 28  },
    ],
    output: `{\n  "status": "success",\n  "event": "new_student",\n  "workflow": "onboarding_v3",\n  "latency": "314ms"\n}`,
  },
  {
    id: "ai", label: "WhatsApp + AI", icon: "🤖", accent: "green",
    steps: [
      { label: "WhatsApp message received",        detail: '"Quando é minha próxima aula?"',           ms: 12  },
      { label: "Extract intent via GPT-4o-mini",   detail: "intent: schedule_query (conf: 0.97)",      ms: 390 },
      { label: "Query schedule from Supabase",     detail: "next_class: Fri 19:00",                    ms: 78  },
      { label: "Generate personalized reply",      detail: "138 tokens · model: gpt-4o-mini",         ms: 350 },
      { label: "Send via WhatsApp Business API",   detail: "delivered · msg_id: wamid.abc123",        ms: 88  },
    ],
    output: `{\n  "reply": "Sua próxima aula é sexta, 19h!",\n  "tokens": 138,\n  "confidence": 0.97,\n  "latency": "918ms"\n}`,
  },
  {
    id: "report", label: "Daily Report", icon: "📊", accent: "orange",
    steps: [
      { label: "Cron triggered (09:00 UTC-3)",     detail: "job: generate_daily_report",               ms: 5   },
      { label: "Fetch metrics from Supabase",      detail: "87 students · 234 tasks · 12 routines",   ms: 108 },
      { label: "Calculate KPIs & weekly trend",    detail: "+12% engagement ↑",                        ms: 52  },
      { label: "Render PDF with charts",           detail: "2 pages · 6 charts generated",            ms: 820 },
      { label: "Send to team via WhatsApp",        detail: "3 contacts · all delivered ✓",            ms: 125 },
    ],
    output: `{\n  "file": "report_2025-04-25.pdf",\n  "insights": "+12% engagement",\n  "recipients": 3,\n  "generated_at": "09:00:02"\n}`,
  },
];

function AutomationDemo() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(null);
  const [stepStates, setStepStates] = useState([]);
  const [output, setOutput] = useState("");
  const [running, setRunning] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const sectionRef = useRef(null);
  const hasStartedRef = useRef(false);
  const autoIdxRef = useRef(0);

  const runScenario = useCallback((scenario) => {
    setSelected(scenario.id);
    setRunning(true);
    setOutput("");
    setStepStates(scenario.steps.map(() => "pending"));

    let acc = 400;
    scenario.steps.forEach((step, i) => {
      const start = acc;
      const end = acc + step.ms + 60;
      setTimeout(() => setStepStates(p => p.map((v, idx) => idx === i ? "running" : v)), start);
      setTimeout(() => setStepStates(p => p.map((v, idx) => idx === i ? "done"    : v)), end);
      acc = end + 80;
    });
    setTimeout(() => { setOutput(scenario.output); setRunning(false); }, acc + 200);
  }, []);

  // Start auto-play when section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasStartedRef.current) {
        hasStartedRef.current = true;
        setAutoPlaying(true);
        setTimeout(() => { autoIdxRef.current = 0; runScenario(SCENARIOS[0]); }, 800);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [runScenario]);

  // Auto-cycle through scenarios after each one finishes
  useEffect(() => {
    if (!autoPlaying || running || !selected) return;
    const timer = setTimeout(() => {
      autoIdxRef.current = (autoIdxRef.current + 1) % SCENARIOS.length;
      runScenario(SCENARIOS[autoIdxRef.current]);
    }, 2000);
    return () => clearTimeout(timer);
  }, [running, autoPlaying, selected, runScenario]);

  const handleClick = (scenario) => {
    if (running) return;
    setAutoPlaying(false);
    runScenario(scenario);
  };

  const current = SCENARIOS.find(s => s.id === selected);

  return (
    <section className="demo-section" ref={sectionRef}>
      <div className="demo-header">
        <span className="demo-header__label">INTERACTIVE DEMO</span>
        <h3 className="demo-header__title">{t("home.demo.title")}</h3>
        <p className="demo-header__subtitle">{t("home.demo.subtitle")}</p>
      </div>

      <div className="demo-scenarios">
        {SCENARIOS.map(s => (
          <button
            key={s.id}
            onClick={() => handleClick(s)}
            disabled={running}
            className={`scenario-btn scenario-btn--${s.accent}${selected === s.id ? " active" : ""}`}
          >
            <span className="scenario-btn__icon">{s.icon}</span>
            {s.label}
          </button>
        ))}
      </div>
      <p className="demo-hint">{t("home.demo.hint")}</p>

      <div className={`demo-terminal${selected ? " visible" : ""}`}>
        {!selected ? (
          <p className="demo-terminal__placeholder">
            <span className="blink">_</span> {t("home.demo.placeholder")}
          </p>
        ) : (
          <>
            <div className="demo-terminal__bar">
              <div className="demo-terminal__dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <span className="demo-terminal__name">{current?.icon} {current?.label}</span>
              <span className="demo-terminal__status">
                {running ? <span className="status-running">● running</span> : output ? <span className="status-done">● done</span> : ""}
              </span>
            </div>

            <div className="demo-terminal__steps">
              {current?.steps.map((step, i) => (
                <div key={i} className={`demo-step demo-step--${stepStates[i] || "pending"}`}>
                  <span className="demo-step__icon">
                    {stepStates[i] === "done" ? "✓" : stepStates[i] === "running" ? "⟳" : "○"}
                  </span>
                  <span className="demo-step__label">{step.label}</span>
                  <span className="demo-step__right">
                    {stepStates[i] === "running" && <span className="demo-step__running">processing…</span>}
                    {stepStates[i] === "done" && (
                      <>
                        <span className="demo-step__detail">{step.detail}</span>
                        <span className="demo-step__ms">{step.ms}ms</span>
                      </>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {output && (
              <div className="demo-terminal__output">
                <span className="demo-output__label">▶ OUTPUT</span>
                <pre className="demo-output__code">{output}</pre>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

// ── Home (main export) ────────────────────────────────────────────
const TECH = [
  {
    key: "automation",
    icons: [
      { src: N8NIcon,                                       alt: "N8N",        label: "N8N",        cls: "ext" },
      { src: OpenAIIcon,                                   alt: "OpenAI",     label: "OpenAI",     cls: "ext" },
      { src: SupabaseIcon,                                  alt: "Supabase",   label: "Supabase",   cls: "ext" },
      { src: JavaScriptIcon,                              alt: "JavaScript", label: "JavaScript"             },
    ],
  },
  {
    key: "backend",
    icons: [
      { src: NodeJSIcon,                                   alt: "Node.js",    label: "Node.js"                },
      { src: TypeScriptIcon,                               alt: "TypeScript", label: "TypeScript"             },
      { src: ReactJSIcon,                                  alt: "React",      label: "React"                  },
      { src: MongoDBIcon,                                  alt: "MongoDB",    label: "MongoDB"                },
      { src: GraphQLIcon,                                  alt: "GraphQL",    label: "GraphQL"                },
      { src: PostgreSQLIcon,                               alt: "PostgreSQL", label: "PostgreSQL", cls: "lg"  },
    ],
  },
  {
    key: "infra",
    icons: [
      { src: AWSIcon,                                         alt: "AWS",      label: "AWS",        cls: "ext" },
      { src: GrafanaIcon,                                    alt: "Grafana",  label: "Grafana"               },
      { src: DataDogIcon,                                    alt: "Datadog",  label: "Datadog",  cls: "lg"   },
      { src: ZabbixIcon,                                     alt: "Zabbix",   label: "Zabbix",   cls: "lg"   },
      { src: GitIcon,                                        alt: "Git",      label: "Git"                   },
    ],
  },
];

export default function Home() {
  const { t } = useTranslation();
  const subtitle = t("home.subtitle");
  const [displayedText, setDisplayedText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    setDisplayedText(""); setTypingDone(false);
    let i = 0;
    const iv = setInterval(() => {
      if (i < subtitle.length) { setDisplayedText(subtitle.slice(0, i + 1)); i++; }
      else { setTypingDone(true); clearInterval(iv); }
    }, 38);
    return () => clearInterval(iv);
  }, [subtitle]);

  return (
    <div className="home-page">

      {/* ── Hero ── */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <HeroStats />

            <div className="currently-building">
              <span className="currently-building__dot" />
              {t("home.currentlyBuilding")}
            </div>

            <h1 className="home-title">
              <Trans i18nKey="home.title" components={{ highlight: <span className="name-highlight" /> }} />
            </h1>

            <h2 className="home-subtitle">
              <span>{displayedText}</span>
              <span className={`typewriter-cursor${typingDone ? " done" : ""}`}>|</span>
            </h2>

            <p className="home-tagline">{t("home.tagline")}</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.6 }}>
            <ul className="highlights">
              {[1, 2, 3, 4].map(n => (
                <li key={n}><span className="highlight-icon">▹</span>{t(`home.highlights.item${n}`)}</li>
              ))}
            </ul>

            <div className="action-section">
              <a href="/curriculo-joao-pedro-guimaraes-da-silva.pdf" download="curriculo-joao-pedro-guimaraes.pdf" className="cta-button">
                {t("home.button")}
              </a>
              <div className="social-links">
                <a href="https://github.com/jaoguimaraes"                      target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="GitHub">   <FiGithub />   </a>
                <a href="https://www.linkedin.com/in/joao-guimaraes-silva/"    target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="LinkedIn"> <FiLinkedin /> </a>
                <a href="https://api.whatsapp.com/send?phone=5512981800280"    target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="WhatsApp"> <FaWhatsapp /> </a>
                <a href="mailto:jaaonzin.sjc@gmail.com"                        target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Email">    <FiMail />     </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero-right">
          <AutomationDemo />
        </div>

        <ScrollIndicator />
      </section>

      {/* ── Tech Stack ── */}
      <motion.section
        className="tech-stack-section"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.8 }}
      >
        <h3 className="tech-title">{t("home.technologies")}</h3>
        <div className="tech-categories">
          {TECH.map(cat => (
            <div key={cat.key} className="tech-category">
              <h4 className="tech-category-label">{t(`home.techCategories.${cat.key}`)}</h4>
              <div className="tech-icons-row">
                {cat.icons.map(icon => (
                  <div key={icon.alt} className="tech-icon">
                    <img src={icon.src} alt={icon.alt} className={icon.cls || ""} />
                    <span>{icon.label}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

    </div>
  );
}
