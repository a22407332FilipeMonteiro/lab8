import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/models/interfaces'

interface ProdutoCardProps {
  produto: Product
}

export function ProdutoCard({ produto }: ProdutoCardProps) {

  //
  // A. Gestão de Estados
  // (nenhum estado local necessário)


  //
  // B. Fetch de Dados
  // (dados recebidos via props)


  //
  // C. Transformação/processamento de Dados
  const imagemAbsoluta = produto.image.startsWith('http')
    ? produto.image
    : `https://deisishop.pythonanywhere.com${produto.image}`

  const preco = typeof produto.price === 'string' 
    ? parseFloat(produto.price) 
    : produto.price


  //
  // D. Funções utilitárias
  // (nenhuma função necessária)


  //
  // E. Handlers (interação do utilizador)
  // (handlers geridos pelo componente pai)


  //
  // F. Efeitos
  // (nenhum efeito necessário)


  //
  // G. Renderização
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col">
      
      {/* Imagem */}
      <div className="relative w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
        <Image
          src={imagemAbsoluta}
          alt={produto.title}
          width={200}
          height={200}
          className="object-contain w-full h-full"
          priority={false}
        />
      </div>

      {/* Conteúdo */}
      <div className="p-4 flex-1 flex flex-col">
        
        {/* Título */}
        <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
          {produto.title}
        </h3>
        
        {/* Categoria */}
        <p className="text-xs text-gray-500 mt-1 mb-2 uppercase tracking-wide">
          {produto.category}
        </p>

        {/* Descrição */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {produto.description.substring(0, 80)}...
        </p>

        {/* Preço e Rating */}
        <div className="mt-auto">
          <p className="text-xl font-bold text-blue-600">
            {preco.toFixed(2)} €
          </p>
          {produto.rating && (
            <p className="text-sm text-yellow-600 mt-1">
              ⭐ {produto.rating.rate} ({produto.rating.count} avaliações)
            </p>
          )}
        </div>

        {/* Botão +Info */}
        <Link
          href={`/produtos/${produto.id}`}
          className="mt-4 block text-center bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition font-medium"
        >
          + Info
        </Link>
      </div>
    </div>
  )
}