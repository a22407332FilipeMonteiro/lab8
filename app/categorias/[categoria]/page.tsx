import { notFound } from 'next/navigation';
import produtos from '../../data/produtos.json';
import { ProdutoCard } from '@/components/ProdutoCard';

interface PageProps {
  params: Promise<{
    categoria: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { categoria } = await params;
  const decodedCategoria = decodeURIComponent(categoria);

  // Filter products by category
  const categoryProducts = produtos.filter(p => p.category === decodedCategoria);

  if (categoryProducts.length === 0) {
    notFound();
  }

  return (
    <>
      <h2>Produtos da categoria: {decodedCategoria}</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {categoryProducts.map(produto => (
          <ProdutoCard key={produto.id} produto={produto} />
        ))}
      </div>
    </>
  );
}