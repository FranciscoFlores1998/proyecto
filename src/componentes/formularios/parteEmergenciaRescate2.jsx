import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig"; // Asegúrate de tener esta configuración
import "../formularios/formStyle.css";

export function ParteEmergenciaRescate2() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    folioPEmergencia: null, // Agregado para almacenar el folio
    claveEmergencia: "",
    direccion: "",
    fechaEmergencia: "",
    instituciones: [
      {
        nombreInstitucion: "",
        nombreACargo: "",
        tipoInstitucion: "",
        horaLlegada: "",
      },
    ],
    victimas: [
      { nombreVictima: "", rutVictima: "", edad: "", descripcion: "" },
    ],
    vehiculos: [{ patente: "", marca: "", modelo: "", tipoVehiculo: "" }],
    inmuebles: [
      { direccionInmueble: "", estadoInmueble: "", tipoInmueble: "" },
    ],
    materialesPs: [
      { nombreMatPel: "", llamarEmpresaQuimica: "", clasificacion: "" },
    ],
    moviles: [],
  });

  // Inicializar con los datos pasados desde la primera parte
  useEffect(() => {
    if (location.state) {
      setFormData((prevData) => ({
        ...prevData,
        folioPEmergencia: location.state.folioPEmergencia || null,
        claveEmergencia: location.state.claveEmergencia || "",
        direccion: location.state.direccion || "",
        fechaEmergencia: location.state.fechaEmergencia || "",
      }));
    }
  }, [location]);

  const handleChange = (e, index, section) => {
    const { name, value } = e.target;
    if (section) {
      setFormData((prevData) => ({
        ...prevData,
        [section]: prevData[section].map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    if (value) {
      setError((prevError) => ({ ...prevError, [name]: "" }));
    }
  };

  const addSection = (section) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: [
        ...prevData[section],
        section === "instituciones"
          ? {
              nombreInstitucion: "",
              nombreACargo: "",
              tipoInstitucion: "",
              horaLlegada: "",
            }
          : section === "victimas"
          ? { nombreVictima: "", rutVictima: "", edad: "", descripcion: "" }
          : section === "vehiculos"
          ? { patente: "", marca: "", modelo: "", tipoVehiculo: "" }
          : section === "inmuebles"
          ? { direccionInmueble: "", estadoInmueble: "", tipoInmueble: "" }
          : { nombreMatPel: "", llamarEmpresaQuimica: "", clasificacion: "" },
      ],
    }));
  };

  const deleteSection = (section, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };
}