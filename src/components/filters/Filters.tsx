import { useState } from 'react';
import { Category, SortOption } from '../../types/inventory';

interface FiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategories: string[];
  onCategoryToggle: (categoryId: string) => void;
  categories: Category[];
  minPrice?: number;
  maxPrice?: number;
  onMinPriceChange: (price: number | undefined) => void;
  onMaxPriceChange: (price: number | undefined) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function Filters({
  searchQuery,
  onSearchChange,
  selectedCategories,
  onCategoryToggle,
  categories,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  sortBy,
  onSortChange,
}: FiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const clearFilters = () => {
    onSearchChange('');
    selectedCategories.forEach(id => onCategoryToggle(id));
    onMinPriceChange(undefined);
    onMaxPriceChange(undefined);
  };

  const hasActiveFilters = searchQuery || selectedCategories.length > 0 || minPrice !== undefined || maxPrice !== undefined;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search items..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Sort */}
        <div className="w-full md:w-48">
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value as SortOption)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        {/* Toggle Advanced Filters */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:w-auto px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
        >
          {isExpanded ? 'Hide' : 'Show'} Filters
          {hasActiveFilters && !isExpanded && (
            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-blue-600 rounded-full">
              !
            </span>
          )}
        </button>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
          {/* Categories */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Category
            </label>
            {categories.length === 0 ? (
              <p className="text-sm text-gray-500 italic">No categories available</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => onCategoryToggle(category.id)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                      selectedCategories.includes(category.id)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                min="0"
                step="0.01"
                value={minPrice ?? ''}
                onChange={e => onMinPriceChange(e.target.value ? Number(e.target.value) : undefined)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <span className="text-gray-500">to</span>
              <input
                type="number"
                placeholder="Max"
                min="0"
                step="0.01"
                value={maxPrice ?? ''}
                onChange={e => onMaxPriceChange(e.target.value ? Number(e.target.value) : undefined)}
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
