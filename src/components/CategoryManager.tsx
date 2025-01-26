// components/CategoryManager.tsx
"use client"
import React from 'react';
import { useCategoryManager } from '@/hook/useCategoryManager';
import styles from '@/styles/AdminCategories.module.css'

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
      <div className={styles.contenedor}>
        <div>
          <h2 className={styles.titulo}>Categorias</h2>
        </div>
          <div>
            <div className={styles.cajaInput}>
              <input
                className={styles.inputsProducto}
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Category Name"
              />
              <button className={styles.uploadButton} onClick={handleCreateCategory}>Agregar categoria</button>
            </div>            

            <div className={styles.cajaLista}>
              <h3 className={styles.deteleTittle}>Eliminar categoria</h3>
              <ul className={styles.lista}>
                {categories.map(category => (
                  <li key={category.id}>
                    <button className={styles.buttonBorrar} onClick={() => handleDeleteCategory(category.id)}>{category.nombre}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CategoryManager;
