"use client";
import { useEffect, useState } from "react";
import { Producto } from "../types/Producto";
import style from "@/styles/ProductCatalog.module.css";
import CategoryFilterPanel from "./StickerFilters";

const ProductCatalog = () => {
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
          // Si hay categoría seleccionada, agregarla a la URL
          const params = new URLSearchParams();
          if (selectedCategory) params.append("category", selectedCategory);
          if (searchQuery) params.append("search", searchQuery);

          // Agregar los parámetros a la URL
          url += `?${params.toString()}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Asegurar que el precio sea un número
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
  }, [selectedCategory, searchQuery]); // Se vuelve a ejecutar si el filtro cambia

  const handleFilter = (categoryId: string, searchQuery: string) => {
    setSelectedCategory(categoryId);
    setSearchQuery(searchQuery);
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
                <button className={style.addToCartButton}>
                  <p>Agregar al carrito</p>
                  <svg
                    className={style.svgCart}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      ></path>{" "}
                      <path
                        d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      ></path>{" "}
                      <path
                        d="M13 13V11M13 11V9M13 11H15M13 11H11"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                      <path
                        d="M2 3L2.26121 3.09184C3.5628 3.54945 4.2136 3.77826 4.58584 4.32298C4.95808 4.86771 4.95808 5.59126 4.95808 7.03836V9.76C4.95808 12.7016 5.02132 13.6723 5.88772 14.5862C6.75412 15.5 8.14857 15.5 10.9375 15.5H12M16.2404 15.5C17.8014 15.5 18.5819 15.5 19.1336 15.0504C19.6853 14.6008 19.8429 13.8364 20.158 12.3075L20.6578 9.88275C21.0049 8.14369 21.1784 7.27417 20.7345 6.69708C20.2906 6.12 18.7738 6.12 17.0888 6.12H11.0235M4.95808 6.12H7"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                    </g>
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
