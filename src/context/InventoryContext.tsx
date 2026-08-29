import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Item, Category } from '../types/inventory';
import { itemStorage, categoryStorage } from '../services/storage';
import { generateId } from '../utils/formatters';

interface InventoryContextType {
  items: Item[];
  categories: Category[];
  
  // Item operations
  addItem: (item: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateItem: (id: string, updates: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>) => void;
  deleteItem: (id: string) => void;
  getItem: (id: string) => Item | undefined;
  
  // Category operations
  addCategory: (name: string) => Category;
  updateCategory: (id: string, name: string) => void;
  deleteCategory: (id: string) => void;
  getCategory: (id: string) => Category | undefined;
  
  // Utility
  refreshData: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setItems(itemStorage.getAll());
    setCategories(categoryStorage.getAll());
  };

  const addItem = (itemData: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newItem: Item = {
      ...itemData,
      id: generateId(),
      createdAt: now,
      updatedAt: now,
    };
    
    itemStorage.add(newItem);
    setItems(itemStorage.getAll());
  };

  const updateItem = (id: string, updates: Partial<Omit<Item, 'id' | 'createdAt' | 'updatedAt'>>) => {
    itemStorage.update(id, updates);
    setItems(itemStorage.getAll());
  };

  const deleteItem = (id: string) => {
    itemStorage.delete(id);
    setItems(itemStorage.getAll());
  };

  const getItem = (id: string) => {
    return items.find(item => item.id === id);
  };

  const addCategory = (name: string): Category => {
    const newCategory: Category = {
      id: generateId(),
      name: name.trim(),
    };
    
    categoryStorage.add(newCategory);
    setCategories(categoryStorage.getAll());
    return newCategory;
  };

  const updateCategory = (id: string, name: string) => {
    categoryStorage.update(id, { name: name.trim() });
    setCategories(categoryStorage.getAll());
  };

  const deleteCategory = (id: string) => {
    categoryStorage.delete(id);
    setCategories(categoryStorage.getAll());
    setItems(itemStorage.getAll()); // Refresh items since their categoryIds may have changed
  };

  const getCategory = (id: string) => {
    return categories.find(cat => cat.id === id);
  };

  const refreshData = () => {
    loadData();
  };

  const value: InventoryContextType = {
    items,
    categories,
    addItem,
    updateItem,
    deleteItem,
    getItem,
    addCategory,
    updateCategory,
    deleteCategory,
    getCategory,
    refreshData,
  };

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error('useInventory must be used within an InventoryProvider');
  }
  return context;
}
