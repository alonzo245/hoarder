import { Item, Category } from '../types/inventory';

const STORAGE_KEYS = {
  items: 'hoarder.items',
  categories: 'hoarder.categories',
  initialized: 'hoarder.initialized',
} as const;

/**
 * Safely parse JSON from localStorage with fallback
 */
function safeJsonParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  
  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('Failed to parse JSON from localStorage:', error);
    return fallback;
  }
}

/**
 * Safely stringify and save to localStorage
 */
function safeSave(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
}

/**
 * Item storage operations
 */
export const itemStorage = {
  getAll(): Item[] {
    const data = localStorage.getItem(STORAGE_KEYS.items);
    return safeJsonParse(data, []);
  },

  save(items: Item[]): void {
    safeSave(STORAGE_KEYS.items, items);
  },

  add(item: Item): void {
    const items = this.getAll();
    items.push(item);
    this.save(items);
  },

  update(id: string, updates: Partial<Item>): void {
    const items = this.getAll();
    const index = items.findIndex(item => item.id === id);
    
    if (index !== -1) {
      items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
      this.save(items);
    }
  },

  delete(id: string): void {
    const items = this.getAll();
    const filtered = items.filter(item => item.id !== id);
    this.save(filtered);
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.items);
  },
};

/**
 * Category storage operations
 */
export const categoryStorage = {
  getAll(): Category[] {
    const data = localStorage.getItem(STORAGE_KEYS.categories);
    return safeJsonParse(data, []);
  },

  save(categories: Category[]): void {
    safeSave(STORAGE_KEYS.categories, categories);
  },

  add(category: Category): void {
    const categories = this.getAll();
    categories.push(category);
    this.save(categories);
  },

  update(id: string, updates: Partial<Category>): void {
    const categories = this.getAll();
    const index = categories.findIndex(cat => cat.id === id);
    
    if (index !== -1) {
      categories[index] = { ...categories[index], ...updates };
      this.save(categories);
    }
  },

  delete(id: string): void {
    const categories = this.getAll();
    const filtered = categories.filter(cat => cat.id !== id);
    this.save(filtered);
    
    // Remove this category from all items
    const items = itemStorage.getAll();
    const updatedItems = items.map(item => ({
      ...item,
      categoryIds: item.categoryIds.filter(catId => catId !== id),
    }));
    itemStorage.save(updatedItems);
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEYS.categories);
  },
};

/**
 * Check if the app has been initialized with seed data
 */
export function isInitialized(): boolean {
  return localStorage.getItem(STORAGE_KEYS.initialized) === 'true';
}

/**
 * Mark the app as initialized
 */
export function markInitialized(): void {
  localStorage.setItem(STORAGE_KEYS.initialized, 'true');
}

/**
 * Reset all data (for development/testing)
 */
export function clearAllData(): void {
  itemStorage.clear();
  categoryStorage.clear();
  localStorage.removeItem(STORAGE_KEYS.initialized);
}
