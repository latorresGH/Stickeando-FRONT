"use client";
import style from '@/styles/Login.module.css'
import { useLogin } from "@/hook/useLogin";
import Image from 'next/image';

const LoginPage = () => {
  const { email, setEmail, password, setPassword, error, handleLogin } = useLogin();

  return (
    <div className={style.contenedorLogin}>
      
      <div className={style.loginBoxForm}>
            <img
              className={style.logo}
              src="/images/logo-stickeando.png"
              alt="Logo"
              width={80}
              height={80}
            />
        <h1 className={style.tituloLogin}>LOGIN</h1>
        <form className={style.form} onSubmit={handleLogin}>
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
          {error && <p className={style.error}>{error}</p>}

          <div className={style.contenedorButton}>
            <button type="submit" className={style.loginButton}>
              INICIAR SESIÓN
            </button>

            <button type="submit" className={style.registerButton}>
              REGISTRARME
            </button>
          </div>
        </form>
      </div>

      <div className={style.loginRight}>
      </div>
    </div>
  );
};

export default LoginPage;
