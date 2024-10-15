import React, { Fragment } from "react";

export function Cabecera() {

    return (
        <Fragment>
            <header className="navbar d-flex justify-content-between navbar-transparent align-items-center ml-2 mb-4">
                {/* LADO IZQUERDO */}
                <div className="navbar-brand-left d-flex align-items-center">
                    <button className="btn btn">
                        <i className="bi bi-list fs-1">MENU</i>
                    </button>
                </div>
                {/* CENTRAL*/}
                <div className="navbar-center d-flex justify-content-center">
                    <h1>CENTRO</h1>
                </div>
                {/* LADO DERECHO*/}
                <div className="navbar-brand-right d-flex align-items-center">
                    <h1>DERECHA</h1>
                </div>
            </header>
        </Fragment>
    );
}