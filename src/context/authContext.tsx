"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Usuario } from "@/types/Usuario";

type UserContextType = {
  user: Usuario | null;
  setUser: (user: Usuario | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Usuario | null>(null); // Inicialmente no autenticado

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
