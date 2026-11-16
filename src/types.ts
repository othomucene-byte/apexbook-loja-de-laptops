export type Category = 'Todos' | 'Ultrabooks' | 'Gaming' | 'Workstation' | 'Criadores';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export interface Laptop {
  id: string;
  name: string;
  category: Exclude<Category, 'Todos'>;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  badge?: string;
  cpu: string;
  gpu: string;
  display: string;
  battery: string;
  weight: string;
  ramOptions: string[];
  storageOptions: string[];
  colors: { name: string; hex: string }[];
  accentGradient: string;
}

export interface CartItem {
  laptop: Laptop;
  quantity: number;
  selectedRam: string;
  selectedStorage: string;
  selectedColor: { name: string; hex: string };
  unitPrice: number;
}
