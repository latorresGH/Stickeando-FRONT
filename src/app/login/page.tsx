"use client";

import { useLogin } from "@/hook/useLogin";

const LoginPage = () => {
  const { email, setEmail, password, setPassword, error, handleLogin } = useLogin();

  return (
    <div className="login-page">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          className="input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="input"
        />
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="login-button">
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
