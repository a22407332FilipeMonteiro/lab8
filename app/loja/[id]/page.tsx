import Link from 'next/link';
import produtos from '@/app/data/produtos.json';
import ProdutoDetalheClient from './produto-cliente';

interface ProdutoDetalhePage {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProdutoDetalhePage({ params }: ProdutoDetalhePage) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);

  const produto = produtos.find((p) => p.id === id);

  if (!produto) {
    return (
      <main className="p-6">
        <h1 className="text-2xl font-bold text-red-600">Produto não encontrado</h1>
        <Link href="/loja" className="text-blue-600 underline mt-4 inline-block">
          ← Voltar à loja
        </Link>
      </main>
    );
  }

  return (
    <ProdutoDetalheClient produtoData={JSON.stringify(produto)} />
  );
}
