// components/AdminPanel.tsx
"use client"
import React from 'react';
import { useAdminPanel } from '@/hook/productAdminPanel';

const AdminPanel = () => {
  const {
    products,
    categories,
    newProduct,
    setNewProduct,
    handleCreateProduct,
    handleCheckboxChange,
    handleDeleteProduct
  } = useAdminPanel(); // Usamos el hook para acceder a los datos y funciones

  return (
    <div>
      <h1>Admin Panel</h1>

      <section>
        <h2>Products</h2>
        <input
          type="text"
          value={newProduct.title}
          onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
          placeholder="Product Title"
        />
        <input
          type="text"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          placeholder="Product Price"
        />

        <div>
          <h3>Categories</h3>
          {categories.map(category => (
            <div key={category.id}>
              <input
                type="checkbox"
                value={category.id}
                checked={newProduct.categoryIds.includes(String(category.id))}
                onChange={handleCheckboxChange}
              />
              <label>{category.nombre}</label>
            </div>
          ))}
        </div>

        <input
          type="file"
          onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.files ? e.target.files[0] : null })}
        />
        <button onClick={handleCreateProduct}>Add Product</button>
        <ul>
          {Array.isArray(products) && products.map(product => (
            <li key={product.id}>
              {product.titulo} - ${product.precio} <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default AdminPanel;
