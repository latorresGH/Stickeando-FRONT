"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/EditCategories.module.css";

interface Categoria {
    id: number;
    nombre: string;
  }
  
  export default function PutCategorias() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [editando, setEditando] = useState<number | null>(null);
    const [nombreEdit, setNombreEdit] = useState("");
  
  useEffect(() => {
    obtenerCategorias();
  }, []);

  const obtenerCategorias = async () => {
    try {
      const { data } = await axios.get("https://stickeando.onrender.com/api/categorias/all");
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener categorías", error);
    }
  };

  const actualizarCategoria = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token:", token);
      if (!token) {
        console.error("No hay token disponible");
        return;
      }
  
      await axios.put(
        `https://stickeando.onrender.com/api/categorias/update/${id}`,
        { nombre: nombreEdit },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      obtenerCategorias();
      setEditando(null);
    } catch (error) {
      console.error("Error al actualizar la categoría", error);
    }
  };

  return (
    <div className={styles.categoriesContainer2}>
      <h2>Administrar Categorías</h2>
      <ul className={styles.categoriasList}>
        {categorias.map((categoria) => (
          <li key={categoria.id}>
            {editando === categoria.id ? (
                <button className={styles.editarButton} onClick={() => actualizarCategoria(categoria.id)}>Guardar</button>
            ) : (
                <button className={styles.editarButton} onClick={() => { setEditando(categoria.id); setNombreEdit(categoria.nombre); }}>Editar</button>
            )}
            {editando === categoria.id ? (
              <input type="text" value={nombreEdit} onChange={(e) => setNombreEdit(e.target.value)} />
            ) : (
              <span>{categoria.nombre}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
