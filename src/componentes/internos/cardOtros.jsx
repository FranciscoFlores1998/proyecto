import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "../internos/cardStyle.css";

export function CardOtros() {
  const navigate = useNavigate();

  const handleNavigation = (path, cod) => {
    navigate(path, { state: { claveEmergencia: cod } });
  };
  return (
    <Fragment>
      <div className="card card-custom">
        <img
          src="/bomberos.png"
          className="card-img"
          alt="Logo"
        />
        <div className="card-body">
          <h2 className="card-title">Otros Servicios</h2>
        </div>
        <div className="card-footer">
          <div className="card-footer">
            <button
              className="btn btn-primary btn-custom"
              onClick={() => handleNavigation("/peotros", "10-8")}
            >
              10-8 Emergencia no clasificada y/o verificación
            </button>
            <button
              className="btn btn-primary btn-custom"
              onClick={() => handleNavigation("/peotros", "10-9")}
            >
              10-9 Otros Servicios
            </button>
            <button
              className="btn btn-primary btn-custom"
              onClick={() => handleNavigation("/peotros", "10-11")}
            >
              10-11 Apoyo aeréos
            </button>
            <button
              className="btn btn-primary btn-custom"
              onClick={() => handleNavigation("/peotros", "10-12")}
            >
              10-12 Apoyo a otros Cuerpos
            </button>
            <button
              className="btn btn-primary btn-custom"
              onClick={() => handleNavigation("/peotros", "10-13")}
            >
              10-13 Llamado a atentados terroristas
            </button>
            <button
              className="btn btn-primary btn-custom"
              onClick={() => handleNavigation("/peotros", "10-17")}
            >
              10-17 Simulacro
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
