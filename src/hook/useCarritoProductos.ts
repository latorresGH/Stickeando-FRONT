import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CarritoProducto } from "@/types/CarritoProducto";

export const useCarritoProducto = (carritoId: string) => {
  const [productos, setProductos] = useState<CarritoProducto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = useCallback(async () => {
    if (!carritoId) return;
    setLoading(true);
    try {
      const response = await axios.get<CarritoProducto[]>(`https://stickeando.onrender.com/api/CarritoProductos/${carritoId}`);
      setProductos(response.data);
    } catch {
      setError("Error al obtener los productos del carrito");
    } finally {
      setLoading(false);
    }
  }, [carritoId]);

  useEffect(() => {
    fetchProductos();
  }, [carritoId, fetchProductos]);

  const addProducto = async (productoId: string, cantidad: number) => {
    setLoading(true);
    try {
      const response = await axios.post<CarritoProducto>(
        "https://stickeando.onrender.com/api/CarritoProductos/add",
        { carrito_id: carritoId, producto_id: productoId, cantidad }
      );
      setProductos((prev) => [...prev, response.data]);
    } catch {
      setError("Error al agregar el producto");
    } finally {
      setLoading(false);
    }
  };

  const removeProducto = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`https://stickeando.onrender.com/api/CarritoProductos/remove/${id}`);
      setProductos((prev) => prev.filter((producto) => producto.id !== Number(id)));
    } catch {
      setError("Error al eliminar el producto");
    } finally {
      setLoading(false);
    }
  };

  return {
    productos,
    loading,
    error,
    fetchProductos,
    addProducto,
    removeProducto,
  };
};
