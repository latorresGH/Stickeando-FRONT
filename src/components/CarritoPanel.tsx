import React from "react";
import { useCarrito } from "@/hook/useCarrito";
import { useUser } from "@/context/authContext"; // Para obtener el usuario autenticado
import styles from "@/styles/CarritoPanel.module.css";
import Image from "next/image";
import { jsPDF } from "jspdf";

interface CarritoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const CarritoPanel: React.FC<CarritoPanelProps> = ({ isOpen, onClose }) => {
  const { carrito, eliminarProducto } = useCarrito();
  const { user } = useUser(); // Obtener el usuario autenticado
  const telefonoVendedor = "5493425824554"; // Número de WhatsApp del vendedor

  // Función para generar el PDF como Blob
  const generarPDFBlob = () => {
    const doc = new jsPDF();
    const nombreUsuario = user ? user.nombre : "Cliente Anónimo";
    const listaProductos = carrito
      .map((producto) => `${producto.titulo} x${producto.cantidad}`)
      .join("\n");

    const precioTotal = carrito.reduce(
      (total, producto) => total + Number(producto.precio) * Number(producto.cantidad),
      0
    );

    doc.text(`Pedido de ${nombreUsuario}`, 10, 10);
    doc.text(`Productos:\n${listaProductos}`, 10, 20);
    doc.text(`Precio Total: $${precioTotal.toFixed(2)}`, 10, 40);

    // Crear el Blob del PDF
    const pdfBlob = doc.output("blob");
    return pdfBlob;
  };

  const enviarPDFAlBackend = async (pdfBlob: Blob) => {
    const formData = new FormData();
    formData.append("file", pdfBlob);
    formData.append("carrito", JSON.stringify(carrito));
    formData.append("usuario", JSON.stringify(user || {}));

    const response = await fetch("https://stickeando.onrender.com/api/generarPDF", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log("PDF generado con éxito");

      // Aquí devolvemos la URL completa del archivo PDF generado
      return data.filePath;
    } else {
      console.error("Error al generar el PDF");
    }
  };

  const generarMensajeWhatsApp = async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    console.log("Carrito antes de generar el PDF:", carrito);  // Verificar los productos en el carrito

    const pdfBlob = generarPDFBlob();  // Función para obtener el PDF como Blob
    const urlArchivo = await enviarPDFAlBackend(pdfBlob);  // Subir el archivo y obtener la URL

    const nombreUsuario = user ? user.nombre : "Cliente Anónimo";
    const listaProductos = carrito
      .map((producto) => `- ${producto.titulo} x${producto.cantidad}`)
      .join("\n");

    const precioTotal = carrito.reduce(
      (total, producto) => total + Number(producto.precio) * Number(producto.cantidad),
      0
    );

    // Aquí usamos la URL completa devuelta por el backend
    const mensaje = `Hola, soy ${nombreUsuario}. Quisiera comprar los siguientes stickers:\n\n${listaProductos}\n\nPrecio Total: $${precioTotal.toFixed(
      2
    )}\n\nAquí está el PDF de mi pedido: ${urlArchivo}`;

    const urlWhatsApp = `https://wa.me/${telefonoVendedor}?text=${encodeURIComponent(mensaje)}`;
    window.open(urlWhatsApp, "_blank");
  };


  return (
    <div className={`${styles.carritoPanel} ${isOpen ? styles.open : ""}`}>
      <div className={styles.carritoHeader}>
        <div className={styles.tituloCarrito}>
          <h2>Carrito de compras</h2>
        </div>
        <button className={styles.closeButton} onClick={onClose}>✖</button>
      </div>

      {carrito?.length > 0 ? (
        <ul className={styles.listaCarrito}>
          {carrito.map((producto) => (
            <li key={producto.id} className={styles.carritoItem}>
              <Image
                src={`https://stickeando.onrender.com/api/imagenProducto/${producto.imagen_url}`}
                alt={producto.titulo}
                className={styles.carritoImagen}
                width={500}
                height={500}
              />
              <div className={styles.carritoInfo}>
                <h3>{producto.titulo}</h3>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio: ${producto.precio}</p>
              </div>

              <button className={styles.buttonDelete} onClick={() => eliminarProducto(producto.id)}>
                ❌
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.carritoVacio}>Tu carrito está vacío.</p>
      )}

      <div className={styles.carritoFooter}>
        <button className={styles.botonComprar} onClick={generarMensajeWhatsApp}>
        <svg className={styles.logoSVG} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.014 8.00613C6.12827 7.1024 7.30277 5.87414 8.23488 6.01043L8.23339 6.00894C9.14051 6.18132 9.85859 7.74261 10.2635 8.44465C10.5504 8.95402 10.3641 9.4701 10.0965 9.68787C9.7355 9.97883 9.17099 10.3803 9.28943 10.7834C9.5 11.5 12 14 13.2296 14.7107C13.695 14.9797 14.0325 14.2702 14.3207 13.9067C14.5301 13.6271 15.0466 13.46 15.5548 13.736C16.3138 14.178 17.0288 14.6917 17.69 15.27C18.0202 15.546 18.0977 15.9539 17.8689 16.385C17.4659 17.1443 16.3003 18.1456 15.4542 17.9421C13.9764 17.5868 8 15.27 6.08033 8.55801C5.97237 8.24048 5.99955 8.12044 6.014 8.00613Z" fill="#ededed"></path> <path fillRule="evenodd" clipRule="evenodd" d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z" fill="#ededed"></path> </g></svg>
          Iniciar compra
        </button>
      </div>
    </div>
  );
};

export default CarritoPanel;
