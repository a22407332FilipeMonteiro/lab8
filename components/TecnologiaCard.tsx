import React from "react";

interface TecnologiaCardProps {
  title: string;
  image: string; // URL da imagem (local ou remota)
}

export const TecnologiaCard: React.FC<TecnologiaCardProps> = ({ title, image }) => {
  return (
    <div className="w-48 h-60 bg-slate-800 rounded-xl shadow-md p-4 m-2 flex flex-col items-center justify-between hover:shadow-lg transition-shadow">
      <div className="flex-1 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-20 h-20 object-contain"
        />
      </div>

      <h3 className="mt-3 text-center text-sm font-semibold text-white">
        {title}
      </h3>
    </div>
  );
};
