import { useState } from "react";
import axios from "axios";
import { useCarrito } from "@/hook/useCarrito";
import { useUser } from "@/context/authContext";

interface OrdenResponse {
  mensaje: string;
  orden_id: number;
}

export const useOrden = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { carrito, vaciarCarrito } = useCarrito();
  const { user } = useUser();
  
  const crearOrden = async (): Promise<number | null> => {
    if (carrito.length === 0) {
      setError("El carrito está vacío.");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const total = carrito.reduce(
        (sum, producto) => sum + Number(producto.precio) * Number(producto.cantidad),
        0
      );
      
      const productos = carrito.map((producto) => ({
        producto_id: producto.id,
        cantidad: producto.cantidad,
        precio: producto.precio,
      }));

      // Determinar la ruta y payload correctos según si el usuario está autenticado
      const endpoint = user 
        ? "https://stickeando.onrender.com/api/ordenes"
        : "https://stickeando.onrender.com/api/ordenes/anonimas";
      
      const payload = user 
        ? { usuario_id: user.id, productos, total }
        : { productos, total }; // No enviamos usuario_id para órdenes anónimas

      console.log("Haciendo request con el payload:", payload);

      const response = await axios.post<OrdenResponse>(endpoint, payload);

      console.log("Respuesta recibida:", response.data);

      if (response.data.orden_id) {
        vaciarCarrito(); // Limpiar el carrito tras la compra
        return response.data.orden_id;
      } else {
        setError("Error al crear la orden. No se recibió el ID de la orden.");
        return null;
      }
    } catch (err) {
      console.error("Error al crear orden:", err);
      setError("Error al crear la orden. Inténtalo de nuevo.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { crearOrden, loading, error };
};
