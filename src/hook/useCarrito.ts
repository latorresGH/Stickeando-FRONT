import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/authContext";

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
  const [carrito, setCarrito] = useState<CarritoProducto[]>([]);
  const [carritoId, setCarritoId] = useState<number | null>(null); // Agregamos el estado para el carritoId
  const { user } = useUser();

  useEffect(() => {
    const obtenerCarrito = async () => {
      if (!user) return;
    
      try {
        const { data } = await axios.get(`http://localhost:3001/api/carrito/${user.id}`);
        console.log("Respuesta del backend:", data); // Verifica que la estructura sea la esperada
    
        if (!data.carrito || !data.carrito.productos || !Array.isArray(data.carrito.productos)) {
          console.error("La respuesta del backend no es válida:", data);
          return;
        }
    
        // Imprime los productos para asegurarte de que se están recibiendo los correctos
        console.log("Productos en el carrito:", data.carrito.productos);
    
        setCarritoId(data.carrito.id); // Guardar el carritoId en el estado
        setCarrito(data.carrito.productos); // Asignar los productos correctamente
      } catch (error) {
        console.error("Error al obtener el carrito", error);
      }
    };
    

    obtenerCarrito();
  }, [user]);

  const agregarAlCarrito = async (producto: Producto) => {
    if (!user) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }
  
    try {
      // Primero, obtener el carrito del usuario
      const carritoResponse = await axios.get(`http://localhost:3001/api/carrito/${user.id}`);
      console.log('Respuesta del carrito:', carritoResponse.data); // Ver la respuesta completa
      
      const carrito_id = carritoResponse.data.carrito.id; // Acceder correctamente al carrito_id
      console.log('Carrito ID:', carrito_id); // Ver el valor del carrito_id
      
      if (!carrito_id) {
        alert('No se ha encontrado un carrito para el usuario');
        return;
      }
  
      // Ahora que tenemos el carrito_id, lo enviamos al backend para agregar el producto
      const response = await axios.post('http://localhost:3001/api/carritoProductos/add', {
        carrito_id,
        producto_id: producto.id,
        cantidad: 1,
      });
  
      setCarrito(response.data); // Actualiza el carrito después de agregar el producto
    } catch (error) {
      console.error('Error al agregar producto al carrito', error);
      alert('Error al agregar producto al carrito');
    }
  };

  const eliminarProducto = async (productoId: number) => {
    try {
      console.log('Eliminar producto con ID:', productoId); // Verifica que el ID del producto es correcto

      if (!carritoId) {
        alert('No se encontró el carrito');
        return;
      }

      // Eliminar el producto del backend
      const response = await axios.delete(`http://localhost:3001/api/carritoProductos/remove/${carritoId}/${productoId}`);
      console.log(`URL de eliminación: http://localhost:3001/api/carritoProductos/remove/${carritoId}/${productoId}`);
      
      console.log('Producto eliminado:', response.data);

      // Actualizamos el carrito en el estado local sin hacer un nuevo fetch
      setCarrito(prevCarrito => prevCarrito.filter(producto => producto.id !== productoId));
    } catch (error: any) {
      console.error('Error al eliminar el producto:', error.response ? error.response.data : error);
      alert('Error al eliminar el producto');
    }
  };

  const fetchCarrito = async () => {
    if (!user) return;
  
    try {
      const { data } = await axios.get(`http://localhost:3001/api/carrito/${user.id}`);
      console.log("Respuesta del backend:", data); // Verifica la respuesta
  
      if (!data.productos || !Array.isArray(data.productos)) {
        console.error("La respuesta del backend no es válida:", data);
        return;
      }
  
      setCarrito(data.carrito.productos);
    } catch (error) {
      console.error("Error al obtener el carrito", error);
    }
  };
  

  // Fetch del carrito cuando el usuario cambia
  useEffect(() => {
    fetchCarrito();
  }, [user]);


  return { carrito, agregarAlCarrito, fetchCarrito, eliminarProducto ,carritoId };
};
