import Link from 'next/link';
import Image from 'next/image';
import produtos from '../data/produtos.json';

export default function Page() {
  // Get unique categories
  const categories = [...new Set(produtos.map(p => p.category))];

  // Placeholder logos for categories (replace with actual logo URLs)
  const categoryLogos: { [key: string]: string } = {
    'T-shirts': 'https://via.placeholder.com/100?text=T-Shirt',
    'Canecas': 'https://via.placeholder.com/100?text=Mug',
    'Meias': 'https://via.placeholder.com/100?text=Socks',
  };

  return (
    <>
      <h2>Categorias</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {categories.map(category => (
          <Link key={category} href={`/categorias/${encodeURIComponent(category)}`}>
            <div style={{ border: '1px solid #ccc', padding: '10px', cursor: 'pointer' }}>
              <Image
                src={categoryLogos[category] || '/default-logo.png'}
                alt={category}
                width={100}
                height={100}
              />
              <h3>{category}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}