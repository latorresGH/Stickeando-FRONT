"use client";

import React from "react";
import { useUser } from "@/context/authContext";
import "@/styles/header.css";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="header">
      <nav className="navHeader">
        <ul className="menu">
          <Image className="logo"
            src="/images/Stickeando-icon.webp"
            alt="Logo"
            width={55}
            height={55}
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
                <Link 
                className="login"
                href="/login"
                >
                  Iniciar sesión
                </Link>
              ) : (
                <div>
                  {/* Foto y nombre */}
                  {user.foto_perfil ? (
                    <img src={user.foto_perfil} alt={user.nombre} />
                  ) : (
                    <span>{user.nombre[0].toUpperCase()}</span>
                  )}
                  <span>{user.nombre}</span>

                  {/* Mostrar "Panel administrador" solo si es administrador */}
                  {user.rol === "administrador" && (
                    <Link href="/admin">
                      Panel administrador
                    </Link>
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
