import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "../internos/cardStyle.css";


export function CardMatPel() {
  const navigate = useNavigate();

  const handleNavigation = (path, cod) => {
    navigate(path, { state: { claveEmergencia: cod } });
  };

  return (
    <Fragment>
      <div className="card card-custom">
      <img
              src="/MatPel.png"
              className="card-img"
              alt="Logo"
            />
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
