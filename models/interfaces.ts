export interface Rating {
  rate: number;
  count: number;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: string | number; // API retorna string
  image: string; // URL relativa, ex: /media/produto_imagens/tshirt-1-1.png
  category: string;
  rating?: Rating; // opcional
}
