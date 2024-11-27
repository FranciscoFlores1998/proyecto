import React, { Fragment } from "react";
import '../shade/shadeStyle.css'

export function Cabecera({toggleSidebar, pageTitle}) {

    return (
        <Fragment>
            <header className="navbar d-flex justify-content-between navbar-transparent align-items-center ml-2 mb-4">
                {/* LADO IZQUERDO */}
                <div className="navbar-brand-left d-flex align-items-center">
                    <button className="btn btn" onClick={toggleSidebar}>
                        <i className="bi bi-list fs-1">MENU</i>
                    </button>
                </div>
                {/* CENTRAL*/}
                <div className="navbar-center d-flex justify-content-center">
                    {/*CONDICIONAL X PAGINA*/}
                    <h1>{pageTitle}</h1>
                </div>
                {/* LADO DERECHO*/}
                <div className="navbar-brand-right d-flex align-items-center">
                    
                    {/*LOGO Y CIERRE SESIÓN*/}
                </div>
            </header>
        </Fragment>
    );
}