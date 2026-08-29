import { useState } from 'react';
import { Item, Category, CURRENCIES, Currency } from '../../types/inventory';
import { Input, Textarea, Select } from '../ui/Input';
import { Button } from '../ui/Button';

interface ItemFormProps {
  item?: Item;
  categories: Category[];
  onSubmit: (data: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export function ItemForm({ item, categories, onSubmit, onCancel }: ItemFormProps) {
  const [name, setName] = useState(item?.name || '');
  const [description, setDescription] = useState(item?.description || '');
  const [price, setPrice] = useState(item?.price?.toString() || '');
  const [currency, setCurrency] = useState<Currency>(item?.currency as Currency || 'USD');
  const [imageUrl, setImageUrl] = useState(item?.imageUrl || '');
  const [purchaseDate, setPurchaseDate] = useState(item?.purchaseDate || '');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(item?.categoryIds || []);
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (price && (isNaN(Number(price)) || Number(price) < 0)) {
      newErrors.price = 'Price must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const formData: Omit<Item, 'id' | 'createdAt' | 'updatedAt'> = {
      name: name.trim(),
      description: description.trim() || undefined,
      price: price ? Number(price) : undefined,
      currency,
      imageUrl: imageUrl.trim() || undefined,
      purchaseDate: purchaseDate || undefined,
      categoryIds: selectedCategories,
    };

    onSubmit(formData);
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Name *"
        name="name"
        value={name}
        onChange={e => setName(e.target.value)}
        error={errors.name}
        placeholder="e.g., MacBook Pro"
      />

      <Textarea
        label="Description"
        name="description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={3}
        placeholder="Optional notes about this item..."
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={e => setPrice(e.target.value)}
          error={errors.price}
          placeholder="0.00"
        />

        <Select
          label="Currency"
          name="currency"
          value={currency}
          onChange={e => setCurrency(e.target.value as Currency)}
        >
          {CURRENCIES.map(cur => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </Select>
      </div>

      <Input
        label="Image URL"
        name="imageUrl"
        type="url"
        value={imageUrl}
        onChange={e => setImageUrl(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />

      <Input
        label="Purchase Date"
        name="purchaseDate"
        type="date"
        value={purchaseDate}
        onChange={e => setPurchaseDate(e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        {categories.length === 0 ? (
          <p className="text-sm text-gray-500 italic">
            No categories available. Create some categories first.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                type="button"
                onClick={() => toggleCategory(category.id)}
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

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {item ? 'Update Item' : 'Add Item'}
        </Button>
      </div>
    </form>
  );
}
