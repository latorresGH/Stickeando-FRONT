"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Usuario } from "@/types/Usuario";
import axios from "axios";

type UserContextType = {
  user: Usuario | null;
  token: string | null; // Agregar el token por separado
  setUser: (user: Usuario | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null); // Estado para el token

  // Cargar usuario al iniciar
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (!storedToken) {
      console.log("No hay token, usuario no autenticado.");
      return; // Evita hacer la petición si no hay token
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    setToken(storedToken); // Almacenamos el token

    axios
      .get("https://stickeando.onrender.com/api/auth/me")
      .then((response) => {
        console.log("Usuario autenticado:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          console.log("Token inválido o expirado, cerrando sesión automáticamente.");
          localStorage.removeItem("token");
          setUser(null);
          setToken(null); // Limpiar token
          delete axios.defaults.headers.common["Authorization"];
        } else {
          console.error("Error al obtener el usuario:", error);
        }
      });
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("https://stickeando.onrender.com/api/users/login", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      setUser(user);
      setToken(token); // Almacenamos el token
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null); // Limpiar token
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <UserContext.Provider value={{ user, token, setUser, setToken, login, logout }}>
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
