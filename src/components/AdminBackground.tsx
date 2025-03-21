"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/ChangeBackground.module.css";
import Image from "next/image";
// import { title } from "process";

interface Background {
  id: number;
  image_url: string;
  is_selected: boolean;
}

const AdminBackground: React.FC = () => {
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchBackgrounds();
  }, []);

  const fetchBackgrounds = async () => {
    try {
      const response = await fetch(
        "https://stickeando.onrender.com/api/backgrounds"
      );
      const data = await response.json();
      setBackgrounds(data);
    } catch (error) {
      console.error("Error al obtener backgrounds:", error);
    }
  };

  const handleSelect = async (id: number) => {
    try {
      await fetch(
        `https://stickeando.onrender.com/api/backgrounds/${id}/select`,
        { method: "PUT" }
      );
      fetchBackgrounds();
    } catch (error) {
      console.error("Error al seleccionar background:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`https://stickeando.onrender.com/api/backgrounds/${id}`, {
        method: "DELETE",
      });
      fetchBackgrounds();
    } catch (error) {
      console.error("Error al eliminar background:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await fetch("https://stickeando.onrender.com/api/backgrounds", {
        method: "POST",
        body: formData,
      });
      setSelectedFile(null);
      fetchBackgrounds();
    } catch (error) {
      console.error("Error al subir background:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Administrar Backgrounds</h3>
        <label htmlFor="fileInputBackground" className={styles.uploadLabel}>Seleccionar fondo</label>

        <div className={styles.contenedorBoton}>
            <div className={styles.fileInputContainer}>
                <input className={styles.fileInput} type="file" onChange={handleFileChange} id="fileInputBackground" />

                <div>
                {selectedFile && <p className={styles.selectedFileText}>{selectedFile.name}</p>}
                </div>
            </div>

          <button className={styles.uploadButton} onClick={handleUpload}>Subir Background</button>
        </div>

      <div className={styles.imageScrollContainer}>
        {backgrounds.map((bg) => (
          <div key={bg.id} className={styles.imageWrapper}>
            <Image
              width={500}
              height={500}
              src={`https://stickeando.onrender.com${bg.image_url}`}
              alt="background"
              className={`${styles.backgroundImage} ${
                bg.is_selected ? styles.selected : ""
              }`}
            />
            <br />
            <div className={styles.buttonContainer}>
              <button
                className={styles.button}
                onClick={() => handleSelect(bg.id)}
              >
                Seleccionar
              </button>
              <button
                className={`${styles.button} ${styles.deleteButton}`}
                onClick={() => handleDelete(bg.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBackground;
