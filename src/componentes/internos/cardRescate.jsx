import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import "../internos/cardStyle.css";

export function CardRescate() {
  const navigate = useNavigate();

  const handleNavigation = (path, cod) => {
    navigate(path, { state: { claveEmergencia: cod } });
  };
  return (
    <Fragment>
      <div className="card card-custom">
        <img src="https://picsum.photos/200" className="card-img" alt="..." />
        <div className="card-body">
          <h2 className="card-title">Rescates</h2>
        </div>
        <div className="card-footer">
          <div className="card-footer">
            <button
              className="btn btn-primary btn-custom"
              onClick={() => handleNavigation("/perescate", "10-3")}
            >
              10-3 Rescate de persona
            </button>
            <button
              className="btn btn-primary btn-custom"
              onClick={() => handleNavigation("/perescate", "10-4")}
            >
              10-4 Rescate vehícular
            </button>
            <button
              className="btn btn-primary btn-custom"
              onClick={() => handleNavigation("/perescate", "10-14")}
            >
              10-14 Llamado accidentes aéreos
            </button>
            <button
              className="btn btn-primary btn-custom"
              onClick={() => handleNavigation("/perescate", "10-16")}
            >
              10-16 Rescate animal
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
