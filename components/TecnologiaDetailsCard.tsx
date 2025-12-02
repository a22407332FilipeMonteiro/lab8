import Image from 'next/image';
import React from 'react';
import ContadorPersonalizado from './ContadorPersonalizado';

interface TecnologiaDetailsCardProps {
  title: string;
  image: string;
  description: string;
  rating: number;
}

export const TecnologiaDetailsCard: React.FC<TecnologiaDetailsCardProps> = ({
  title,
  image,
  description,
  rating,
}) => {
  return (
    <article className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
      <div className="flex flex-col items-center gap-6">
        {/* Imagem */}
        <div className="w-40 h-40 flex items-center justify-center bg-gray-100 rounded-lg">
          <Image
            src={`/tecnologias/${image}`}
            alt={`Logotipo do ${title}`}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>

        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-700">Nível:</span>
          <span className="text-2xl">{'⭐'.repeat(rating)}</span>
          <span className="text-sm text-gray-600">({rating}/5)</span>
        </div>

        {/* Descrição */}
        <p className="text-gray-700 text-center leading-relaxed text-lg">
          {description}
        </p>
        <div className="mt-4">
          <ContadorPersonalizado title={title} />
        </div>
      </div>
    </article>
  );
};
