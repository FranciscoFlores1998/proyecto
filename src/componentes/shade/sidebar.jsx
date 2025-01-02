import React, { Fragment, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../shade/shadeStyle.css";

export function SidebarMenu({ sidebarOpen, toggleSidebar, changePage }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleNavigation = (path, pageTitle) => {
    changePage(pageTitle);
    navigate(path);
    toggleSidebar();
    setActiveDropdown(null);
  };

  const toggleDropdown = (title) => {
    setActiveDropdown(activeDropdown === title ? null : title);
  };

  const isActive = (path) => location.pathname === path;

  const menuOptions = [
    {
      title: "Inicio",
      options: [
        { name: "Dashboard", path: "/Home", pageTitle: "Inicio " },
      ],
    },
    {
      title: "Parte de Asistencia",
      options: [
        {
          name: "Crear asistencia",
          path: "/asistencia",
          pageTitle: "Parte de Asistencia",
        },
        {
          name: "Ver asistencias",
          path: "/asistencia/lista",
          pageTitle: "Lista de partes de asistencias",
        },
      ],
    },
    {
      title: "Parte de Emergencia",
      options: [
        {
          name: "Crear parte de emergencia",
          path: "/emergencia",
          pageTitle: "Crear Parte de Emergencia",
        },
        {
          name: "Ver partes de emergencias",
          path: "/emergencia/lista",
          pageTitle: "Lista de partes de emergencias",
        },
      ],
    },
    {
      title: "Estadísticas",
      options: [
        {
          name: "Estadísticas general",
          path: "/estadistica",
          pageTitle: "Estadísticas Generales",
        },
      ],
    },
    {
      title: "Perfil",
      options: [
        {
          name: "Ver Perfil",
          path: "/perfil",
          pageTitle: "Ver Perfil Usuario",
        },
      ],
    },
    {
      title: "Busqueda",
      options: [
        {
          name: "buscar voluntarios",
          path: "/busqueda",
          pageTitle: "Busqueda de voluntarios",
        },
      ],
    },
  ];

  return (
    <Fragment>
      <div className={`sidebar ${sidebarOpen ? "sidebar-active" : ""}`}>
        <div className="sidebar-content">
          {menuOptions.map((menuItem, index) => (
            <div key={index} className="sidebar-menu-item">
              {menuItem.options.length === 1 ? (
                <button
                  className={`sidebar-btn ${
                    isActive(menuItem.options[0].path) ? "active" : ""
                  }`}
                  onClick={() =>
                    handleNavigation(
                      menuItem.options[0].path,
                      menuItem.options[0].pageTitle
                    )
                  }
                >
                  {menuItem.title}
                </button>
              ) : (
                <>
                  <button
                    className={`sidebar-btn ${
                      activeDropdown === menuItem.title ? "active" : ""
                    }`}
                    onClick={() => toggleDropdown(menuItem.title)}
                    aria-expanded={activeDropdown === menuItem.title}
                    aria-controls={`dropdown-${index}`}
                  >
                    {menuItem.title}
                  </button>
                  {activeDropdown === menuItem.title && (
                    <div id={`dropdown-${index}`} className="sidebar-dropdown">
                      {menuItem.options.map((option, optionIndex) => (
                        <button
                          key={optionIndex}
                          className={`sidebar-dropdown-btn ${
                            isActive(option.path) ? "active" : ""
                          }`}
                          onClick={() =>
                            handleNavigation(option.path, option.pageTitle)
                          }
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

