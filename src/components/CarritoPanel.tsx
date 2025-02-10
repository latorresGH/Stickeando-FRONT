import React from "react";
import { useCarrito } from "@/hook/useCarrito";
import styles from "@/styles/CarritoPanel.module.css";

interface CarritoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CarritoPanel: React.FC<CarritoPanelProps> = ({ isOpen, onClose }) => {
  const { carrito, carritoId, eliminarProducto } = useCarrito(); // Ahora usamos eliminarProducto directamente

  return (
    <div className={`${styles.carritoPanel} ${isOpen ? styles.open : ""}`}>
      <div className={styles.carritoHeader}>
        <h2>Carrito de compras</h2>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
      </div>

      {carrito?.length > 0 ? (
        <ul className={styles.listaCarrito}>
          {carrito.map((producto) => (
            <li key={producto.id} className={styles.carritoItem}>
              <img
                src={`http://localhost:3001/api/imagenProducto/${producto.imagen_url}`}
                alt={producto.titulo}
                className={styles.carritoImagen}
              />
              <div className={styles.carritoInfo}>
                <p>{producto.id}</p>
                <h3>{producto.titulo}</h3>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio: ${producto.precio}</p>
              </div>

              <button onClick={() => {
                console.log('Producto completo al hacer clic:', producto); // Verifica toda la estructura del objeto
                eliminarProducto(producto.id);
              }}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.carritoVacio}>Tu carrito está vacío.</p>
      )}
    </div>
  );
};

export default CarritoPanel;
