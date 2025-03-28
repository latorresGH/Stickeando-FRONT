"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "@/styles/DeleteProduct.module.css";
import { Producto } from "@/types/Producto";

export default function DeleteProduct() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [categories, setCategories] = useState<
    { id: number; nombre: string }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [editProduct, setEditProduct] = useState<Producto | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ products: Producto[] }>(
        "https://stickeando.onrender.com/api/productos/listar"
      );
      console.log("Productos recibidos:", response.data.products);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://stickeando.onrender.com/api/categorias/all"
      );
      console.log("Respuesta de categorías:", response.data); // Verifica la estructura real
      setCategories(response.data); // Directamente asignamos response.data
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await axios.delete(
          `https://stickeando.onrender.com/api/productos/delete/${id}`
        );
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  const handleEdit = (product: Producto) => {
    setEditProduct(product);
  };

  const handleSave = async () => {
    if (!editProduct) return;
    try {
      await axios.put(
        `https://stickeando.onrender.com/api/productos/update-producto/${editProduct.id}`,
        editProduct
      );
      setProducts(
        products.map((p) => (p.id === editProduct.id ? editProduct : p))
      );
      setEditProduct(null);
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Administrar Stickers</h3>
      <input
        type="text"
        placeholder="Buscar producto por nombre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      {loading ? (
        <p className={styles.loading}>Cargando productos...</p>
      ) : (
        <div className={styles.productList}>
          {products.length > 0 ? (
            products
              .filter((p) =>
                p.titulo.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <div key={product.id} className={styles.productCard}>
                  <h2 className={styles.productName}>{product.titulo}</h2>
                  <p>ID: {product.id}</p>
                  <p>Precio: ${product.precio}</p>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))
          ) : (
            <p>No hay productos disponibles.</p>
          )}
        </div>
      )}
      {editProduct && (
        <div className={styles.editPanel}>
          <h3>Editar Producto</h3>
          <label>Nombre:</label>
          <input
            type="text"
            value={editProduct.titulo}
            onChange={(e) =>
              setEditProduct({ ...editProduct, titulo: e.target.value })
            }
          />

          <label>Precio:</label>
          <input
            type="number"
            value={editProduct.precio}
            onChange={(e) =>
              setEditProduct({ ...editProduct, precio: Number(e.target.value) })
            }
          />

          <label>Categoría:</label>
          <select
            value={editProduct?.categoria_id || ""}
            onChange={(e) =>
              setEditProduct({
                ...editProduct,
                categoria_id: Number(e.target.value),
              })
            }
          >
            <option value="" disabled>
              Seleccione una categoría
            </option>
            {categories && categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.nombre}
                </option>
              ))
            ) : (
              <option disabled>Cargando categorías...</option>
            )}
          </select>

            <div className={styles.buttons}>
          <button className={styles.buttonGuardar} onClick={handleSave}>Guardar</button>
          <button className={styles.buttonCancel} onClick={() => setEditProduct(null)}>Cancelar</button>
            </div>
        </div>
      )}
    </div>
  );
}
