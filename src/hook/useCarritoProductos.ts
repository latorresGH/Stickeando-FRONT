import { useState, useEffect } from "react";
import axios from "axios";
import { CarritoProducto } from "@/types/CarritoProducto";

export const useCarritoProducto = (carritoId: string) => {
  const [productos, setProductos] = useState<CarritoProducto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (carritoId) fetchProductos();
  }, [carritoId]);

  const fetchProductos = async () => {
    setLoading(true);
    try {
      const response = await axios.get<CarritoProducto[]>(
        `http://localhost:3001/api/CarritoProductos/${carritoId}`
      );
      setProductos(response.data);
    } catch (error) {
      setError("Error al obtener los productos del carrito");
    } finally {
      setLoading(false);
    }
  };

  const addProducto = async (productoId: string, cantidad: number) => {
    setLoading(true);
    try {
      const response = await axios.post<CarritoProducto>(
        "http://localhost:3001/api/CarritoProductos/add",
        { carrito_id: carritoId, producto_id: productoId, cantidad }
      );
      setProductos([...productos, response.data]);
    } catch (error) {
      setError("Error al agregar el producto");
    } finally {
      setLoading(false);
    }
  };

  const removeProducto = async (id: string) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3001/api/CarritoProductos/remove/${id}`);
      setProductos(productos.filter((producto) => producto.id !== Number(id)));
    } catch (error) {
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