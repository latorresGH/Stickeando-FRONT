import { useEffect, useState } from "react";

interface Orden {
  id: number;
  usuario_id: number;
  estado: "pendiente" | "realizado";
  creado_en: string;
}

const AdminOrdenes = () => {
  const [ordenes, setOrdenes] = useState<Orden[]>([]);

  useEffect(() => {
    const fetchOrdenes = async () => {
      try {
        const response = await fetch("https://stickeando.onrender.com/api/ordenes");
        if (!response.ok) throw new Error("Error al obtener órdenes");
        const data: Orden[] = await response.json();
        setOrdenes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrdenes();
  }, []);

  const marcarRealizada = async (id: number) => {
    try {
      const response = await fetch(`https://stickeando.onrender.com/api/ordenes/${id}/realizar`, {
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

  return (
    <div>
      <h2>Órdenes</h2>
      <ul>
        {ordenes.map((orden) => (
          <li key={orden.id}>
            Orden #{orden.id} - Estado: {orden.estado}
            {orden.estado === "pendiente" && (
              <button onClick={() => marcarRealizada(orden.id)}>
                Marcar como Realizada
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminOrdenes;
