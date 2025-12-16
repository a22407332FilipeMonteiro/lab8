import { useEffect, useState } from "react";
import { Product } from '@/models/interfaces'

interface ProdutoCardProps {
  produto: Product
}

export function HistoricoPesquisas({produto}: ProdutoCardProps) {
    const [pesquisa, setPesquisa] = useState('');
    const [historico, setHistorico] = useState<string[]>([]); 

    
    useEffect(() => {
        const historicoSalvo = localStorage.getItem('historicoPesquisas');
        if (historicoSalvo) {
            setHistorico(JSON.parse(historicoSalvo));
        }
    }, []); 

    useEffect(() => {
        localStorage.setItem('historicoPesquisas', JSON.stringify(historico));
    }, [historico]);



    const handlePesquisa = (termo: string) => {
    if (!termo.trim()) return;


    const imagemAbsoluta = produto.image.startsWith('http')
    ? produto.image
    : `https://deisishop.pythonanywhere.com${produto.image}`

    const preco = typeof produto.price === 'string' 
    ? parseFloat(produto.price) 
    : produto.price

   
    
    setHistorico(prev => {
      const novo = [termo, ...prev.filter(h => h !== termo)];
      return novo.slice(0, 5);
    });

    setPesquisa(termo);
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={pesquisa}
        onChange={(e) => setPesquisa(e.target.value)}
        placeholder="Pesquisar produtos..."
      />

      {historico.length > 0 && (
        <div className="mt-4">
          <p>Pesquisas recentes:</p>
          <div>
            {historico.map((termo, index) => (
              <button
                key={index}
                onClick={() => handlePesquisa(termo)}
                >
                {termo}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}