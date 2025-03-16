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

          <div className={styles.navLinks}>

            <li className={styles.listItem}>
            
              <Link href="/home" className={styles.links}><svg className={styles.svgs} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M2.5192 7.82274C2 8.77128 2 9.91549 2 12.2039V13.725C2 17.6258 2 19.5763 3.17157 20.7881C4.34315 22 6.22876 22 10 22H14C17.7712 22 19.6569 22 20.8284 20.7881C22 19.5763 22 17.6258 22 13.725V12.2039C22 9.91549 22 8.77128 21.4808 7.82274C20.9616 6.87421 20.0131 6.28551 18.116 5.10812L16.116 3.86687C14.1106 2.62229 13.1079 2 12 2C10.8921 2 9.88939 2.62229 7.88403 3.86687L5.88403 5.10813C3.98695 6.28551 3.0384 6.87421 2.5192 7.82274ZM9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z" fill="#141414"></path> </g></svg><p>Inicio</p></Link>
            </li>
            <li className={styles.listItem}>
              
              <Link href="/admin/productos" className={styles.links}><svg className={styles.svgs} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8.9126 15.9336C9.94668 16.1928 11.0951 16.2391 12.2688 16.0337" stroke="#141414" strokeWidth="1.5" strokeLinecap="round"></path> <ellipse cx="14.5094" cy="9.77405" rx="1" ry="1.5" transform="rotate(-15 14.5094 9.77405)" fill="#141414"></ellipse> <ellipse cx="8.71402" cy="11.3278" rx="1" ry="1.5" transform="rotate(-15 8.71402 11.3278)" fill="#141414"></ellipse> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 12.6477 21.7004 13.2503 21.2424 13.7083L13.7083 21.2424C13.2503 21.7004 12.6477 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#141414" strokeWidth="1.5" strokeLinecap="round"></path> <path d="M12 22C12 19.2071 12 17.8107 12.3928 16.688C13.0964 14.6773 14.6773 13.0964 16.688 12.3928C17.8107 12 19.2071 12 22 12" stroke="#141414" strokeWidth="1.5"></path> </g></svg><p>Stickers</p></Link>
            </li>
            <li className={styles.listItem}>
              
              <Link href="/admin/categorias" className={styles.links}><svg className={styles.svgs} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="0.4" d="M18.6695 2H16.7695C14.5895 2 13.4395 3.15 13.4395 5.33V7.23C13.4395 9.41 14.5895 10.56 16.7695 10.56H18.6695C20.8495 10.56 21.9995 9.41 21.9995 7.23V5.33C21.9995 3.15 20.8495 2 18.6695 2Z" fill="#141414"></path> <path opacity="0.4" d="M7.24 13.4302H5.34C3.15 13.4302 2 14.5802 2 16.7602V18.6602C2 20.8502 3.15 22.0002 5.33 22.0002H7.23C9.41 22.0002 10.56 20.8502 10.56 18.6702V16.7702C10.57 14.5802 9.42 13.4302 7.24 13.4302Z" fill="#141414"></path> <path d="M6.29 10.58C8.6593 10.58 10.58 8.6593 10.58 6.29C10.58 3.9207 8.6593 2 6.29 2C3.9207 2 2 3.9207 2 6.29C2 8.6593 3.9207 10.58 6.29 10.58Z" fill="#141414"></path> <path d="M17.7099 21.9999C20.0792 21.9999 21.9999 20.0792 21.9999 17.7099C21.9999 15.3406 20.0792 13.4199 17.7099 13.4199C15.3406 13.4199 13.4199 15.3406 13.4199 17.7099C13.4199 20.0792 15.3406 21.9999 17.7099 21.9999Z" fill="#141414"></path> </g></svg><p>Categorias</p></Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
