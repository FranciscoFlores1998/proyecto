import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";
import "../paginas/sesion.css";

export function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Envía las credenciales al backend utilizando fetch
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          tipoUsuario: 2, // Se agrega el tipo de usuario
        }),
      });

      if (!response.ok) {
        throw new Error("Username o contraseña incorrectos");
      }

      const data = await response.json();

      // Guarda el token en el almacenamiento local
      localStorage.setItem("token", data.token);

      // Llama la función para indicar que el usuario está autenticado
      onLogin();

      // Limpia el formulario y el mensaje de error
      setUsername("");
      setPassword("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/registro"); // Redirige a la ruta de registro
  };

  return (
    <Fragment>
      <div className="login-page">
        <div
          className="container"
          style={{
            display: "grid",
            placeItems: "center",
            height: "25%",
            width: "auto",
          }}
        >
          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="login-container">
            <img
              src="/logo.png"
              className="img-circle"
              width={150}
              alt="Logo"
            />
            <h1 className="h3 mb-3 fw-normal text-center">Sistema de partes</h1>
            <div className="form-floating">
              <input
                type="username"
                className="form-control"
                id="username"
                name="username"
                placeholder="rut del voluntario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="txt_correo">Usuario</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="txt_contraseña"
                name="txt_contraseña"
                placeholder="contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="txt_contraseña">Contraseña</label>
            </div>
            <div className="container-center">
              <div className="form-check text-start my-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="remember-me"
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  RECUPERAR
                </label>
              </div>
              <button className="login-button" onClick={handleLogin}>
                Iniciar Sesión
              </button>
              <button
                className="register-button mt-3"
                onClick={handleRegisterRedirect}
              >
                Registrar Usuario
              </button>
              <p className="mt-5 mb-3 text-body-secondary text-center">
                &copy; 2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
