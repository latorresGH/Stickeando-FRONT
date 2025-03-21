"use client";
import React, { useState } from "react";
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
    loading,
  } = useAdminPanel();

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewProduct({ ...newProduct, imageUrl: file });
      setSelectedFileName(file.name);
    } else {
      setSelectedFileName(null);
    }
  };

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
            <div className={styles.fileInputContainer}>
              <input
                id="fileInput"
                type="file"
                className={styles.fileInput}
                onChange={handleFileChange}
              />

              <div>
                {selectedFileName && (
                  <p className={styles.selectedFileText}>
                    {selectedFileName} seleccionada
                  </p>
                )}
              </div>
            </div>
            <button onClick={handleCreateProduct} className={styles.uploadButton}>
              Agregar producto
            </button>
          </div>


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
