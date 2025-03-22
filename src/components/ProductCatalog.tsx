"use client";
import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation"; 
import { Producto } from "../types/Producto";
import style from "@/styles/ProductCatalog.module.css";
import CategoryFilterPanel from "./StickerFilters";
import { useCarrito } from "@/hook/useCarrito";
import { useClientSearchParams } from "@/hook/useClientSarchParams";
import Image from "next/image";

const ProductCatalog = () => {
  const { agregarAlCarrito } = useCarrito();
  const [products, setProducts] = useState<Producto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useClientSearchParams();
  const selectedCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("search") || "";

  const normalizedCategory = selectedCategory || "";
  const normalizedSearchQuery = searchQuery || "";
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://stickeando.onrender.com/api/productos/listar");
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
  }, [normalizedCategory, normalizedSearchQuery]); // ✅ Corrección
  

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
                <Image
                  src={product.imagen_url}
                  alt={product.titulo}
                  className={style.productImage}
                  width={500}
                  height={500}
                />
              </div>
              <p className={style.productPrice}>Precio: ${Number(product.precio).toFixed(2)}</p>
              <div className={style.productActions}>
                <button className={style.addToCartButton} onClick={() => agregarAlCarrito(product)}>
                  Agregar al carrito
                  <svg className={style.svgCart} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#e8e8e8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
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
