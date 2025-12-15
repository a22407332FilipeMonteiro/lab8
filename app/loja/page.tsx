'use client'

import React from 'react'
import useSWR from 'swr'
import { Product } from '@/models/interfaces'
import { ProdutoCard } from '@/components/ProdutoCard'
import { useCarrinho } from '@/contexts/CarrinhoContext'

export default function LojaPage() {

  //
  // A. Gestão de Estados
  const { carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho } = useCarrinho()


  //
  // B. Fetch de Dados
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<Product[], Error>(
    'https://deisishop.pythonanywhere.com/products/',
    fetcher
  )


  //
  // C. Transformação/processamento de Dados
  const produtosTransformados = data?.map(p => ({
    ...p,
    precoFormatado: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
  })) || []

  const produtosNoCarrinho = data?.filter(p => carrinho.includes(p.id)) || []
  const totalPreco = produtosNoCarrinho.reduce((acc, p) => {
    const preco = typeof p.price === 'string' ? parseFloat(p.price) : p.price
    return acc + preco
  }, 0)


  //
  // D. Funções utilitárias
  function toggleItemEmCarrinho(id: number) {
    if (carrinho.includes(id)) {
      removerDoCarrinho(id)
    } else {
      adicionarAoCarrinho(id)
    }
  }


  //
  // E. Handlers (interação do utilizador)
  // (handlers acima)


  //
  // F. Efeitos
  // (Context gerencia localStorage)


  //
  // G. Renderização
  if (error) return <div className="p-4 text-red-600">Erro ao carregar produtos</div>
  if (isLoading) return <div className="p-4 text-gray-600">Carregando produtos...</div>
  if (!data) return <div className="p-4 text-gray-600">Sem dados!</div>

  return (
    <main className="min-h-screen bg-gray-50">
      
      {/* Cabeçalho */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold">DEISI Shop</h1>
          <p className="text-gray-600 text-sm">Bem-vindo à nossa loja</p>
        </div>
      </header>

      {/* Lista de Produtos */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Produtos Disponíveis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {produtosTransformados.map(p => (
            <div key={p.id} className="relative">
              <ProdutoCard produto={p} />
              <button
                onClick={() => toggleItemEmCarrinho(p.id)}
                className={`absolute top-2 right-2 px-3 py-1 rounded text-sm font-semibold transition ${
                  carrinho.includes(p.id)
                    ? 'bg-red-500 text-white'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {carrinho.includes(p.id) ? '✓ Remover' : '+ Carrinho'}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Carrinho */}
      <section className="bg-white mt-8 py-8 border-t-2">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">
            🛒 Carrinho ({carrinho.length} itens)
          </h2>

          {carrinho.length === 0 ? (
            <p className="text-gray-600 text-center py-8">O carrinho está vazio</p>
          ) : (
            <>
              {/* Lista de Produtos no Carrinho */}
              <div className="grid gap-4 mb-6">
                {produtosNoCarrinho.map(produto => {
                  const preco = typeof produto.price === 'string' ? parseFloat(produto.price) : produto.price
                  return (
                    <div key={produto.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{produto.title}</h3>
                        <p className="text-gray-600 text-sm">{produto.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600 text-xl mb-2">{preco.toFixed(2)} €</p>
                        <button
                          onClick={() => removerDoCarrinho(produto.id)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Total e Ações */}
              <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Total:</h3>
                  <p className="text-3xl font-bold text-blue-600">{totalPreco.toFixed(2)} €</p>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={limparCarrinho}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-semibold"
                  >
                    Limpar Carrinho
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                    Proceder ao Pagamento
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

    </main>
  )
}
