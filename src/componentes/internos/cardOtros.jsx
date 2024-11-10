import React, { Fragment } from "react";
import '../internos/cardStyle.css'

export function CardOtros() {
    return (
        <Fragment>
            <div className="card card-custom" >
                <img src="https://picsum.photos/200" className="card-img" alt="..." />
                <div className="card-body">
                    <h2 className="card-title">Otros Servicios</h2>
                </div>
                <div className="card-footer" >
                <div className="dropdown">
                        <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Selecciona una emergencia
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a className="dropdown-item" href="#">10-8 Emergencia No Clasificada</a></li>
                            <li><a className="dropdown-item" href="#">10-9 Otros Servicios</a></li>
                            <li><a className="dropdown-item" href="#">10-11 Apoyo Aereonave</a></li>
                            <li><a className="dropdown-item" href="#">10-12 Apoyo a otros Cuerpos</a></li>
                            <li><a className="dropdown-item" href="#">10-13 Presencia de Artefacto Explosivo</a></li>
                            <li><a className="dropdown-item" href="#">10-17 Simulacro</a></li>
                        </ul>
                    </div>
                    <a href="#" className="btn btn-primary btn-custom" >10-8 Emergencia No Clasificada</a>
                    <a href="#" className="btn btn-primary btn-custom" >10-9 Otros Servicios</a>
                    <a href="#" className="btn btn-primary btn-custom" >10-11 Apoyo Aereonave</a>
                    <a href="#" className="btn btn-primary btn-custom" >10-12 Apoyo a otros Cuerpos</a>
                    <a href="#" className="btn btn-primary btn-custom" >10-13 Presencia de Artefacto Explosivo</a>
                    <a href="#" className="btn btn-primary btn-custom" >10-17 Simulacro</a>
                </div>
            </div>
        </Fragment>
    );
}