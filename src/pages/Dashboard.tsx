import { useState, useMemo, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { Item, FilterState } from '../types/inventory';
import { filterItems, sortItems, calculateStats } from '../utils/filters';
import { isInitialized, markInitialized } from '../services/storage';
import { initializeSeedData } from '../data/seedData';

import { Header } from '../components/layout/Header';
import { EmptyState } from '../components/layout/EmptyState';
import { Statistics } from '../components/layout/Statistics';
import { Filters } from '../components/filters/Filters';
import { ItemCard } from '../components/items/ItemCard';
import { ItemForm } from '../components/items/ItemForm';
import { ItemDetails } from '../components/items/ItemDetails';
import { CategoryManager } from '../components/categories/CategoryManager';
import { Modal, ConfirmDialog } from '../components/ui/Modal';
import { Button } from '../components/ui/Button';

export function Dashboard() {
  const {
    items,
    categories,
    addItem,
    updateItem,
    deleteItem,
    addCategory,
    updateCategory,
    deleteCategory,
    refreshData,
  } = useInventory();

  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    categoryIds: [],
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: 'newest',
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [viewingItem, setViewingItem] = useState<Item | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Item | null>(null);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  // Initialize seed data on first load
  useEffect(() => {
    if (!isInitialized() && items.length === 0) {
      initializeSeedData();
      markInitialized();
      refreshData();
    }
  }, [items.length, refreshData]);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    const filtered = filterItems(items, categories, filters);
    return sortItems(filtered, filters.sortBy);
  }, [items, categories, filters]);

  // Calculate statistics
  const stats = useMemo(() => calculateStats(items), [items]);

  const handleAddItem = (itemData: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    addItem(itemData);
    setShowAddModal(false);
  };

  const handleUpdateItem = (itemData: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingItem) {
      updateItem(editingItem.id, itemData);
      setEditingItem(null);
    }
  };

  const handleDeleteItem = (item: Item) => {
    deleteItem(item.id);
    setDeleteConfirm(null);
    setViewingItem(null);
  };

  const handleViewItem = (item: Item) => {
    setViewingItem(item);
  };

  const handleEditFromDetails = () => {
    if (viewingItem) {
      setEditingItem(viewingItem);
      setViewingItem(null);
    }
  };

  const handleDeleteFromDetails = () => {
    if (viewingItem) {
      setDeleteConfirm(viewingItem);
    }
  };

  const toggleCategoryFilter = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter(id => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onManageCategories={() => setShowCategoryManager(true)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {items.length === 0 ? (
          <EmptyState onAddFirst={() => setShowAddModal(true)} />
        ) : (
          <>
            <Statistics
              totalItems={stats.totalItems}
              totalValue={stats.totalValue}
              averageValue={stats.averageValue}
              totalCategories={categories.length}
            />

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Your Collection
                {filteredAndSortedItems.length !== items.length && (
                  <span className="ml-2 text-lg text-gray-500">
                    ({filteredAndSortedItems.length} of {items.length})
                  </span>
                )}
              </h2>
              <Button onClick={() => setShowAddModal(true)}>
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Item
              </Button>
            </div>

            <Filters
              searchQuery={filters.searchQuery}
              onSearchChange={query => setFilters(prev => ({ ...prev, searchQuery: query }))}
              selectedCategories={filters.categoryIds}
              onCategoryToggle={toggleCategoryFilter}
              categories={categories}
              minPrice={filters.minPrice}
              maxPrice={filters.maxPrice}
              onMinPriceChange={price => setFilters(prev => ({ ...prev, minPrice: price }))}
              onMaxPriceChange={price => setFilters(prev => ({ ...prev, maxPrice: price }))}
              sortBy={filters.sortBy}
              onSortChange={sort => setFilters(prev => ({ ...prev, sortBy: sort }))}
            />

            {filteredAndSortedItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No items match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedItems.map(item => (
                  <ItemCard
                    key={item.id}
                    item={item}
                    categories={categories}
                    onEdit={setEditingItem}
                    onDelete={setDeleteConfirm}
                    onClick={handleViewItem}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Add Item Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Item"
        maxWidth="xl"
      >
        <ItemForm
          categories={categories}
          onSubmit={handleAddItem}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>

      {/* Edit Item Modal */}
      <Modal
        isOpen={editingItem !== null}
        onClose={() => setEditingItem(null)}
        title="Edit Item"
        maxWidth="xl"
      >
        {editingItem && (
          <ItemForm
            item={editingItem}
            categories={categories}
            onSubmit={handleUpdateItem}
            onCancel={() => setEditingItem(null)}
          />
        )}
      </Modal>

      {/* View Item Modal */}
      <Modal
        isOpen={viewingItem !== null}
        onClose={() => setViewingItem(null)}
        title="Item Details"
        maxWidth="xl"
      >
        {viewingItem && (
          <ItemDetails
            item={viewingItem}
            categories={categories}
            onEdit={handleEditFromDetails}
            onDelete={handleDeleteFromDetails}
          />
        )}
      </Modal>

      {/* Category Manager Modal */}
      <Modal
        isOpen={showCategoryManager}
        onClose={() => setShowCategoryManager(false)}
        title="Manage Categories"
        maxWidth="lg"
      >
        <CategoryManager
          categories={categories}
          onAdd={addCategory}
          onUpdate={updateCategory}
          onDelete={deleteCategory}
        />
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDeleteItem(deleteConfirm)}
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteConfirm?.name}"?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
