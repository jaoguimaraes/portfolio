import React from "react";
import Image from "../images/2024-5.png";

export default function About() {
  return (
    <section>
      <div>
        <h2>Eu sou João Pedro</h2>
        <p>Desenvolvedor backend</p>

        Estudante de Ciencias da Computação

        TI +10 anos | Desenvolvimento +1 ano
      </div>

      <div>
        <img
          src={Image}
          alt="Imagem 1"
          style={{ width: "45%", borderRadius: "10px" }}
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
