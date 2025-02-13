"use client"
import React, { createContext, useContext, useState } from "react";
import { CarritoProducto } from "../types/CarritoProducto"; // Asegúrate de importar la interfaz correcta

interface CarritoContextType {
  carrito: CarritoProducto[];
  setCarrito: React.Dispatch<React.SetStateAction<CarritoProducto[]>>;
}

const CarritoContext = createContext<CarritoContextType | undefined>(undefined);

export const CarritoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [carrito, setCarrito] = useState<CarritoProducto[]>([]);

  return (
    <CarritoContext.Provider value={{ carrito, setCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

export const useCarritoContext = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error("useCarritoContext debe usarse dentro de un CarritoProvider");
  }
  return context;
};