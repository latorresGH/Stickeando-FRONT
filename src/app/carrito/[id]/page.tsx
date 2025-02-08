"use client"
import React from 'react';
import { useCarrito } from '@/hook/useCarrito';
import { Producto } from '@/types/Producto';

const CarritoPage = () => {
  const { carrito } = useCarrito();

  return (
    <div>
      <h1>Carrito</h1>
      {carrito?.length > 0 ? (
        carrito.map((carritoProducto) => (
          <div key={carritoProducto.id}>
            <h3>Producto ID: {carritoProducto.producto_id}</h3>
            {/* Aquí podrías obtener más detalles del producto usando el producto_id */}
            {/* Por ejemplo, si tienes acceso a la lista completa de productos */}
            {/* O haciendo otra solicitud para obtener los detalles del producto */}
            <p>Cantidad: {carritoProducto.cantidad}</p>
            <button>Eliminar del carrito</button> {/* Implementa la eliminación aquí */}
          </div>
        ))
      ) : (
        <p>No hay productos en tu carrito.</p>
      )}
    </div>
  );
};

export default CarritoPage;
