"use client";
import style from "@/styles/Login.module.css";
import { useLogin } from "@/hook/useLogin";
import Image from "next/image";

const LoginPage = () => {
  const { email, setEmail, password, setPassword, error, handleLogin } =
    useLogin();

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

        <div className={style.cajaForm}>

        <form className={style.form} onSubmit={handleLogin}>

          <div>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="input"
            />

<svg className={style.inputIcons} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="style=bulk"> <g id="email"> <path id="vector (Stroke)" fillRule="evenodd" clipRule="evenodd" d="M2.86466 4.1379C3.92465 3.15363 5.38503 2.75 7 2.75H17C18.615 2.75 20.0754 3.15363 21.1353 4.1379C22.2054 5.13152 22.75 6.60705 22.75 8.5V15.5C22.75 17.393 22.2054 18.8685 21.1353 19.8621C20.0754 20.8464 18.615 21.25 17 21.25H7C5.38503 21.25 3.92465 20.8464 2.86466 19.8621C1.79462 18.8685 1.25 17.393 1.25 15.5V8.5C1.25 6.60705 1.79462 5.13152 2.86466 4.1379Z" fill="#212121"></path> <path id="vector (Stroke)_2" fillRule="evenodd" clipRule="evenodd" d="M19.3633 7.31026C19.6166 7.63802 19.5562 8.10904 19.2285 8.3623L13.6814 12.6486C12.691 13.4138 11.3089 13.4138 10.3185 12.6486L4.77144 8.3623C4.44367 8.10904 4.38328 7.63802 4.63655 7.31026C4.88982 6.98249 5.36083 6.9221 5.6886 7.17537L11.2356 11.4616C11.6858 11.8095 12.3141 11.8095 12.7642 11.4616L18.3113 7.17537C18.6391 6.9221 19.1101 6.98249 19.3633 7.31026Z" fill="#d9d9d9"></path> </g> </g> </g></svg>
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="input"
            />

<svg className={style.inputIcons} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#212121"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.0151 13.6556C14.8093 14.3587 16.9279 13.9853 18.3777 12.5355C20.3304 10.5829 20.3304 7.41709 18.3777 5.46447C16.4251 3.51184 13.2593 3.51184 11.3067 5.46447C9.85687 6.91426 9.48353 9.03288 10.1866 10.8271M12.9964 13.6742L6.82843 19.8422L4.2357 19.6065L4 17.0138L10.168 10.8458M15.5493 8.31568V8.29289" stroke="#212121" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>

          </div>
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
      </div>

      <div className={style.loginRight}></div>
    </div>
  );
};

export default LoginPage;
