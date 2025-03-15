"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from '@/styles/DeleteProduct.module.css';
import { Producto } from "@/types/Producto"; // Importa el modelo de producto

export default function DeleteProduct() {
  const [products, setProducts] = useState<Producto[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Obtener la lista de productos
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get<{ products: Producto[] }>("https://stickeando.onrender.com/api/productos/listar");
      setProducts(response.data.products); // Accede a la propiedad "products"
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un producto
  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await axios.delete(`https://stickeando.onrender.com/api/productos/delete/${id}`);
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
      }
    }
  };

  // Filtrar productos por nombre
  const filteredProducts = products.filter((producto) =>
    producto.titulo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Eliminar sticker</h3>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar producto por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
      </div>
      {loading ? (
        <p className={styles.loading}>Cargando productos...</p>
      ) : (
        <div className={styles.productList}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div>
                <h2 className={styles.productName}>{product.titulo}</h2>
                <p className={styles.productId}>ID: {product.id}</p>
              </div>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(product.id)}
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
