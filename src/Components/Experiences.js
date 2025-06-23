import React, { useState } from "react";
import "../Styles/Experiences.css";
import Image from "../images/CRUD-Api.jpeg";
import encrypt from "../images/encryption.jpeg";
import { FiExternalLink, FiChevronDown, FiChevronUp } from "react-icons/fi";

const Experiences = () => {
  const professionalExperiences = [
    {
      id: 1,
      company: "Primum",
      period: "Jan 2024 - Abr 2025",
      roles: ["Desenvolvimento full stack (Jan 2024 - Abr 2025)"],
      description: [
        "Como desenvolvedor full stack júnior, atuo com tecnologias como MongoDB, Node.js, React, TypeScript, GraphQL e APIs RESTful. Participo ativamente de treinamentos e sessões de pair programming com desenvolvedores mais experientes, o que tem acelerado meu desenvolvimento técnico. Tenho base sólida em metodologias ágeis, com foco no framework Scrum, conforme os aprendizados do livro Scrum Essencial: Um guia prático para o mais popular processo Ágil. No dia a dia, contribuo tanto com tarefas de backend quanto com demandas de frontend, utilizando React. Utilizamos Bitbucket para versionamento e Figma como referência para a padronização visual de componentes e interfaces",
      ],
    },
    {
      id: 2,
      company: "DM",
      period: "Out 2018 - Dez 2024",
      roles: [
        "NOC - Network Operations Center (Jan 2024 - Dez 2024)",
        "Analista de Sustentação II (Dez 2021 - Jun 2024)",
        "Analista de Suporte Junior (Out 2019 - Dez 2021)",
        "Consultor de Relacionamento N2 (Mar 2019 - Set 2019)",
        "Consultor de Relacionamento N1 (Out 2018 - Fev 2019)",
      ],
      description:
        "Atendimento a clientes corporativos, análise e resolução de incidentes de rede e sistemas. Promovido três vezes por desempenho excepcional. Participação ativa na liderança de equipe de suporte técnico com 5 membros. Criação de documentação técnica e treinamento de novos colaboradores.",
    },
    {
      id: 3,
      company: "Lansolution",
      period: "Mar 2015 - Set 2017",
      roles: ["Técnico de Informática (Mar 2015 - Set 2017)"],
      description:
        "Manutenção de hardware e software em computadores e notebooks. Instalação e configuração de redes locais. Atendimento ao cliente presencial e remoto. Gestão de estoque de peças e equipamentos.",
    },
  ];

  const projectExperiences = [
    {
      id: 1,
      name: "Jotawallet",
      image: Image,
      link: "https://github.com/jaoguimaraes/jotawallet",
      description:
        "Aplicativo de gestão financeira pessoal com dashboard intuitivo e relatórios customizáveis.",
    },
    {
      id: 2,
      name: "Text Encryption",
      image: encrypt,
      link: "https://github.com/jaoguimaraes/project-for-text-encryption",
      description:
        "Ferramenta para criptografia de textos usando algoritmos AES-256 com interface amigável.",
    },
  ];

  const [expandedCard, setExpandedCard] = useState(null);

  const toggleExpand = (id) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="experiences-container">
      <div className="experiences-grid">
        <div className="professional-experiences">
          <h2 className="section-title">Experiências Profissionais</h2>
          {professionalExperiences.map((exp) => (
            <div
              key={exp.id}
              className={`experience-card ${
                expandedCard === exp.id ? "expanded" : ""
              }`}
              onClick={() => toggleExpand(exp.id)}
            >
              <h3>{exp.company}</h3>
              <p className="period">{exp.period}</p>
              <div className="roles">
                {exp.roles.map((role, index) => (
                  <p key={index}>{role}</p>
                ))}
              </div>
              {expandedCard === exp.id && (
                <div className="expanded-content">
                  {Array.isArray(exp.description)
                    ? exp.description.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))
                    : exp.description
                        .split("\n")
                        .map((item, index) => <p key={index}>{item}</p>)}
                </div>
              )}
              <div className="expand-icon">
                {expandedCard === exp.id ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </div>
          ))}
        </div>

        <div className="project-experiences">
          <h2 className="section-title">Projetos Destacados</h2>
          {projectExperiences.map((project) => (
            <div key={project.id} className="project-card">
              <div
                className="project-image"
                style={{ backgroundImage: `url(${project.image})` }}
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
                Ver Projeto
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiences;
