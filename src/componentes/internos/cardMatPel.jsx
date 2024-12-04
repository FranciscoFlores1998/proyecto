import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "../internos/cardStyle.css";

import "../imagenes/INCENDIO.png";

export function CardMatPel() {
  const navigate = useNavigate();

  const handleNavigation = (path, cod) => {
    navigate(path, { state: { claveEmergencia: cod } });
  };

  return (
    <Fragment>
      <div className="card card-custom">
        <img src="https://picsum.photos/200" className="card-img" alt="..." />
        <div className="card-body">
          <h2 className="card-title">Materiales Peligrosos</h2>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-primary btn-custom"
            onClick={() => handleNavigation("/pehazmat", "10-5")}
          >
            10-5 Emergencia HazMat
          </button>
          <button
            className="btn btn-primary btn-custom"
            onClick={() => handleNavigation("/pehazmat", "10-6")}
          >
            10-6 Emanación de gas
          </button>
        </div>
      </div>
    </Fragment>
  );
}
