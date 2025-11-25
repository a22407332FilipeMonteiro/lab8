import Link from 'next/link';

export interface CaracteristicaProps {
  caracteristica: string;
}

export function Caracteristica({ caracteristica }: CaracteristicaProps) {
  return (
    <li>
      <Link href={`/caracteristicas/${encodeURIComponent(caracteristica)}`}>
        {caracteristica}
      </Link>
    </li>
  );
}
