import React, { useState } from "react";
import { useCarrito } from "@/hook/useCarrito";
import { useUser } from "@/context/authContext";
import styles from "@/styles/CarritoPanel.module.css";
import { useOrden } from "@/hook/useOrden";
import Image from "next/image";

interface CarritoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CarritoPanel: React.FC<CarritoPanelProps> = ({ isOpen, onClose }) => {
  const { carrito, eliminarProducto } = useCarrito();
  const { user } = useUser();
  const { crearOrden, loading, error } = useOrden();
  const telefonoVendedor = "5493425824554";
  const [clienteNombre, setClienteNombre] = useState("");
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const iniciarCompra = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // Si el usuario está logueado, procedemos normalmente
    if (user) {
      generarMensajeWhatsApp(user.nombre);
    } else {
      // Si no está logueado, mostramos el formulario para ingresar nombre
      setMostrarFormulario(true);
    }
  };

  const confirmarOrdenAnonima = () => {
    if (!clienteNombre.trim()) {
      alert("Por favor ingresa tu nombre para continuar.");
      return;
    }
    generarMensajeWhatsApp(clienteNombre);
    setMostrarFormulario(false);
  };

  const generarMensajeWhatsApp = async (nombreCliente: string) => {
    // Realizar la orden
    console.log("Generando orden para el cliente:", nombreCliente);
    const ordenId = await crearOrden();
  
    // Si no se crea la orden correctamente, no continuar
    if (!ordenId) {
      console.error("Hubo un error al crear la orden, ordenId es nulo");
      alert("Hubo un error al crear la orden.");
      return;
    }
  
    const listaProductos = carrito
      .map((producto) => `- ${producto.titulo} x${producto.cantidad}`)
      .join("\n");
  
    const precioTotal = carrito.reduce(
      (total, producto) =>
        total + Number(producto.precio) * Number(producto.cantidad),
      0
    );
  
    const mensaje = `Hola, soy ${nombreCliente}. Quisiera comprar los siguientes stickers:\n\n${listaProductos}\n\nPrecio Total: $${precioTotal.toFixed(
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
        {mostrarFormulario ? (
          <div className={styles.formCompra}>
            <input
              type="text"
              placeholder="Tu nombre"
              value={clienteNombre}
              onChange={(e) => setClienteNombre(e.target.value)}
              className={styles.inputNombre}
            />
            <div className={styles.botonesFormulario}>
              <button
                onClick={confirmarOrdenAnonima}
                className={styles.botonComprar}
                disabled={loading}
              >
                {loading ? "Cargando..." : "Confirmar"}
              </button>
              <button
                onClick={() => setMostrarFormulario(false)}
                className={styles.botonCancelar}
              >
                Cancelar
              </button>
            </div>
          </div>
        ) : (
          <button
            className={styles.botonComprar}
            onClick={iniciarCompra}
            disabled={loading}
          >
            {loading ? "Cargando..." : "Iniciar compra"}
          </button>
        )}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
};

export default CarritoPanel;