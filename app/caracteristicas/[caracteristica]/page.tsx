import Link from 'next/link';

interface CaracteristicaPageProps {
  params: {
    caracteristica: string;
  };
}

export default function CaracteristicaPage({ params }: CaracteristicaPageProps) {
  const caracteristica = decodeURIComponent(params.caracteristica);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white rounded-lg shadow p-8 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-center">
          Característica
        </h1>

        <p className="text-lg text-gray-800 text-center">
          {caracteristica}
        </p>

        <Link
          href="/caracteristicas"
          className="mt-4 inline-block px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          ← Voltar às características
        </Link>
      </div>
    </main>
  );
}
