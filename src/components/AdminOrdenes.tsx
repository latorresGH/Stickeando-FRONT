import { useEffect, useState } from "react";
import { useUser } from "@/context/authContext";
import styles from '@/styles/AdminOrdenes.module.css';

interface Producto {
  producto_id: number;
  titulo: string;
  cantidad: number;
  precio: number;
}

interface Orden {
  id: number;
  usuario_id: number;
  estado: "pendiente" | "realizado";
  total: number;
  creado_en: string;
  productos: Producto[];
}

const AdminOrdenes = () => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);
  const { token } = useUser();
  const [ordenSeleccionada, setOrdenSeleccionada] = useState<Orden | null>(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    const fetchOrdenes = async () => {
      if (!token) {
        console.log("No hay token disponible.");
        return;
      }

      try {
        const response = await fetch("https://stickeando.onrender.com/api/ordenes", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Error al obtener órdenes");
        const data: Orden[] = await response.json();
        setOrdenes(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrdenes();
  }, [token]);

  const obtenerOrdenConProductos = async (id: number) => {
    try {
      if (!token) {
        console.log("No hay token disponible.");
        return;
      }
  
      const response = await fetch(`https://stickeando.onrender.com/api/ordenes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Error al obtener productos de la orden");
      const data = await response.json();
  
      // Primero actualizamos las órdenes en el estado
      setOrdenes(prevOrdenes => 
        prevOrdenes.map(orden => 
          orden.id === id ? { ...orden, productos: data.productos } : orden
        )
      );
  
      // Luego establecemos la orden seleccionada con los productos ya cargados
      setOrdenSeleccionada({
        ...ordenes.find(orden => orden.id === id)!,
        productos: data.productos
      });
      setMostrarModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  const marcarRealizada = async (id: number) => {
    try {
      const response = await fetch(`https://stickeando.onrender.com/api/ordenes/${id}/realizar`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "PUT",
      });

      if (!response.ok) throw new Error("Error al actualizar orden");

      setOrdenes((prev) =>
        prev.map((orden) =>
          orden.id === id ? { ...orden, estado: "realizado" } : orden
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setOrdenSeleccionada(null);
  };

  const eliminarOrden = async (id: number) => {
    const confirmacion = window.confirm("¿Estás seguro que querés borrar esta orden?");
    if (!confirmacion) return;
  
    try {
      const response = await fetch(`https://stickeando.onrender.com/api/ordenes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) throw new Error("Error al eliminar la orden");
  
      // Actualizar estado
      setOrdenes((prev) => prev.filter((orden) => orden.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.contenedor}>

        {ordenes.map((orden) => (
          <div className={styles.contenedorOrdenes} key={orden.id}>
            <h3>Orden #{orden.id} - Estado: <span className={styles.estadoText}>{orden.estado}</span></h3>
            <div className={styles.contenedorDetalles}>
              <p>Total: $<span className={styles.precioText}>{orden.total}</span></p>
              <p>Creada en: {new Date(orden.creado_en).toLocaleString()}</p>
            </div>
            
            <button className={styles.buttonObtener} onClick={() => obtenerOrdenConProductos(orden.id)}>
              Ver productos de la orden
            </button>

            <button className={styles.buttonObtener} onClick={() => eliminarOrden(orden.id)}>
              Borrar orden
            </button>

            {orden.estado === "pendiente" && (
              <button className={styles.buttonRealizada} onClick={() => marcarRealizada(orden.id)}>
                Marcar como realizada
              </button>
            )}
          </div>
        ))}

      {/* Modal para mostrar los productos */}
      {mostrarModal && ordenSeleccionada && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={cerrarModal}>×</button>
            <h3>Productos de la Orden #{ordenSeleccionada.id}</h3>
            <ul className={styles.productosList}>
              {ordenSeleccionada.productos?.map((producto) => (
                <li key={producto.producto_id}>
                  <strong>{producto.titulo}</strong> - 
                  Cantidad: {producto.cantidad} - 
                  Precio: ${producto.precio} - 
                  Subtotal: ${producto.cantidad * producto.precio}
                </li>
              ))}
            </ul>
            <div className={styles.totalContainer}>
              <strong>Total de la orden: ${ordenSeleccionada.total}</strong>
            </div>
            <button className={styles.closeModalButton} onClick={cerrarModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrdenes;