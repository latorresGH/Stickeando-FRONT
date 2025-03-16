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

    try {
      const carritoResponse = await axios.get<{ carrito: { id: number } }>(
        `https://stickeando.onrender.com/api/carrito/${user.id}`
      );
      const carrito_id = carritoResponse.data.carrito.id;

      if (!carrito_id) {
        alert("No se ha encontrado un carrito para el usuario");
        return;
      }

      await axios.post("https://stickeando.onrender.com/api/carritoProductos/add", {
        carrito_id,
        producto_id: producto.id,
        cantidad: 1,
      });

      const nuevoProducto: CarritoProducto = {
        id: producto.id,
        producto_id: producto.id,
        cantidad: 1,
        titulo: producto.titulo,
        precio: producto.precio.toString(),
        imagen_url: producto.imagen_url,
        carrito_id,
      };

      setCarrito((prevCarrito) => [...prevCarrito, nuevoProducto]);
    } catch (error) {
      console.error("Error al agregar producto al carrito", error);
      alert("Error al agregar producto al carrito");
    }
  };

  const eliminarProducto = async (productoId: number) => {
    try {
      if (!carritoId) {
        alert("No se encontró el carrito");
        return;
      }

      await axios.delete(`https://stickeando.onrender.com/api/carritoProductos/remove/${carritoId}/${productoId}`);

      setCarrito((prevCarrito) => prevCarrito.filter((producto) => producto.id !== productoId));
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Error al eliminar el producto");
    }
  };

  useEffect(() => {
    fetchCarrito();
  }, [user, fetchCarrito]);

  return { carrito, agregarAlCarrito, fetchCarrito, eliminarProducto, carritoId };
};
