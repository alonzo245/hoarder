import { Item, Category, FilterState, SortOption } from '../types/inventory';

/**
 * Filter items based on search query and filter state
 */
export function filterItems(
  items: Item[],
  categories: Category[],
  filters: FilterState
): Item[] {
  let filtered = [...items];

  // Search filter
  if (filters.searchQuery.trim()) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(item => {
      // Search in item name
      if (item.name.toLowerCase().includes(query)) return true;
      
      // Search in description
      if (item.description?.toLowerCase().includes(query)) return true;
      
      // Search in category names
      const itemCategories = categories.filter(cat => item.categoryIds.includes(cat.id));
      if (itemCategories.some(cat => cat.name.toLowerCase().includes(query))) return true;
      
      return false;
    });
  }

  // Category filter
  if (filters.categoryIds.length > 0) {
    filtered = filtered.filter(item =>
      filters.categoryIds.some(catId => item.categoryIds.includes(catId))
    );
  }

  // Price range filter
  if (filters.minPrice !== undefined) {
    filtered = filtered.filter(item => 
      item.price !== undefined && item.price >= filters.minPrice!
    );
  }

  if (filters.maxPrice !== undefined) {
    filtered = filtered.filter(item =>
      item.price !== undefined && item.price <= filters.maxPrice!
    );
  }

  return filtered;
}

/**
 * Sort items based on sort option
 */
export function sortItems(items: Item[], sortBy: SortOption): Item[] {
  const sorted = [...items];

  switch (sortBy) {
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    
    case 'oldest':
      return sorted.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    
    case 'price-asc':
      return sorted.sort((a, b) => {
        if (a.price === undefined) return 1;
        if (b.price === undefined) return -1;
        return a.price - b.price;
      });
    
    case 'price-desc':
      return sorted.sort((a, b) => {
        if (a.price === undefined) return 1;
        if (b.price === undefined) return -1;
        return b.price - a.price;
      });
    
    default:
      return sorted;
  }
}

/**
 * Calculate statistics for items
 */
export function calculateStats(items: Item[]) {
  const totalItems = items.length;
  
  const itemsWithPrice = items.filter(item => item.price !== undefined);
  const totalValue = itemsWithPrice.reduce((sum, item) => sum + (item.price || 0), 0);
  const averageValue = itemsWithPrice.length > 0 ? totalValue / itemsWithPrice.length : 0;

  return {
    totalItems,
    totalValue,
    averageValue,
    itemsWithPrice: itemsWithPrice.length,
  };
}
