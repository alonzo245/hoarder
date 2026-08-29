import { formatPrice } from '../../utils/formatters';

interface StatisticsProps {
  totalItems: number;
  totalValue: number;
  averageValue: number;
  totalCategories: number;
}

export function Statistics({ totalItems, totalValue, averageValue, totalCategories }: StatisticsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-sm font-medium text-gray-600 mb-1">Total Items</div>
        <div className="text-3xl font-bold text-gray-900">{totalItems}</div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-sm font-medium text-gray-600 mb-1">Total Value</div>
        <div className="text-3xl font-bold text-gray-900">
          {formatPrice(totalValue, 'USD')}
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-sm font-medium text-gray-600 mb-1">Average Value</div>
        <div className="text-3xl font-bold text-gray-900">
          {formatPrice(averageValue, 'USD')}
        </div>
      </div>
      
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-sm font-medium text-gray-600 mb-1">Categories</div>
        <div className="text-3xl font-bold text-gray-900">{totalCategories}</div>
      </div>
    </div>
  );
}
