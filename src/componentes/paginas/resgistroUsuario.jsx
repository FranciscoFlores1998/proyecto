import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";
import "../paginas/sesion.css";

export function RegistrarUsuario({ onLogin }) {
  const [username, setUsername] = useState(""); // Campo de nombre de usuario
  const [password, setPassword] = useState(""); // Campo de contraseña
  const [error, setError] = useState(""); // Manejo de errores
    const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Envía las credenciales al backend con tipoUsuario=2
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          username, // Usar el nombre de usuario ingresado
          password,
          tipoUsuario: 2, // Enviar tipo de usuario como 2
        }),
      });

      if (!response.ok) {
        throw new Error("Usuario o contraseña incorrectos");
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
    navigate("/login"); // Redirige a la ruta de registro
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
            <h1 className="h3 mb-3 fw-normal text-center">Registrar Usuario</h1>
            {/* Campo de nombre de usuario */}
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="txt_usuario"
                name="txt_usuario"
                placeholder="Usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="txt_usuario">Usuario</label>
            </div>
            {/* Campo de contraseña */}
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="txt_contraseña"
                name="txt_contraseña"
                placeholder="Contraseña"
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
                  Recordar sesión
                </label>
              </div>
              <button className="register-button" onClick={handleLogin}>
                Registrar
              </button>
              <button
                className="login-button mt-3"
                onClick={handleRegisterRedirect}
              >
                Iniciar sesión
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
