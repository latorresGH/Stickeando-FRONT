"use client";
import React from "react";
import { useCarrito } from "@/hook/useCarrito";

const Carrito = () => {
  const { carrito } = useCarrito();

  return (
    <div>
      <h1>Carrito</h1>
      {carrito?.length > 0 ? (
        carrito.map((carritoProducto) => (
          <div key={carritoProducto.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
            <h3>{carritoProducto.titulo}</h3>
            <img
              src={`http://localhost:3001/api/imagenProducto/${carritoProducto.imagen_url}`} // Aquí se muestra la imagen
              alt={carritoProducto.titulo}
              width={100}
              height={100}
            />
            <p>Cantidad: {carritoProducto.cantidad}</p>
            <p>Precio: ${carritoProducto.precio}</p>
            <button>Eliminar del carrito</button> {/* Implementa la eliminación aquí */}
          </div>
        ))
      ) : (
        <p>No hay productos en tu carrito.</p>
      )}
    </div>
  );
};

export default Carrito;
