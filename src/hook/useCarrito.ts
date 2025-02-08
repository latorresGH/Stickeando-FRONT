import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/authContext'; // Asegúrate de tener un contexto de autenticación

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
}

export const useCarrito = () => {
  const [carrito, setCarrito] = useState<CarritoProducto[]>([]); // ✅ Asegurar que el estado inicial es un array vacío
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:3001/api/carrito/${user.id}`)
        .then(response => {
          // Aquí recibes el carrito y los productos
          setCarrito(response.data.productos); // Asumimos que `productos` está en la respuesta
        })
        .catch(error => console.error('Error al obtener el carrito', error));
    }
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
  
  

  return { carrito, agregarAlCarrito };
};
