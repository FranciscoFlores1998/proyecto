import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import '../internos/cardStyle.css'

import '../imagenes/INCENDIO.png'

export function CardIncendio() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <Fragment>
            <div className="card card-custom">
                <img src="https://picsum.photos/200" className="card-img" alt="..." />
                <div className="card-body">
                    <h2 className="card-title" >INCENDIO</h2>
                </div>
                <div className="card-footer" >

                    <button
                        className="btn btn-primary btn-custom"
                        onClick={() => handleNavigation("/peINCENDIO")}>
                        10-0 Incendio Casa Habitación</button>
                    <button
                        className="btn btn-primary btn-custom"
                        onClick={() => handleNavigation("/peINCENDIO")}>
                        10-1 Incendio en Vehiculo</button>
                    <button
                        className="btn btn-primary btn-custom"
                        onClick={() => handleNavigation("/peINCENDIO")}>
                        10-2 Incendio Forestal</button>
                    <button
                        className="btn btn-primary btn-custom"
                        onClick={() => handleNavigation("/peINCENDIO")}>
                        10-7 Incendio Electrico</button>
                    <button
                        className="btn btn-primary btn-custom"
                        onClick={() => handleNavigation("/peINCENDIO")}>
                        10-10 Rebrote de Incendio</button>
                    <button
                        className="btn btn-primary btn-custom"
                        onClick={() => handleNavigation("/peINCENDIO")}>
                        10-15 Inflamación de ducto de Chimenea</button>
                </div>
            </div>
        </Fragment>
    );
}