// src/components/DescricaoProjetos.tsx (ou .jsx)
import { Projeto } from './Projeto';

export function DescricaoProjetos() {
  return (
    <section>
      <h2>Os meus projetos</h2>

      <p>
        Ao longo da unidade curricular desenvolvi vários projetos em HTML, CSS e
        JavaScript, incluindo uma loja online e um site com JavaScript
        interativo, entre outros.
      </p>

      <p>
        Podes ver todos os meus projetos na minha página do GitHub Pages:{' '}
        <a
          href="https://github.com/a22407332FilipeMonteiro/lab8"
          target="_blank"
          rel="noreferrer"
        >
          GitHub Pages
        </a>.
      </p>

      <h3>Alguns exemplos:</h3>
      <ul>
        <Projeto
          nome="Loja Online"
          url="https://a22407332filipemonteiro.github.io/lab7/index.html"
        />
        <Projeto
          nome="Site com JavaScript Interativo"
          url="https://a22407332filipemonteiro.github.io/"
        />
      </ul>
    </section>
  );
}
