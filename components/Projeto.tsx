type ProjetoProps = {
  nome: string;
  url: string;
};


export function Projeto({ nome, url } : ProjetoProps) {
  return (
    <li>
      <p>
        Um dos meus projetos é <strong>{nome}</strong>. Podes vê-lo em{" "}
        <a href={url} target="_blank" rel="noreferrer">
          {url}
        </a>.
      </p>
    </li>
  );
}
