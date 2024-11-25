import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import '../shade/shadeStyle.css'

export function SidebarMenu({ sidebarOpen, toggleSidebar, changePage }) {
    const navigate = useNavigate();

    const handleNavigation = (path,pageTitle) => {
        changePage(pageTitle);
        navigate(path);
        toggleSidebar();
    };
    
    return (
        <Fragment>
            <div className={`sidebar ${sidebarOpen ? "sidebar-active" : ""}`}>
                <div className="sidebar-content">
                    <button className="sidebar-btn" onClick={() => handleNavigation("/Home", "Inicio")}>Inicio</button>
                    <button className="sidebar-btn" onClick={() => handleNavigation("/asistencia", "Parte de Asistencia")}>Parte de Asistencia</button>
                    <button className="sidebar-btn" onClick={() => handleNavigation("/emergencia", "Parte de Emergencia")}>Parte de Emergencia</button>
                    <button className="sidebar-btn" onClick={() => handleNavigation("/estadistica", "Estadísticas")}>Estadísticas</button>
                    <button className="sidebar-btn" onClick={() => handleNavigation("/perfil", "Perfil Usuario")}>Perfil</button>

                </div>
            </div>
        </Fragment>
    );
}