/*COMPONENTES: REACT*/
import React, { Fragment, useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

/*COMPONENTES: CSS/ESTILOS*/
import '../src/style.css';

/*COMPONENTES: NAVEGADOR*/
import { Cabecera } from "./componentes/shade/cabecera";
import { SidebarMenu } from "./componentes/shade/sidebar";

/*COMPONENTES: PAGINAS*/
import { Home } from "./componentes/paginas/home";
import { Emergencia } from "./componentes/paginas/emergencia";
import { Asistencia } from "./componentes/paginas/asistencia";
import { Estadisticas } from "./componentes/paginas/estadistica";
import { Login } from "./componentes/paginas/login";
import { ProtectedRoute } from "./componentes/shade/ProtectedRoute";
import { ParteEmergenciaIncendio } from "./componentes/formularios/parteEmegenciaIncendio";
import { PerfilUsuario } from "./componentes/paginas/perfil";


export function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState('Inicio');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";

    // Función para alternar el estado del sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);

    };

    // Función para cambiar el título de la página
    const changePage = (page) => setCurrentPage(page);

    useEffect(() => {
        // Verifica si hay un token en el localStorage
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    return (
        <Fragment>
            {/* Renderizar cabecera y sidebar solo si no estamos en la página de login */}
            {!isLoginPage && (
                <>
                    <Cabecera toggleSidebar={toggleSidebar} pageTitle={currentPage} />
                    <SidebarMenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} changePage={changePage} />
                </>
            )}
            <Routes>
                {/*<Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
                <Route path="/home" element={
                    <ProtectedRoute isAuthenticated={isAuthenticated}>
                        <Home />
                    </ProtectedRoute>
                } />*/}
                <Route
                    path="/Home"
                    element={
                        <Home></Home>
                    }></Route>
                <Route
                    path="/asistencia"
                    element={
                        <Asistencia></Asistencia>
                    }></Route>
                <Route
                    path="/emergencia"
                    element={
                        <Emergencia></Emergencia>
                    }></Route>
                <Route
                    path="/estadistica"
                    element={
                        <Estadisticas></Estadisticas>
                    }></Route>
                <Route
                    path="/peincendio"
                    element={
                        <ParteEmergenciaIncendio></ParteEmergenciaIncendio>
                    }></Route>
                <Route
                    path="/perfil"
                    element={
                        <PerfilUsuario></PerfilUsuario>
                    }></Route>
            </Routes>
        </Fragment>
    );
}
