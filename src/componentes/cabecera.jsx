import React, { Fragment, useState } from "react";

export function Cabecera() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    return (
        <Fragment>
            <header>
                {/* */}
                <div className="navbar-brand-left d-flex align-items-center">
                    <button
                        className="openbtn"
                        onClick={toggleSidebar}
                        aria-label="Abrir menú de navegación"
                        type="button"
                    >
                        ☰ Abrir Sidebar
                    </button>

                    <div className={`sidebar ${isOpen ? "sidebar-active" : ""}`}>
                        {/* Cambiar el enlace para cerrar por un botón */}
                        <button className="closebtn" onClick={toggleSidebar} aria-label="Cerrar menú de navegación">
                            &times;
                        </button>

                        {/* Cambiar los enlaces vacíos por botones o enlaces reales */}
                        <button>Enlace 1</button>
                        <button>Enlace 2</button>
                        <button>Enlace 3</button>
                        <button>Enlace 4</button>
                    </div>

                </div>
                {/* */}
                <div className="navbar-center d-flex justify-content-center">
                    <h1>CENTRO</h1>
                </div>
                {/* */}
                <div className="navbar-brand-right d-flex align-items-center">
                    <h3>DERECHA</h3>
                </div>
            </header>
        </Fragment>
    );
}