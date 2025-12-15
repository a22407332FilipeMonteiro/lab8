'use client'

import React from 'react'
import useSWR from 'swr'
import { useParams } from 'next/navigation'
import { Product } from '@/models/interfaces'
import { ProdutoDetalhe } from '@/components/ProdutoDetalhe'

export default function ProdutoDetalhePage() {

  //
  // A. Gestão de Estados
  const params = useParams()
  const id = params.id as string


  //
  // B. Fetch de Dados
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, error, isLoading } = useSWR<Product, Error>(
    `https://deisishop.pythonanywhere.com/products/${id}`,
    fetcher
  )


  //
  // C. Renderização
  if (error) return <div className="p-4 text-red-600">Erro ao carregar produto</div>
  if (isLoading) return <div className="p-4 text-gray-600">Carregando produto...</div>
  if (!data) return <div className="p-4 text-gray-600">Produto não encontrado</div>

  return (
    <main className="min-h-screen bg-gray-50">
      <ProdutoDetalhe produto={data} />
    </main>
  )
}