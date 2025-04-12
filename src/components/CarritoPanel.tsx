import React from "react";
import { useCarrito } from "@/hook/useCarrito";
import { useUser } from "@/context/authContext"; // Para obtener el usuario autenticado
import styles from "@/styles/CarritoPanel.module.css";
import { useOrden } from "@/hook/useOrden"; // Importamos el hook useOrden
import Image from "next/image";

interface CarritoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CarritoPanel: React.FC<CarritoPanelProps> = ({ isOpen, onClose }) => {
  const { carrito, eliminarProducto } = useCarrito();
  const { user } = useUser(); // Obtener el usuario autenticado
  const { crearOrden, loading, error } = useOrden(); // Desestructuramos la función y el estado de useOrden
  const telefonoVendedor = "5493425824554"; // Número de WhatsApp del vendedor

  const generarMensajeWhatsApp = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // Realizar la orden
    console.log("Usuario logueado:", user); // 👈
    const ordenId = await crearOrden(); // Usamos la función para crear la orden
    if (!ordenId) {
      alert("Hubo un error al crear la orden.");
      return;
    }

    const nombreUsuario = user ? user.nombre : "Cliente Anónimo";
    const listaProductos = carrito
      .map((producto) => `- ${producto.titulo} x${producto.cantidad}`)
      .join("\n");

    const precioTotal = carrito.reduce(
      (total, producto) =>
        total + Number(producto.precio) * Number(producto.cantidad),
      0
    );

    const mensaje = `Hola, soy ${nombreUsuario}. Quisiera comprar los siguientes stickers:\n\n${listaProductos}\n\nPrecio Total: $${precioTotal.toFixed(
      2
    )}\n\nOrden ID: ${ordenId}`;

    const urlWhatsApp = `https://wa.me/${telefonoVendedor}?text=${encodeURIComponent(
      mensaje
    )}`;
    window.open(urlWhatsApp, "_blank");
  };

  return (
    <div className={`${styles.carritoPanel} ${isOpen ? styles.open : ""}`}>
      <div className={styles.carritoHeader}>
        <div className={styles.tituloCarrito}>
          <h2>Carrito de compras</h2>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
      </div>
      {carrito?.length > 0 ? (
        <ul className={styles.listaCarrito}>
          {carrito.map((producto) => (
            <li
              key={`${producto.carrito_id}-${producto.id}`}
              className={styles.carritoItem}
            >
              {producto.imagen_url ? (
                <Image
                  src={producto.imagen_url}
                  alt={producto.titulo || "Imagen de producto"}
                  className={styles.carritoImagen}
                  width={500}
                  height={500}
                />
              ) : (
                <span>Sin imagen</span>
              )}
              <div className={styles.carritoInfo}>
                <h3>{producto.titulo}</h3>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio: ${producto.precio}</p>
              </div>

              <button
                className={styles.buttonDelete}
                onClick={() => eliminarProducto(producto.id)}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.carritoVacio}>Tu carrito está vacío.</p>
      )}

      <div className={styles.carritoFooter}>
        <button
          className={styles.botonComprar}
          onClick={generarMensajeWhatsApp}
          disabled={loading} // Deshabilitar mientras está cargando
        >
          {loading ? "Cargando..." : "Iniciar compra"}
        </button>
        {error && <p className={styles.errorMessage}>{error}</p>}{" "}
        {/* Mostrar error si ocurre */}
      </div>
    </div>
  );
};

export default CarritoPanel;
