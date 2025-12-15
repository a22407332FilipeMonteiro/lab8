'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface CarrinhoContextType {
  carrinho: number[]
  adicionarAoCarrinho: (id: number) => void
  removerDoCarrinho: (id: number) => void
  limparCarrinho: () => void
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(undefined)

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
  const [carrinho, setCarrinho] = useState<number[]>([])

  // Carregar do localStorage
  useEffect(() => {
    const carrinhoLocal = localStorage.getItem('carrinho') || '[]'
    setCarrinho(JSON.parse(carrinhoLocal))
  }, [])

  // Guardar no localStorage
  useEffect(() => {
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
  }, [carrinho])

  const adicionarAoCarrinho = (id: number) => {
    setCarrinho(prev => 
      prev.includes(id) ? prev : [...prev, id]
    )
  }

  const removerDoCarrinho = (id: number) => {
    setCarrinho(prev => prev.filter(item => item !== id))
  }

  const limparCarrinho = () => {
    setCarrinho([])
  }

  return (
    <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext)
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider')
  }
  return context
}
