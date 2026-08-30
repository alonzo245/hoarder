import { useState } from 'react';
import { Item, Category, Currency } from '../../types/inventory';
import { formatPrice, formatDate } from '../../utils/formatters';
import { searchItemPrice } from '../../services/googleSearch';
import { Button } from '../ui/Button';

interface ItemDetailsProps {
  item: Item;
  categories: Category[];
  onEdit: () => void;
  onDelete: () => void;
}

export function ItemDetails({ item, categories, onEdit, onDelete }: ItemDetailsProps) {
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
          className="w-full h-80 object-cover rounded-lg"
          onError={handleImageError}
        />
      );
    }

    return (
      <div className="w-full h-80 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
        <svg
          className="w-32 h-32 text-gray-400"
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
    <div className="space-y-6">
      {renderImage()}

      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="text-sm font-medium text-gray-600 mb-1">Price</div>
          <div className="text-2xl font-bold text-blue-600">
            {formatPrice(item.price, item.currency as Currency)}
          </div>
        </div>

        {item.purchaseDate && (
          <div>
            <div className="text-sm font-medium text-gray-600 mb-1">Purchase Date</div>
            <div className="text-lg font-semibold text-gray-900">
              {formatDate(item.purchaseDate)}
            </div>
          </div>
        )}
      </div>

      {itemCategories.length > 0 && (
        <div>
          <div className="text-sm font-medium text-gray-600 mb-2">Categories</div>
          <div className="flex flex-wrap gap-2">
            {itemCategories.map(cat => (
              <span
                key={cat.id}
                className="inline-block px-3 py-1.5 text-sm font-medium bg-blue-100 text-blue-700 rounded-lg"
              >
                {cat.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Created:</span> {formatDate(item.createdAt)}
        </div>
        <div>
          <span className="font-medium">Updated:</span> {formatDate(item.updatedAt)}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
        <Button
          variant="primary"
          className="flex-1"
          onClick={() => searchItemPrice(item.name)}
        >
          <svg
            className="w-5 h-5 mr-2 inline"
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
          Search Price
        </Button>
        <Button variant="secondary" className="flex-1" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="danger" className="flex-1" onClick={onDelete}>
          Delete
        </Button>
      </div>
    </div>
  );
}
