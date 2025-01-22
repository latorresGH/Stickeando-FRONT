"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Usuario } from "@/types/Usuario";
import axios from "axios";

type UserContextType = {
  user: Usuario | null;
  setUser: (user: Usuario | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);

  // Cargar usuario al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }

    if (storedToken) {
      console.log("Token encontrado:", storedToken); // Depuración
      axios
        .get("http://localhost:3001/api/auth/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          console.log("Respuesta del backend:", response.data); // Depuración
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error al cargar usuario:", error);
          localStorage.removeItem("token");
        });
    }
  }, []);
  

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:3001/api/users/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token); // Guardar el token
      setUser(user); // Guardar datos del usuario en el contexto

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Configurar el token globalmente en Axios
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Eliminar el token
    setUser(null); // Limpiar el usuario
    delete axios.defaults.headers.common["Authorization"]; // Eliminar token de Axios
  };

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};
