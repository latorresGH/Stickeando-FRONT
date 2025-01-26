// components/AdminPanel.tsx
"use client";
import React from "react";
import { useAdminPanel } from "@/hook/productAdminPanel";
import styles from "@/styles/ProductAdminPanel.module.css";

const AdminPanel = () => {
  const {
    products,
    categories,
    newProduct,
    setNewProduct,
    handleCreateProduct,
    handleCheckboxChange,
    handleDeleteProduct,
    successMessage,
    loading, // Usamos el estado de carga
  } = useAdminPanel();

  return (
    <div>
      <div className={styles.contenedor}>
        <section>
          <h3 className={styles.titulo}>Agregar sticker</h3>
          <input
            className={styles.inputsProducto}
            type="text"
            value={newProduct.title}
            onChange={(e) =>
              setNewProduct({ ...newProduct, title: e.target.value })
            }
            placeholder="Titulo del sticker"
          />
          <input
            className={styles.inputsProducto}
            type="text"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            placeholder="Precio del sticker"
          />

          <div>
            <div className={styles.textoCategoria}>
              <h3>Categoria</h3> <p>(seleccionar una sola)</p>
            </div>
            {categories.map((category) => (
              <div key={category.id} className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id={`category-${category.id}`}
                  value={category.id}
                  checked={newProduct.categoryIds.includes(String(category.id))}
                  onChange={handleCheckboxChange}
                  className={styles.checkboxInput}
                />
                <label
                  htmlFor={`category-${category.id}`}
                  className={styles.checkboxLabel}
                >
                  {category.nombre}
                </label>
              </div>
            ))}
          </div>

          <h3>Imagen del producto</h3>
          <label className={styles.uploadLabel} htmlFor="fileInput">
            Seleccionar imagen de sticker
          </label>
          <div className={styles.contenedorBoton}>
            <input
              id="fileInput"
              type="file"
              className={styles.fileInput}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  imageUrl: e.target.files ? e.target.files[0] : null,
                })
              }
            />
            <button onClick={handleCreateProduct} className={styles.uploadButton}>
              Agregar producto
            </button>
          </div>

          {/* Mensaje de éxito o carga */}
          {loading ? (
            <p>Cargando...</p>
          ) : successMessage ? (
            <p className={styles.mensajeSucceso}>{successMessage}</p>
          ) : null}

          <ul className={styles.ulDeshacer}>
            {Array.isArray(products) &&
              products.map((product) => (
                <li key={product.id}>
                  {product.titulo} - ${product.precio}{" "}
                  <button onClick={() => handleDeleteProduct(product.id)}>
                    Deshacer
                  </button>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default AdminPanel;
