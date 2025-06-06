"use client";

import React, { useState, useRef, useEffect } from "react";
import { useUser } from "@/context/authContext";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie"; // Importamos js-cookie para manejar cookies
import styles from "@/styles/Header.module.css";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, logout } = useUser();
  const router = useRouter();
  const [carritoUuid, setCarritoUuid] = useState<string | null>(null);

  useEffect(() => {
    let storedUuid = Cookies.get("carrito_uuid"); // Obtenemos la cookie

    if (!storedUuid) {
      storedUuid = crypto.randomUUID(); // Genera un UUID si no existe
      Cookies.set("carrito_uuid", storedUuid, { expires: 7, path: "/" }); // Guarda el UUID en la cookie
    }

    setCarritoUuid(storedUuid);
  }, []);

  const handleLogout = () => {
    logout(); // Cierra sesión
    router.push("/home"); // Redirige a la página de inicio
  };

  // Se usa el carritoUuid si el usuario no está logueado
  const carritoLink = user ? `/carrito/${user.id}` : `/carrito/${carritoUuid}`;

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
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node) &&
      photoRef.current &&
      !photoRef.current.contains(event.target as Node)
    ) {
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
          <div className={styles.logoContainer}>
            <Link href="/home">
              <Image
                className={styles.logo}
                src="/images/logo-stickeando.png"
                alt="Logo"
                width={60}
                height={60}
              />
            </Link>

            <Link href="/products">Productos</Link>
          </div>

          <div>
            <div className={styles.menuLinks}>
              {/* <li className={styles.active}>
                <Link href="/products">Productos</Link>
              </li> */}
              <li className={styles.active}>
                {/* <Link href="/contacto">Contacto</Link> */}
              </li>
              <li>
                <Link href={carritoLink}>
                  <svg
                    className={styles.carritoLink}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H13M19 15.5H17"
                        stroke="#cfcfcf"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                      <path
                        d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                        stroke="#cfcfcf"
                        strokeWidth="1.5"
                      ></path>{" "}
                      <path
                        d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                        stroke="#cfcfcf"
                        strokeWidth="1.5"
                      ></path>{" "}
                      <path
                        d="M5 6H8M5.5 13H16.0218C16.9812 13 17.4609 13 17.8366 12.7523C18.2123 12.5045 18.4013 12.0636 18.7792 11.1818L19.2078 10.1818C20.0173 8.29294 20.4221 7.34853 19.9775 6.67426C19.5328 6 18.5054 6 16.4504 6H12"
                        stroke="#cfcfcf"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      ></path>{" "}
                    </g>
                  </svg>
                </Link>{" "}
                {/* Enlace corregido aquí */}
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
                  <span className={styles.mensajeNombre}>
                    {" "}
                    Hola! {user.nombre || "Usuario"}
                  </span>

                  {/* Foto de perfil */}
                  {user.foto_perfil ? (
                    <Image
                      ref={photoRef}
                      className={styles.profilePic}
                      src={`https://stickeando.onrender.com${user.foto_perfil}`}
                      alt={`Foto de perfil de ${user.nombre || "usuario"}`}
                      onClick={toggleMenu}
                      width={500}
                      height={500}
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
                      <button
                        onClick={handleLogout}
                        className={styles.logoutButton}
                      >
                        Cerrar sesión
                      </button>
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
