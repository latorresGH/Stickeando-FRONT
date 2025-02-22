"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation"; // Para obtener parámetros de la URL
import { Producto } from "../types/Producto";
import style from "@/styles/ProductCatalog.module.css";
import CategoryFilterPanel from "./StickerFilters";
import { useCarrito } from "@/hook/useCarrito";

const ProductCatalog = () => {
  const { carrito, agregarAlCarrito } = useCarrito();
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/productos/listar");
        if (!response.ok) throw new Error("No se pudieron obtener los productos");
  
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ocurrió un error desconocido");
      } finally {
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, [selectedCategory || "", searchQuery || ""]); // Asegura que nunca sean undefined
  

  // Filtrar productos en el frontend según la categoría y la búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.categoria_id === Number(selectedCategory) : true;
    const matchesSearch = searchQuery
      ? product.titulo.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className={style.productCatalogs}>
      <CategoryFilterPanel />
      <div>
        {loading && <p>Cargando productos...</p>}
        {error && <p>Error: {error}</p>}
        {filteredProducts.length === 0 && !loading && !error && <p>No se encontraron productos.</p>}

        <ul className={style.productList}>
          {filteredProducts.map((product) => (
            <li key={product.id} className={style.productCard}>
              <h2 className={style.productTitle}>{product.titulo}</h2>
              <div className={style.productImageContainer}>
                <img
                  src={`http://localhost:3001/api/imagenProducto/${product.imagen_url}`}
                  alt={product.titulo}
                  className={style.productImage}
                />
              </div>
              <p className={style.productPrice}>Precio: ${Number(product.precio).toFixed(2)}</p>
              <button className={style.addToCartButton} onClick={() => agregarAlCarrito(product)}>
                Agregar al carrito
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCatalog;
