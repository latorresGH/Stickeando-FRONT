"use client"
import { useEffect, useState } from "react";
import { Producto } from "../types/Producto";
import style from "@/styles/ProductCatalog.module.css";
import CategoryFilterPanel from "./StickerFilters";
import axios from "axios";
import { useUser } from "@/context/authContext";
import { useCarrito } from "@/hook/useCarrito"; // Asegúrate de que el hook esté importado

const ProductCatalog = () => {
  const { user } = useUser(); // Obtener el usuario desde el contexto
  const { carrito, agregarAlCarrito } = useCarrito(); // Utilizamos el hook de carrito
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:3001/api/productos/listar";

        // Aplicar filtros de categoría y búsqueda
        if (selectedCategory || searchQuery) {
          const params = new URLSearchParams();
          if (selectedCategory) params.append("category", selectedCategory);
          if (searchQuery) params.append("search", searchQuery);

          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        const productsWithCorrectTypes = data.products.map((product: any) => ({
          ...product,
          precio:
            typeof product.precio === "string"
              ? parseFloat(product.precio)
              : product.precio,
        }));

        if (Array.isArray(productsWithCorrectTypes)) {
          setProducts(productsWithCorrectTypes);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const handleFilter = (categoryId: string, searchQuery: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery(searchQuery);
  };

  const handleAddToCart = (productoId: number) => {
    agregarAlCarrito({ id: productoId, titulo: "", precio: 0, imagen_url: "" }); // Llamamos al hook directamente
  };

  return (
    <div className={style.productCatalogs}>
      <div>
        <CategoryFilterPanel onFilter={handleFilter} />
      </div>
      <div>
        <ul className={style.productList}>
          {products.map((product) => (
            <li key={product.id} className={style.productCard}>
              <h2 className={style.productTitle}>{product.titulo}</h2>
              <div className={style.productImageContainer}>
                <img
                  src={`http://localhost:3001/api/imagenProducto/${product.imagen_url}`}
                  alt={product.titulo}
                  className={style.productImage}
                />
              </div>
              <div className={style.productInfo}>
                <div className={style.productDetails}>
                  <p className={style.productPrice}>
                    Precio:{" "}
                    <span className={style.precio}>
                      ${product.precio.toFixed(2)}
                    </span>
                  </p>
                </div>
                <button
                  className={style.addToCartButton}
                  onClick={() => handleAddToCart(product.id)}
                >
                  <p>Agregar al carrito</p>
                  <svg
                    className={style.svgCart}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    ></path>
                    <path
                      d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductCatalog;
