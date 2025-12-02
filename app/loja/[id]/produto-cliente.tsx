"use client";

import Link from 'next/link';

interface ProdutoClienteProps {
  produtoData: string;
}

export default function ProdutoDetalheClient({ produtoData }: ProdutoClienteProps) {
  const produto = JSON.parse(produtoData);

  return (
    <main className="p-6">
      <Link href="/loja" className="text-blue-600 underline mb-4 inline-block">
        ← Voltar à loja
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Imagem */}
          <div className="flex items-center justify-center bg-gray-100 rounded-lg h-80">
            <img
              src={produto.image}
              alt={produto.title}
              className="object-contain max-w-xs max-h-80"
            />
          </div>

          {/* Detalhes */}
          <div>
            <h1 className="text-3xl font-bold mb-2">{produto.title}</h1>
            <p className="text-gray-600 mb-4">
              Categoria: <span className="font-semibold">{produto.category}</span>
            </p>

            <p className="text-gray-700 mb-4">{produto.description}</p>

            <div className="mb-4">
              <p className="text-sm text-gray-600">
                ⭐ Rating: {produto.rating.rate} / 5 ({produto.rating.count} avaliações)
              </p>
            </div>

            <p className="text-3xl font-bold text-blue-600 mb-6">
              ${produto.price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
