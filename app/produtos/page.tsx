'use client'

import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { Product } from '@/models/interfaces'
import { ProdutoCard } from '@/components/ProdutoCard'
import { useCarrinho } from '@/contexts/CarrinhoContext'
import { HistoricoPesquisas } from '@/components/HistoricoPesquisas'

// Interface para a resposta da API de compra
interface RespostaCompra {
  totalCost?: string
  reference?: string
  message?: string
  error?: string
}

export default function ProdutosPage() {

  //
  // A. Gestão de Estados
  const { carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho } = useCarrinho()
  const [search, setSearch] = useState('')
  const [filteredData, setFilteredData] = useState<Product[]>([])
  const [ordenacao, setOrdenacao] = useState('')
  const [estudante, setEstudante] = useState(false)
  const [cupao, setCupao] = useState('')
  const [nome, setNome] = useState('')
  const [respostaCompra, setRespostaCompra] = useState<RespostaCompra | null>(null)
  const [comprando, setComprando] = useState(false)


  //
  // B. Fetch de Dados
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<Product[], Error>(
    'https://deisishop.pythonanywhere.com/products/',
    fetcher
  )


  //
  // C. Efeitos
  useEffect(() => {
    if (!data) {
      setFilteredData([])
      return
    }

    // 1. Filtrar por pesquisa
    let resultado = data
    if (search.trim() !== '') {
      resultado = data.filter(produto =>
        produto.title.toLowerCase().includes(search.toLowerCase())
      )
    }

    // 2. Ordenar
    if (ordenacao) {
      resultado = [...resultado].sort((a, b) => {
        const precoA = typeof a.price === 'string' ? parseFloat(a.price) : a.price
        const precoB = typeof b.price === 'string' ? parseFloat(b.price) : b.price

        switch (ordenacao) {
          case 'nome-asc':
            return a.title.localeCompare(b.title)
          case 'nome-desc':
            return b.title.localeCompare(a.title)
          case 'preco-asc':
            return precoA - precoB
          case 'preco-desc':
            return precoB - precoA
          default:
            return 0
        }
      })
    }

    setFilteredData(resultado)
  }, [search, data, ordenacao])


  //
  // D. Transformação/processamento de Dados
  const produtosTransformados = filteredData.map(p => ({
    ...p,
    precoFormatado: typeof p.price === 'string' ? parseFloat(p.price) : p.price,
  }))

  const produtosNoCarrinho = data?.filter(p => carrinho.includes(p.id)) || []
  
  // Cálculo do total SEM desconto
  const totalSemDesconto = produtosNoCarrinho.reduce((acc, p) => {
    const preco = typeof p.price === 'string' ? parseFloat(p.price) : p.price
    return acc + preco
  }, 0)

  // Desconto de estudante (10%)
  const descontoEstudante = estudante ? totalSemDesconto * 0.25 : 0

  // Verificar se cupão é válido (DEISI - case insensitive)
  const cupaoValido = cupao.toLowerCase() === 'deisi'

  // Desconto do cupão (25% sobre o valor após desconto de estudante)
  const totalAposEstudante = totalSemDesconto - descontoEstudante
  const descontoCupao = cupaoValido ? totalAposEstudante * 0.25 : 0

  // Total final
  const totalFinal = totalAposEstudante - descontoCupao


  //
  // E. Funções utilitárias
  function toggleItemEmCarrinho(id: number) {
    if (carrinho.includes(id)) {
      removerDoCarrinho(id)
    } else {
      adicionarAoCarrinho(id)
    }
  }


  //
  // F. Handlers (interação do utilizador)
  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value)
  }

  function handleOrdenacaoChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setOrdenacao(e.target.value)
  }

  function handleEstudanteChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEstudante(e.target.checked)
  }

  function handleCupaoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCupao(e.target.value)
  }

  function handleNomeChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNome(e.target.value)
  }

  async function handleComprar() {
    if (carrinho.length === 0) {
      alert('O carrinho está vazio!')
      return
    }

    if (nome.trim() === '') {
      alert('Por favor, insira o seu nome!')
      return
    }

    setComprando(true)
    setRespostaCompra(null)

    try {
      const response = await fetch('https://deisishop.pythonanywhere.com/buy/', {
        method: 'POST',
        body: JSON.stringify({
          products: carrinho,
          student: estudante,
          coupon: cupao,
          name: nome,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(response.statusText)
      }

      const data = await response.json()
      setRespostaCompra(data)
      limparCarrinho()
      
    } catch (error) {
      console.log('Erro ao comprar:', error)
      setRespostaCompra({ error: 'Erro ao processar a compra. Tente novamente.' })
    } finally {
      setComprando(false)
    }
  }


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

      {/* Pesquisa e Ordenação */}
      <section className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row gap-4">
          
          {/* Input de Pesquisa */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Pesquisar produtos..."
              value={search}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
                  
          </div>

          {/* Select de Ordenação */}
          <select
            value={ordenacao}
            onChange={handleOrdenacaoChange}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          >
            <option value="">Ordenar por...</option>
            <option value="nome-asc">Nome (A-Z)</option>
            <option value="nome-desc">Nome (Z-A)</option>
            <option value="preco-asc">Preço (menor primeiro)</option>
            <option value="preco-desc">Preço (maior primeiro)</option>
            
          </select>

        </div>

        {search && (
          <p className="text-sm text-gray-500 mt-2">
            {filteredData.length} produto(s) encontrado(s) para "{search}"
          </p>
        )}
      </section>

      {/* Lista de Produtos */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Produtos Disponíveis</h2>
        
        {filteredData.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            Nenhum produto encontrado para "{search}"
          </p>
        ) : (
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
        )}
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

              {/* Opções de Compra */}
              <div className="bg-gray-50 rounded-lg border p-6 mb-6">
                <h3 className="text-lg font-semibold mb-4">Dados de Compra</h3>
                
                {/* Input Nome */}
                <div className="mb-4">
                  <label htmlFor="nome" className="block text-gray-700 mb-2">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    placeholder="Insira o seu nome..."
                    value={nome}
                    onChange={handleNomeChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Checkbox Estudante */}
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="estudante"
                    checked={estudante}
                    onChange={handleEstudanteChange}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="estudante" className="text-gray-700">
                    Sou estudante DEISI (25% desconto)
                  </label>
                </div>

                {/* Input Cupão */}
                <div>
                  <label htmlFor="cupao" className="block text-gray-700 mb-2">
                    Cupão de desconto
                  </label>
                  <input
                    type="text"
                    id="cupao"
                    placeholder="Insira o código do cupão..."
                    value={cupao}
                    onChange={handleCupaoChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      cupao && (cupaoValido ? 'border-green-500 bg-green-50' : 'border-gray-300')
                    }`}
                  />
                  {cupao && cupaoValido && (
                    <p className="text-green-600 text-sm mt-1">✓ Cupão válido! 25% de desconto aplicado.</p>
                  )}
                  {cupao && !cupaoValido && (
                    <p className="text-red-500 text-sm mt-1">✗ Cupão inválido.</p>
                  )}
                </div>
              </div>

              {/* Total e Ações */}
              <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
                
                {/* Subtotal */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="text-gray-600">{totalSemDesconto.toFixed(2)} €</span>
                </div>

                {/* Desconto Estudante */}
                {estudante && (
                  <div className="flex justify-between items-center mb-2 text-green-600">
                    <span>Desconto estudante (10%):</span>
                    <span>- {descontoEstudante.toFixed(2)} €</span>
                  </div>
                )}

                {/* Desconto Cupão */}
                {cupaoValido && (
                  <div className="flex justify-between items-center mb-2 text-green-600">
                    <span>Desconto cupão DEISI (25%):</span>
                    <span>- {descontoCupao.toFixed(2)} €</span>
                  </div>
                )}

                {/* Total Final */}
                <div className="flex justify-between items-center mb-6 pt-4 border-t border-blue-200">
                  <h3 className="text-2xl font-bold">Total:</h3>
                  <p className="text-3xl font-bold text-blue-600">{totalFinal.toFixed(2)} €</p>
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={limparCarrinho}
                    className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-semibold"
                  >
                    Limpar Carrinho
                  </button>
                  <button
                    onClick={handleComprar}
                    disabled={comprando}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {comprando ? 'A processar...' : '💳 Comprar'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Resposta da Compra */}
          {respostaCompra && (
            <div className={`mt-6 p-6 rounded-lg ${respostaCompra.error ? 'bg-red-50 border-2 border-red-200' : 'bg-green-50 border-2 border-green-200'}`}>
              {respostaCompra.error ? (
                <div className="text-red-700">
                  <h3 className="text-xl font-bold mb-2">❌ Erro na Compra</h3>
                  <p>{respostaCompra.error}</p>
                </div>
              ) : (
                <div className="text-green-700">
                  <h3 className="text-xl font-bold mb-2">✅ Compra Realizada com Sucesso!</h3>
                  {respostaCompra.message && <p className="mb-2">{respostaCompra.message}</p>}
                  {respostaCompra.reference && (
                    <p className="mb-2">Referência: <span className="font-mono font-bold">{respostaCompra.reference}</span></p>
                  )}
                  {respostaCompra.totalCost && (
                    <p className="text-2xl font-bold">Total pago: {respostaCompra.totalCost} €</p>
                  )}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

    </main>
  )
}