import { useState } from "react";
import axios from "axios";
import { useUser } from "@/context/authContext";
import { Usuario } from "@/types/Usuario";
import { Carrito } from "@/types/Carrito";

interface RegisterUser {
  nombre: string;
  email: string;
  password: string;
}

interface ProductoCarrito {
  id: number;
  titulo: string;
  precio: number;
  cantidad: number;
  imagen_url: string;
}


export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { setUser } = useUser(); // Usa el contexto para actualizar el usuario

  const registerUser = async (usuario: RegisterUser, productosCarrito: ProductoCarrito[]) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
  
    try {
      const response = await axios.post<{
        message: string;
        user: Usuario;
        token: string;
        carrito?: Carrito;
      }>("https://stickeando.onrender.com/api/users/register", {
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password,
        productosCarrito,
      });
  
      const { token, user, carrito } = response.data;
  
      localStorage.setItem("token", token); // Guarda el token
      if (carrito) {
        localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda el carrito
      }
  
      setUser(user); // Actualiza el usuario en el contexto
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`; // Configura Axios
  
      setSuccessMessage("Registro exitoso, redirigiendo...");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Hubo un error al registrar el usuario. Intenta nuevamente.");
      }
    }
     finally {
      setIsLoading(false);
    }
  };
  

  return { registerUser, isLoading, error, successMessage };
};
