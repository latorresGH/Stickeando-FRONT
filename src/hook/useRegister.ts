// hooks/useRegister.ts
import { useState } from "react";
import axios from "axios";

interface RegisterUser {
  nombre: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
  user: any;
  carrito: any;
}

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const registerUser = async (usuario: RegisterUser, productosCarrito: any[]) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post<RegisterResponse>(
        "http://localhost:3001/api/users/register", 
        { 
          nombre: usuario.nombre,
          email: usuario.email,
          password: usuario.password,
          productosCarrito 
        }
      );

      // Si el registro es exitoso, guardamos el carrito
      if (response.data.carrito) {
        localStorage.setItem('carrito', JSON.stringify(response.data.carrito));
      }

      setSuccessMessage(response.data.message);
    } catch (err: any) {
      setError("Hubo un error al registrar el usuario. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    registerUser,
    isLoading,
    error,
    successMessage
  };
};

export default useRegister;
