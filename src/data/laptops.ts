import { Laptop } from '../types';
export const LAPTOPS: Laptop[] = [
  { id: 'apex-pro-16', name: 'ApexBook Pro 16 M3 Max', category: 'Criadores', tagline: 'Poder absoluto para edição 8K.', price: 18490, rating: 4.9, cpu: 'M3 Max 16-Core', ramOptions: ['36GB', '64GB'], storageOptions: ['1TB', '2TB'], colors: [{ name: 'Preto', hex: '#1e293b' }], accentGradient: 'from-indigo-600 to-slate-900' },
  { id: 'titan-rtx-17', name: 'Titan Blade 17', category: 'Gaming', tagline: 'Ray Tracing extremo.', price: 21990, rating: 4.9, cpu: 'i9-14900HX', ramOptions: ['32GB', '64GB'], storageOptions: ['2TB', '4TB'], colors: [{ name: 'Obsidian', hex: '#0f172a' }], accentGradient: 'from-rose-600 to-slate-950' }
];