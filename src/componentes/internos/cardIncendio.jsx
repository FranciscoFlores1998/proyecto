import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "../internos/cardStyle.css";

import "../imagenes/INCENDIO.png";

export function CardIncendio() {
  const navigate = useNavigate();

  const handleNavigation = (path, cod) => {
    navigate(path, { state: { claveEmergencia: cod } });
  };

  return (
    <Fragment>
      <div className="card card-custom">
        <img src="https://picsum.photos/200" className="card-img" alt="..." />
        <div className="card-body">
          <h2 className="card-title">Incendios</h2>
        </div>
        <div className="card-footer">
          <button
            className="btn btn-primary btn-custom"
            onClick={() => handleNavigation("/peincendio", "10-0")}
          >
            10-0 Llamado estructural
          </button>
          <button
            className="btn btn-primary btn-custom"
            onClick={() => handleNavigation("/peincendio", "10-1")}
          >
            10-1 Fuego en vehículo
          </button>
          <button
            className="btn btn-primary btn-custom"
            onClick={() => handleNavigation("/peincendio", "10-2")}
          >
            10-2 Fuego en pastizal
          </button>
          <button
            className="btn btn-primary btn-custom"
            onClick={() => handleNavigation("/peincendio", "10-7")}
          >
            10-7 Emergencia eléctrica
          </button>
          <button
            className="btn btn-primary btn-custom"
            onClick={() => handleNavigation("/peincendio", "10-10")}
          >
            10-10 Llamado a escombros (rebrotes)
          </button>
          <button
            className="btn btn-primary btn-custom"
            onClick={() => handleNavigation("/peincendio", "10-15")}
          >
            10-15 Inflamación de estufa
          </button>
        </div>
      </div>
    </Fragment>
  );
}
