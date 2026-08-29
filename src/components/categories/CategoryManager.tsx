import { useState } from 'react';
import { Category } from '../../types/inventory';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { ConfirmDialog } from '../ui/Modal';

interface CategoryManagerProps {
  categories: Category[];
  onAdd: (name: string) => void;
  onUpdate: (id: string, name: string) => void;
  onDelete: (id: string) => void;
}

export function CategoryManager({ categories, onAdd, onUpdate, onDelete }: CategoryManagerProps) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; name: string } | null>(null);
  const [error, setError] = useState('');

  const handleAdd = () => {
    const trimmed = newCategoryName.trim();
    
    if (!trimmed) {
      setError('Category name cannot be empty');
      return;
    }

    if (categories.some(cat => cat.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('A category with this name already exists');
      return;
    }

    onAdd(trimmed);
    setNewCategoryName('');
    setError('');
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
    setError('');
  };

  const handleSaveEdit = () => {
    const trimmed = editingName.trim();

    if (!trimmed) {
      setError('Category name cannot be empty');
      return;
    }

    if (categories.some(cat => cat.id !== editingId && cat.name.toLowerCase() === trimmed.toLowerCase())) {
      setError('A category with this name already exists');
      return;
    }

    if (editingId) {
      onUpdate(editingId, trimmed);
      setEditingId(null);
      setEditingName('');
      setError('');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName('');
    setError('');
  };

  const handleDeleteRequest = (category: Category) => {
    setDeleteConfirm({ id: category.id, name: category.name });
  };

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      onDelete(deleteConfirm.id);
      setDeleteConfirm(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Add New Category</h3>
        <div className="flex gap-2">
          <Input
            value={newCategoryName}
            onChange={e => {
              setNewCategoryName(e.target.value);
              setError('');
            }}
            placeholder="e.g., Electronics"
            onKeyPress={e => e.key === 'Enter' && handleAdd()}
            error={error && !editingId ? error : undefined}
          />
          <Button onClick={handleAdd}>Add</Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Existing Categories ({categories.length})
        </h3>
        
        {categories.length === 0 ? (
          <p className="text-gray-500 italic">No categories yet. Add your first category above.</p>
        ) : (
          <div className="space-y-2">
            {categories.map(category => (
              <div
                key={category.id}
                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
              >
                {editingId === category.id ? (
                  <>
                    <Input
                      value={editingName}
                      onChange={e => {
                        setEditingName(e.target.value);
                        setError('');
                      }}
                      onKeyPress={e => e.key === 'Enter' && handleSaveEdit()}
                      error={error && editingId === category.id ? error : undefined}
                      className="flex-1"
                    />
                    <Button size="sm" onClick={handleSaveEdit}>
                      Save
                    </Button>
                    <Button size="sm" variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <span className="flex-1 font-medium text-gray-900">{category.name}</span>
                    <Button size="sm" variant="ghost" onClick={() => handleEdit(category)}>
                      Rename
                    </Button>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteRequest(category)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={deleteConfirm !== null}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${deleteConfirm?.name}"? This will remove it from all items but will not delete the items themselves.`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
