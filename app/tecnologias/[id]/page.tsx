import Link from 'next/link';
import tecnologias from '@/app/data/tecnologias.json';
import { TecnologiaDetailsCard } from '@/components/TecnologiaDetailsCard';

interface TecnologiaPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TecnologiaPage({ params }: TecnologiaPageProps) {
  const { id: idStr } = await params;
  const id = parseInt(idStr, 10);

  // Validar se o ID é válido
  if (isNaN(id) || id < 0 || id >= tecnologias.length) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Tecnologia não encontrada</h1>
          <p className="text-gray-600 mt-2">O ID fornecido é inválido.</p>
          <Link
            href="/tecnologias"
            className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Voltar às Tecnologias
          </Link>
        </div>
      </main>
    );
  }

  const tecnologia = tecnologias[id];

  return (
    <main className="container mx-auto px-4 py-8">
      <Link
        href="/tecnologias"
        className="inline-block mb-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        ← Voltar
      </Link>

      <TecnologiaDetailsCard
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
      />
    </main>
  );
}
