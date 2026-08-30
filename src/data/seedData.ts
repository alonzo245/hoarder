import { Item, Category } from '../types/inventory';
import { generateId } from '../utils/formatters';

export const seedCategories: Category[] = [
  { id: generateId(), name: 'Electronics' },
  { id: generateId(), name: 'Gaming' },
  { id: generateId(), name: 'Computers' },
  { id: generateId(), name: 'Audio' },
  { id: generateId(), name: 'Cables' },
  { id: generateId(), name: 'Photography' },
];

export function getSeedItems(categoryIds: { [key: string]: string }): Item[] {
  const now = new Date().toISOString();
  
  return [
    {
      id: generateId(),
      name: 'MacBook Pro 16"',
      description: 'M3 Max, 36GB RAM, 1TB SSD. Perfect for development and creative work.',
      price: 3499,
      currency: 'ILS',
      categoryIds: [categoryIds.Computers, categoryIds.Electronics],
      purchaseDate: '2024-01-15',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      name: 'Nintendo Switch 2',
      description: 'Latest generation gaming console with OLED display.',
      price: 499,
      currency: 'ILS',
      categoryIds: [categoryIds.Gaming, categoryIds.Electronics],
      purchaseDate: '2024-03-20',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      name: 'Sony WH-1000XM6',
      description: 'Premium noise-cancelling wireless headphones with exceptional sound quality.',
      price: 399,
      currency: 'ILS',
      categoryIds: [categoryIds.Audio, categoryIds.Electronics],
      purchaseDate: '2024-02-10',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      name: 'BenQ Projector',
      description: '4K HDR projector for home theater setup.',
      price: 1299,
      currency: 'ILS',
      categoryIds: [categoryIds.Electronics],
      purchaseDate: '2023-11-05',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      name: 'HDMI Cable 2m',
      description: 'High-speed HDMI 2.1 cable supporting 4K@120Hz.',
      price: 15,
      currency: 'ILS',
      categoryIds: [categoryIds.Cables, categoryIds.Electronics],
      purchaseDate: '2023-11-06',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: generateId(),
      name: 'Canon EOS R6',
      description: 'Full-frame mirrorless camera with 20MP sensor.',
      price: 2499,
      currency: 'ILS',
      categoryIds: [categoryIds.Photography, categoryIds.Electronics],
      purchaseDate: '2023-09-12',
      createdAt: now,
      updatedAt: now,
    },
  ];
}

export function initializeSeedData(): void {
  const categoryMap: { [key: string]: string } = {};
  
  seedCategories.forEach(category => {
    categoryMap[category.name] = category.id;
  });

  const items = getSeedItems(categoryMap);

  localStorage.setItem('hoarder.categories', JSON.stringify(seedCategories));
  localStorage.setItem('hoarder.items', JSON.stringify(items));
}
