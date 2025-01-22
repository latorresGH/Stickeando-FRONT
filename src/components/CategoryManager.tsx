// components/CategoryManager.tsx
"use client"
import React from 'react';
import { useCategoryManager } from '@/hook/useCategoryManager';

const CategoryManager = () => {
  const {
    categories,
    newCategoryName,
    setNewCategoryName,
    handleCreateCategory,
    handleDeleteCategory
  } = useCategoryManager(); // Usamos el hook para acceder a los datos y funciones

  return (
    <div>
      <h2>Category Manager</h2>
      <input
        type="text"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        placeholder="Category Name"
      />
      <button onClick={handleCreateCategory}>Add Category</button>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.nombre}
            <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
