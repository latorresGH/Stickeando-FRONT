"use client";

import React from "react";
import { useUser } from "@/context/authContext";
import styles from "@/styles/HeaderAdmin.module.css"; // Importamos el CSS module
import Link from "next/link";
import Image from "next/image";

const HeaderAdmin = () => {
  const { user } = useUser();
  console.log(user);

  return (
    <header className={styles.header}>
      <nav className={styles.navHeader}>
        <ul className={styles.menu}>
          <div className={styles.navContainer}>

          <div className={styles.logoContainer}>
            <Link href="/home" className={styles.logoLink}>
              <Image 
                src="/images/logo-stickeando.png"
                alt={`Logo de la tienda"}`}
                width={500}
                height={500}
                className={styles.logo}
                >
              </Image>
              <p className={styles.tituloStickeando}>Stickeando</p>
            </Link>
          </div>

          <div className={styles.navLinks}>

            <li className={styles.listItem}>
              
              <Link href="/admin/productos" className={styles.links}><svg className={styles.svgs} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.9126 15.9336C9.94668 16.1928 11.0951 16.2391 12.2688 16.0337" stroke="#141414" strokeWidth="1.5" strokeLinecap="round"></path> <ellipse cx="14.5094" cy="9.77405" rx="1" ry="1.5" transform="rotate(-15 14.5094 9.77405)" fill="#141414"></ellipse> <ellipse cx="8.71402" cy="11.3278" rx="1" ry="1.5" transform="rotate(-15 8.71402 11.3278)" fill="#141414"></ellipse> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 12.6477 21.7004 13.2503 21.2424 13.7083L13.7083 21.2424C13.2503 21.7004 12.6477 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#141414" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M12 22C12 19.2071 12 17.8107 12.3928 16.688C13.0964 14.6773 14.6773 13.0964 16.688 12.3928C17.8107 12 19.2071 12 22 12" stroke="#141414" strokeWidth="1.5"></path> </g></svg><p>Gestion</p></Link>
            </li>
            <li className={styles.listItem}>
              
              <Link href="/admin/categorias" className={styles.links}><svg className={styles.svgs} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M18.6695 2H16.7695C14.5895 2 13.4395 3.15 13.4395 5.33V7.23C13.4395 9.41 14.5895 10.56 16.7695 10.56H18.6695C20.8495 10.56 21.9995 9.41 21.9995 7.23V5.33C21.9995 3.15 20.8495 2 18.6695 2Z" fill="#141414"></path> <path opacity="0.4" d="M7.24 13.4302H5.34C3.15 13.4302 2 14.5802 2 16.7602V18.6602C2 20.8502 3.15 22.0002 5.33 22.0002H7.23C9.41 22.0002 10.56 20.8502 10.56 18.6702V16.7702C10.57 14.5802 9.42 13.4302 7.24 13.4302Z" fill="#141414"></path> <path d="M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z" fill="#141414"></path> <path d="M17.7099 21.9999C20.0792 21.9999 21.9999 20.0792 21.9999 17.7099C21.9999 15.3406 20.0792 13.4199 17.7099 13.4199C15.3406 13.4199 13.4199 15.3406 13.4199 17.7099C13.4199 20.0792 15.3406 21.9999 17.7099 21.9999Z" fill="#141414"></path> </g></svg><p>Categorias</p></Link>
            </li>
            <li>
              <Link href="/admin/ordenes" className={styles.links}><svg className={styles.svgs} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20C20.55 6 21 6.45 21 7V17C21 17.55 20.55 18 20 18H4C3.45 18 3 17.55 3 17V7C3 6.45 3.45 6 4 6Z" stroke="#141414" strokeWidth="1.5"></path> <path d="M12.9999 14L15.9999 17L12.9999 20" stroke="#141414" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8.99988 14L5.99988 17L8.99988 20" stroke="#141414" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M2 7H22" stroke="#141414" strokeWidth="1.5"></path> </g></svg><p>Ordenes</p></Link>
            </li>

            
          </div>
          </div>
          <div className={styles.userInfo}>
            {!user ? (
              // No autenticado
              <div className={styles.authLinks}>
                <Link className={styles.register} href="/register">
                  Registrarme
                </Link>
                <Link className={styles.login} href="/login">
                  Iniciar sesión
                </Link>
              </div>
            ) : (
              <div className={styles.userDetails}>
                {/* Foto de perfil */}
                {user.foto_perfil ? (
                  <Link href={`/profile`}>
                    <Image
                      className={styles.profilePic}
                      src={`https://stickeando.onrender.com${user.foto_perfil}`}
                      alt={`Foto de perfil de ${user.nombre || "usuario"}`}
                      width={500}
                      height={500}
                    />
                  </Link>
                ) : (
                  <span className={styles.initials}>
                    {user.nombre ? user.nombre[0].toUpperCase() : "?"}
                  </span>
                )}

                {/* Nombre del usuario */}
                <span className={styles.userName}>{user.nombre || "Usuario"}</span>
              </div>
            )}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
