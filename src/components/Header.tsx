"use client";

import React from "react";
import { useUser } from "@/context/authContext";

const Header = () => {
  const { user } = useUser();

  return (
    <header>
      <h1>Mi Aplicación</h1>
      <nav>
        {!user ? (
          // No autenticado
          <button>
            Iniciar sesión
          </button>
        ) : (
          <div>
            {/* Foto y nombre */}
            {user.foto_perfil ? (
              <img
                src={user.foto_perfil}
                alt={user.nombre}
              />
            ) : (
              <span>
                {user.nombre[0].toUpperCase()}
              </span>
            )}
            <span>{user.nombre}</span>

            {/* Mostrar "Panel administrador" solo si es administrador */}
            {user.rol === "administrador" && (
              <button>
                Panel administrador
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
