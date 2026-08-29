export type Item = {
  id: string;
  name: string;
  description?: string;
  price?: number;
  currency: string;
  categoryIds: string[];
  imageUrl?: string;
  purchaseDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Currency = 'USD' | 'EUR' | 'GBP' | 'ILS';

export const CURRENCIES: Currency[] = ['USD', 'EUR', 'GBP', 'ILS'];

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  ILS: '₪',
};

export type SortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export type FilterState = {
  searchQuery: string;
  categoryIds: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy: SortOption;
};
