import { useState, useEffect,useCallback  } from "react";
import axios from "axios";
import { useUser } from "../context/authContext";
import { useCarritoContext } from "../context/carritoContext";

interface Producto {
  id: number;
  titulo: string;
  precio: number;
  imagen_url: string;
}

interface CarritoProducto {
  id: number;
  producto_id: number;
  cantidad: number;
  titulo: string;
  precio: string;
  imagen_url: string;
  carrito_id: number;
}

export const useCarrito = () => {
  const { carrito, setCarrito } = useCarritoContext();
  const [carritoId, setCarritoId] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false); // Estado para controlar el "debounce"
  const { user } = useUser();

  const fetchCarrito = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await axios.get<{ carrito: { id: number; productos: CarritoProducto[] } }>(
        `https://stickeando.onrender.com/api/carrito/${user.id}`
      );

      if (!data.carrito || !Array.isArray(data.carrito.productos)) {
        console.error("La respuesta del backend no es válida:", data);
        return;
      }

      setCarritoId(data.carrito.id);
      setCarrito(data.carrito.productos);
    } catch (error) {
      console.error("Error al obtener el carrito", error);
    }
  }, [user, setCarrito]); // Agregamos dependencias para que la función no cambie en cada render

  useEffect(() => {
    fetchCarrito();
  }, [user, fetchCarrito]); // Ahora `fetchCarrito` es estable y no causa re-render innecesario

  const agregarAlCarrito = async (producto: Producto) => {
    if (!user) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      return;
    }
  
    // Bloquear múltiples clics rápidos
    if (isProcessing) return;
    setIsProcessing(true);
  
    try {
      // Obtener el carrito del usuario
      const carritoResponse = await axios.get<{ carrito: { id: number } }>(
        `https://stickeando.onrender.com/api/carrito/${user.id}`
      );
      const carrito_id = carritoResponse.data.carrito.id;
  
      if (!carrito_id) {
        alert("No se ha encontrado un carrito para el usuario");
        return;
      }
  
      // Enviar el producto al backend (agregar o actualizar)
      await axios.post("https://stickeando.onrender.com/api/carritoProductos/add", {
        carrito_id,
        producto_id: producto.id,
        cantidad: 1, // O la cantidad que desees agregar
      });
  
      // Actualizar el carrito localmente
      setCarrito((prevCarrito) => {
        const productoExistente = prevCarrito.find((p) => p.producto_id === producto.id);
        
        if (productoExistente) {
          return prevCarrito.map((p) =>
            p.producto_id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
          );
        } else {
          const nuevoProducto: CarritoProducto = {
            id: producto.id,
            carrito_id,
            producto_id: producto.id,
            cantidad: 1,
            titulo: producto.titulo,
            precio: producto.precio.toString(),
            imagen_url: producto.imagen_url,
          };
          return [...prevCarrito, nuevoProducto];
        }
      });
  
    } catch (error) {
      console.error("Error al agregar producto al carrito", error);
      alert("Error al agregar producto al carrito");
    } finally {
      // Desbloquear el botón después de la solicitud
      setIsProcessing(false);
    }
  };
  
  
  
    const vaciarCarrito = async () => {
      try {
          await axios.delete(`https://stickeando.onrender.com/api/carrito/${carritoId}`); // Endpoint para vaciar el carrito
          setCarrito([]); // Vaciar el estado local
      } catch (error) {
          console.error("Error al vaciar el carrito:", error);
      }
  };


  const eliminarProducto = async (productoId: number) => {
    if (!user) {
      // Si no estás logueado, eliminamos del carrito local (localStorage)
      const carritoLocal = JSON.parse(localStorage.getItem("carrito") || "[]");
  
      const nuevoCarrito = carritoLocal.filter((producto: CarritoProducto) => producto.producto_id !== productoId);
  
      // Guardamos el carrito actualizado en localStorage
      localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  
      // Actualizamos el estado con el carrito de localStorage
      setCarrito(nuevoCarrito);
  
      return;
    }
  
    // Si estás logueado, eliminamos del carrito en el backend
    if (!carritoId) {
      alert("No se encontró el carrito");
      return;
    }
  
    try {
      await axios.delete(`https://stickeando.onrender.com/api/carritoProductos/remove/${carritoId}/${productoId}`);
  
      // Actualizamos el estado eliminando el producto
      setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.producto_id !== productoId));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Error al eliminar el producto");
    }
  };
  

  return { carrito, agregarAlCarrito, fetchCarrito, eliminarProducto, vaciarCarrito, carritoId };
};
