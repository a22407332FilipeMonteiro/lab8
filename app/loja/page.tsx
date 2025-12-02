import Link from 'next/link';
import produtos from '@/app/data/produtos.json';

export default function LojaPage() {
  return (
    <>
      <h2>Produtos DEISIshop</h2>
      <ul className="list-none p-0">
        {produtos.map((produto) => (
          <li key={produto.id} className="mb-4">
            <Link href={`/loja/${produto.id}`}>
              <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer">
                <div className="w-24 h-24 bg-gray-100 rounded shrink-0 flex items-center justify-center">
                  <img
                    src={produto.image}
                    alt={produto.title}
                    className="object-contain w-20 h-20"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{produto.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{produto.description.substring(0, 100)}...</p>
                  <div className="flex items-center justify-between">
                    <p className="text-blue-600 font-bold">${produto.price.toFixed(2)}</p>
                    <div className="text-sm text-gray-600">
                      ⭐ {produto.rating.rate} ({produto.rating.count})
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
