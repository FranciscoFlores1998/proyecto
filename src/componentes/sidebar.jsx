import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

//<i className="bi bi-x"></i>
export function SidebarMenu({ sidebarOpen, toggleSidebar, changePage }) {
    const navigate = useNavigate();

    const handelNavigation = (path,pageTitle) => {
        changePage(pageTitle);
        navigate(path);
        toggleSidebar();
    }
    return (
        <Fragment>
            <div className={`sidebar ${sidebarOpen ? "sidebar-active" : ""}`}>
                <button onClick={()=> handelNavigation("/Home", "Inicio")}>Inicio</button>
                <button onClick={()=> handelNavigation("/asistenica", "Parte de Asistencia")}>Parte de Asistencia</button>
                <button onClick={()=> handelNavigation("/emergencia", "Parte de Emergencia")}>Parte de Emergencia</button>
                <button onClick={()=> handelNavigation("/estadistisca", "Estadisticas")}>Estadisticas</button>

            </div>
        </Fragment>
    );
}