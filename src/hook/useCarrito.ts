import { useState, useEffect } from "react";
import { useCarritoContext } from "../context/carritoContext";
import { CarritoProducto } from "../types/CarritoProducto";

interface Producto {
  id: number;
  titulo: string;
  precio: number;
  imagen_url: string;
}

export const useCarrito = () => {
  const { carrito, setCarrito } = useCarritoContext();

  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, [setCarrito]);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto: Producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find((p) => p.producto_id === producto.id);

      if (productoExistente) {
        return prevCarrito.map((p) =>
          p.producto_id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      } else {
        const nuevoProducto: CarritoProducto = {
          id: producto.id,
          carrito_id: 1, // ⚠️ Asigna un valor válido, esto debe ser dinámico si usas base de datos
          producto_id: producto.id,
          cantidad: 1,
          titulo: producto.titulo,
          precio: producto.precio.toString(), // 👈 Convertido a string
          imagen_url: producto.imagen_url,
        };
        return [...prevCarrito, nuevoProducto];
      }
    });
  };

  const eliminarProducto = (productoId: number) => {
    setCarrito((prevCarrito) => prevCarrito.filter((p) => p.producto_id !== productoId));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  return { carrito, agregarAlCarrito, eliminarProducto, vaciarCarrito };
};
