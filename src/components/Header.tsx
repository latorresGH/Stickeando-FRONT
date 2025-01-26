"use client";

import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@/context/authContext";
import Link from "next/link";
import Image from "next/image";
import styles from '@/styles/Header.module.css'

const Header = () => {
  const { user } = useUser();
  
  // Estado para controlar la visibilidad del menú
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Referencia al menú desplegable para detectar clics fuera de él
  const menuRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLImageElement | null>(null);
  
  // Función para manejar el clic en la foto de perfil
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para cerrar el menú si se hace clic fuera de él
  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node) && photoRef.current && !photoRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  // Añadir y limpiar el evento de clic fuera del menú
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.header}>
      <nav className={styles.navHeader}>
        <ul className={styles.menu}>
          <Link href="/home">
            <Image
              className={styles.logo}
              src="/images/logo-stickeando.png"
              alt="Logo"
              width={60}
              height={60}
            />
          </Link>
          <div>
            <div className={styles.menuLinks}>
              <li className={styles.active}>
                <Link href="/products">Productos</Link>
              </li>
              <li className={styles.active}>
                <Link href="/contacto">Contacto</Link>
              </li>

              {!user ? (
                <div className={styles.newUser}>
                  <Link className={styles.register} href="/register">
                    Registrarme
                  </Link>

                  <Link className={styles.login} href="/login">
                    Iniciar sesión
                  </Link>
                </div>
              ) : (
                <div className={styles.userMenu}>
                  {/* Nombre del usuario */}
                  <span>{user.nombre || "Usuario"}</span>

                  {/* Foto de perfil */}
                  {user.foto_perfil ? (
                    <img
                      ref={photoRef}
                      className={styles.profilePic}
                      src={`http://localhost:3001${user.foto_perfil}`}
                      alt={`Foto de perfil de ${user.nombre || "usuario"}`}
                      onClick={toggleMenu}
                    />
                  ) : (
                    <span onClick={toggleMenu}>
                      {user.nombre ? user.nombre[0].toUpperCase() : "?"}
                    </span>
                  )}

                  {/* Menú desplegable */}
                  {isMenuOpen && (
                    <div ref={menuRef} className={styles.dropdownMenu}>
                      {user.rol === "administrador" && (
                        <Link href="/admin">Panel administrador</Link>
                      )}
                      <Link href="/profile">Mi perfil</Link>
                      <Link href="/logout">Cerrar sesión</Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
