"use client";
import { useState, useEffect } from "react";
import { useRegister } from "@/hook/useRegister";
import { useRouter } from "next/navigation";
import styles from "@/styles/Register.module.css";
import Link from "next/link";

const RegisterPage = () => {
  const { registerUser, isLoading, error, successMessage } = useRegister();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        router.push("/home"); // Redirige tras el registro exitoso
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [successMessage, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const productosCarrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    await registerUser(formData, productosCarrito);
  };

  return (
    <div className={styles.contenedorRegister}>
      <div className={styles.registerBoxForm}>

        <form className={styles.form} onSubmit={handleSubmit}>
        <img
          className={styles.logo}
          src="/images/logo-stickeando.png"
          alt="Logo"
          width={80}
          height={80}
        />
                <h2 className={styles.tituloRegister}>REGISTRO</h2>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <div className={styles.contenedorError}>
            {error && <p className={styles.error}>{error}</p>}
          </div>
          {successMessage && <p className={styles.success}>{successMessage}</p>}
          <div className={styles.contenedorButton}>
            <button className={styles.loginButton} type="submit" disabled={isLoading}>
              {isLoading ? "REGISTRANDO..." : "REGISTRARSE"}
            </button>
            <Link href="/login">
              <button className={styles.registerButton} type="button">INICIAR SESIÓN</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
