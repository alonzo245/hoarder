import { useState } from 'react';
import { Item, Category, Currency } from '../../types/inventory';
import { formatPrice, formatDate } from '../../utils/formatters';

interface ItemCardProps {
  item: Item;
  categories: Category[];
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
  onClick: (item: Item) => void;
}

export function ItemCard({ item, categories, onEdit, onDelete, onClick }: ItemCardProps) {
  const [imageError, setImageError] = useState(false);

  const itemCategories = categories.filter(cat => item.categoryIds.includes(cat.id));

  const handleImageError = () => {
    setImageError(true);
  };

  const renderImage = () => {
    if (item.imageUrl && !imageError) {
      return (
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-48 object-cover rounded-t-lg"
          onError={handleImageError}
          loading="lazy"
        />
      );
    }

    return (
      <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-t-lg flex items-center justify-center">
        <svg
          className="w-20 h-20 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="cursor-pointer" onClick={() => onClick(item)}>
        {renderImage()}
      </div>

      <div className="p-4">
        <h3 
          className="text-lg font-semibold text-gray-900 mb-2 cursor-pointer hover:text-blue-600 transition-colors"
          onClick={() => onClick(item)}
        >
          {item.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(item.price, item.currency as Currency)}
          </div>

          {item.purchaseDate && (
            <div className="text-sm text-gray-600">
              Purchased: {formatDate(item.purchaseDate)}
            </div>
          )}

          {itemCategories.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {itemCategories.map(cat => (
                <span
                  key={cat.id}
                  className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
                >
                  {cat.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(item)}
            className="flex-1 px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
