"use client";

import React from "react";
import { useUser } from "@/context/authContext";
import "@/styles/header.css";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <header className="header">
      <nav className="navHeader">
        <ul className="menu">
          <Image className="logo"
            src="/images/logo-stickeando.png"
            alt="Logo"
            width={60}
            height={60}
          />
          <div>
            <div className="menuLinks">
              <li>
                <Link href="/productos">
                  Productos
                </Link>
              </li>
              <li>
                <Link href="/contacto">
                  Contacto
                </Link>
              </li>

              {!user ? (
                // No autenticado
                <div className="newUser">
                  <Link 
                  className="register"
                  href="/register"
                  >
                    Registrarme
                  </Link>

                  <Link 
                  className="login"
                  href="/login"
                  >
                    Iniciar sesión
                  </Link>
                </div>
) : (
  <div className="userMenu">
    {/* Nombre del usuario */}
    <span>{user.nombre || "Usuario"}</span>

    {/* Foto de perfil */}
    {user.foto_perfil ? (
          <img 
          className="profilePic"
          src={`http://localhost:3001${user.foto_perfil}`} 
          alt={`Foto de perfil de ${user.nombre || "usuario"}`} 
        />
    ) : (
      <span>{user.nombre ? user.nombre[0].toUpperCase() : "?"}</span>
    )}

    {/* Mostrar "Panel administrador" solo si es administrador */}
    {user.rol === "administrador" && (
      <Link href="/admin">
        Panel administrador
      </Link>
    )}
  </div>
)
}
            </div>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
