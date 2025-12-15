import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/models/interfaces'
import { useCarrinho } from '@/contexts/CarrinhoContext'

interface ProdutoDetalheProps {
  produto: Product
}

export function ProdutoDetalhe({ produto }: ProdutoDetalheProps) {

  //
  // A. Gestão de Estados
  const { carrinho, adicionarAoCarrinho, removerDoCarrinho } = useCarrinho()
  const estaNoCarrinho = carrinho.includes(produto.id)


  //
  // B. Transformação de Dados
  const imagemAbsoluta = produto.image.startsWith('http')
    ? produto.image
    : `https://deisishop.pythonanywhere.com${produto.image}`

  const preco = typeof produto.price === 'string'
    ? parseFloat(produto.price)
    : produto.price


  //
  // C. Handlers
  function handleToggleCarrinho() {
    if (estaNoCarrinho) {
      removerDoCarrinho(produto.id)
    } else {
      adicionarAoCarrinho(produto.id)
    }
  }


  //
  // D. Renderização
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* Botão Voltar */}
      <Link
        href="/produtos"
        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Voltar à lista de produtos
      </Link>

      {/* Card de Detalhe */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">

          {/* Imagem */}
          <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
            <Image
              src={imagemAbsoluta}
              alt={produto.title}
              width={400}
              height={400}
              className="object-contain max-h-96"
              priority
            />
          </div>

          {/* Informações */}
          <div className="md:w-1/2 p-8">

            {/* Categoria */}
            <p className="text-sm text-blue-600 uppercase tracking-wide font-semibold mb-2">
              {produto.category}
            </p>

            {/* Título */}
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {produto.title}
            </h1>

            {/* Rating */}
            {produto.rating && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-500 text-xl">⭐</span>
                <span className="font-semibold">{produto.rating.rate}</span>
                <span className="text-gray-500">({produto.rating.count} avaliações)</span>
              </div>
            )}

            {/* Descrição */}
            <p className="text-gray-600 mb-6 leading-relaxed">
              {produto.description}
            </p>

            {/* Preço */}
            <p className="text-4xl font-bold text-blue-600 mb-6">
              {preco.toFixed(2)} €
            </p>

            {/* Botão Adicionar/Remover do Carrinho */}
            <button
              onClick={handleToggleCarrinho}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition ${
                estaNoCarrinho
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {estaNoCarrinho ? '✓ Remover do Carrinho' : '+ Adicionar ao Carrinho'}
            </button>

          </div>
        </div>
      </div>

      {/* Informações Adicionais */}
      <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-xl font-bold mb-4">Detalhes do Produto</h2>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">ID do Produto:</span>
            <span className="ml-2 font-semibold">{produto.id}</span>
          </div>
          <div>
            <span className="text-gray-500">Categoria:</span>
            <span className="ml-2 font-semibold">{produto.category}</span>
          </div>
          {produto.rating && (
            <>
              <div>
                <span className="text-gray-500">Avaliação:</span>
                <span className="ml-2 font-semibold">{produto.rating.rate} / 5</span>
              </div>
              <div>
                <span className="text-gray-500">Nº de Avaliações:</span>
                <span className="ml-2 font-semibold">{produto.rating.count}</span>
              </div>
            </>
          )}
        </div>
      </div>

    </div>
  )
}