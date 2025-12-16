import { useEffect, useState } from 'react';


export default function ProdutoFavorito({ produtoId }: { produtoId: number }) {
  const [isFavorito, setIsFavorito] = useState(false);

  
  useEffect(() => {
    const favoritos = localStorage.getItem('favoritos');
    if (favoritos) {
      const listaFavoritos = JSON.parse(favoritos);
      setIsFavorito(listaFavoritos.includes(produtoId));
    }
  }, []); 


  useEffect(() => {
    const favoritos = localStorage.getItem('favoritos');
    let listaFavoritos = favoritos ? JSON.parse(favoritos) : [];

    if (isFavorito) {
      
      if (!listaFavoritos.includes(produtoId)) {
        listaFavoritos.push(produtoId);
      }
    } else {
      
      listaFavoritos = listaFavoritos.filter((id: number) => id !== produtoId);
    }

    localStorage.setItem('favoritos', JSON.stringify(listaFavoritos));
  }, [isFavorito, produtoId]); 

  return (
    <button
      onClick={() => setIsFavorito(!isFavorito)}
      className="text-2xl"
    >
      {isFavorito ? '❤️' : '🤍'}
    </button>
  );
}