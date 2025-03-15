"use client";
import React, { useState } from "react";
import styles from "@/styles/Profile.module.css";
import { useUser } from "@/context/authContext";
import axios from "axios";
import { useRouter } from "next/navigation";

const fotosPerfil = ["profile1.jpg", "profile2.jpg", "profile3.jpg"];

const ActualizarPerfil: React.FC = () => {
  const { user } = useUser();
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [foto, setFoto] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  

  const validarNombre = (nombre: string) =>
    /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nombre);
  const validarPassword = (pass: string) =>
    pass.length >= 6 && pass.length <= 16;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (nombre && !validarNombre(nombre)) {
      setError("El nombre solo puede contener letras.");
      return;
    }

    if (password && password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    if (password && !validarPassword(password)) {
      setError("La contraseña debe tener entre 6 y 16 caracteres.");
      return;
    }

    try {
      const response = await axios.put(
        "https://stickeando.onrender.com/api/users/update",
        {
          id: user?.id,
          nombre,
          password,
          confirmPassword,
          foto,
        }
      );
      setSuccess("Perfil actualizado exitosamente");
      setTimeout(() => router.push("/profile"), 2000);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Error al actualizar el perfil."
      );
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Actualizar Perfil</h2>
      <div className={styles.perfilActual}>
        {user?.id && (
          <img
            src={`https://stickeando.onrender.com/api/users/photo/${user.id}`}
            alt="Foto actual"
            className={styles.fotoActual}
          />
        )}

        {user?.nombre && <p className={styles.nombreActual}>{user.nombre}</p>}
      </div>
      
      {error && <p className={styles.error}>{error}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <div className={styles.contenedorFormulario} >
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Nueva Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
          <div className={styles.photoContainer}>
            <p className={styles.photoTitle}>Elegí una foto de perfil:</p>
            <div className={styles.photoList}>
              {fotosPerfil.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="Foto de perfil"
                  className={`${styles.photo} ${
                    foto === src ? styles.selected : ""
                  }`}
                  onClick={() => setFoto(src)}
                />
              ))}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <button type="submit" className={styles.submitButton}>
              {/* Actualizar Perfil */}
              <span className={styles.spanHover}>Actualizar</span><span>Gracias!</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarPerfil;
