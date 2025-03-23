import React from "react";
import Image from "../images/2024-5.png";
import GitHubIcon from "../images/icons/github.png";
import GitIcon from "../images/icons/git.png";
import GraphQLIcon from "../images/icons/graphql.png";
import JavaScriptIcon from "../images/icons/javascript.png";
import MongoDBIcon from "../images/icons/mongodb.png";
import NodeJSIcon from "../images/icons/nodejs.png";
import TypeScriptIcon from "../images/icons/typescript.png";
import "../Styles/Home.css";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section>
      <div>
        <h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Olá, eu sou <br /> João Pedro
          </motion.div>
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          <p>Desenvolvedor backend</p>
        </motion.div>
      </div>

      <div className="image">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2.5 }}
        >
          <img
            src={Image}
            alt="Imagem 1"
            style={{ width: "80%", borderRadius: "250px" }}
          />
        </motion.div>
      </div>
      <div className="icons">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          src={GitIcon}
          alt="Git"
        />
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.6, duration: 1 }}
          src={GitHubIcon}
          alt="GitHub"
        />
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.7, duration: 1 }}
          src={GraphQLIcon}
          alt="GraphQL"
        />
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8, duration: 1 }}
          src={JavaScriptIcon}
          alt="JavaScript"
        />
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.9, duration: 1 }}
          src={MongoDBIcon}
          alt="MongoDB"
        />
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.0, duration: 1 }}
          src={NodeJSIcon}
          alt="Node.js"
        />
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.1, duration: 1 }}
          src={TypeScriptIcon}
          alt="TypeScript"
        />
      </div>
    </section>
  );
}

/*Ideias para fazer aqui:
- Uma foto minha atual e bem legal, grande, por cima do fundo
- Texto como: "EU SOU JOÃO PEDRO
Sou desenvolvedor web (onde esta frase e o meu nome estarão em fontes diferents e legais)"
- Quantos anos em contato com a tecnologia + quantos anos em contato com desenvolvimento
- Minhas redes sociais (linkedIn, GitHub, WhatsApp)
- Botão para download do meu currículo diretamente
*/
