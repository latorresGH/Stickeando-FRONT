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
  const { user, token } = useUser();
  
  const crearOrden = async (): Promise<number | null> => {
    
    const userId = user?.id || 0;

    console.log("ID que se va a enviar:", userId); // 👈

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

      const response = await axios.post<OrdenResponse>(
        "https://stickeando.onrender.com/api/ordenes",
        {
          usuario_id: user?.id || 0,  // Enviar el ID del usuario si está logueado, si no enviar 0
          productos,
          total,
        },
        {
          headers: {
            "Authorization": `Bearer ${token || ''}`  // Usar el token desde el contexto, si no está, enviar un token vacío
          }
        }
      );
      
      

      vaciarCarrito(); // Limpiar el carrito tras la compra
      return response.data.orden_id;
    } catch (err) {
      setError("Error al crear la orden. Inténtalo de nuevo." + err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { crearOrden, loading, error };
};
