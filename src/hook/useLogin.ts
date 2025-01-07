import { useState } from "react";
import { useUser } from "@/context/authContext";

export const useLogin = () => {
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password); // Llama a la función de login desde el contexto
      window.location.href = "/home"; // Redirige al usuario a la página principal
    } catch (err) {
      setError("Credenciales incorrectas o problemas en el servidor");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    handleLogin,
  };
};
