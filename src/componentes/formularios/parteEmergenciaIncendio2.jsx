import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig";
import "../formularios/formStyle.css";

export function ParteEmergenciaIncendio2() {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [formData, setFormData] = useState({
    folioPEmergencia: null,
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

  const handleSaveSection = async (section, endpoint) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          formData[section].map((item) => ({
            ...item,
            folioPEmergencia: formData.folioPEmergencia,
          }))
        ),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar la sección ${section}.`);
      }

      alert(`Sección ${section} guardada exitosamente.`);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleSaveMoviles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/moviles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moviles: formData.moviles,
          folioPEmergencia: formData.folioPEmergencia,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar los móviles.");
      }

      alert("Móviles guardados exitosamente.");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleMovilToggle = (movil) => {
    setFormData((prevData) => ({
      ...prevData,
      moviles: prevData.moviles.includes(movil)
        ? prevData.moviles.filter((m) => m !== movil)
        : [...prevData.moviles, movil],
    }));
  };

  const handleCancel = () => {
    navigate("/emergencia");
  };

  return (
    <div className="form-container">
      <h2>Parte de Emergencia - Detalles Adicionales</h2>
      <div className="form-group row">
        <div className="form-group col-3">
          <label>Folio de la Emergencia:</label>
          <h3>{formData.folioPEmergencia}</h3>
        </div>
        <div className="form-group col-3">
          <label>Clave de Emergencia:</label>
          <h3>{formData.claveEmergencia}</h3>
        </div>
        <div className="form-group col-3">
          <label>Dirección:</label>
          <h3>{formData.direccion}</h3>
        </div>
        <div className="form-group col-3">
          <label>Fecha de la Emergencia:</label>
          <h3>{formData.fechaEmergencia}</h3>
        </div>
      </div>

      {/* Instituciones */}
      <div className="form-section">
        <h2>Instituciones</h2>

        <div className="form-container row">
          <h2>Instituciones asistentes a la emergencia</h2>
          {formData.instituciones.map((institucion, index) => (
            <>
              <div key={index} className="form-group-Data col-11">
                <input
                  name="nombreInstitucion"
                  placeholder="Nombre de la institución"
                  value={institucion.nombreInstitucion}
                  onChange={(e) => handleChange(e, index, "instituciones")}
                />
                <input
                  name="nombreACargo"
                  placeholder="Nombre de la persona a cargo"
                  value={institucion.nombreACargo}
                  onChange={(e) => handleChange(e, index, "instituciones")}
                />
                <select
                  name="tipoInstitucion"
                  value={institucion.tipoInstitucion}
                  onChange={(e) => handleChange(e, index, "instituciones")}
                >
                  <option value="">Tipo de Institución</option>
                  <option value="tipoInstitucion1">Servicios electricos</option>
                  <option value="tipoInstitucion2">Servicios de gas</option>
                  <option value="tipoInstitucion3">Militar</option>
                  <option value="tipoInstitucion4">Orden y Seguridad</option>
                  <option value="tipoInstitucion5">Salud</option>
                  <option value="tipoInstitucion6">Social</option>
                  <option value="tipoInstitucion7">OTROS</option>
                </select>
                <input
                  name="horaLlegada"
                  type="time"
                  placeholder="Hora de llegada"
                  value={institucion.horaLlegada}
                  onChange={(e) => handleChange(e, index, "instituciones")}
                />
              </div>
              <div className="col-1">
                <button
                  className="button-delete"
                  onClick={() => deleteSection("instituciones", index)}
                >
                  ELIMINAR
                </button>
              </div>
        <button
        className="button button-save"
          onClick={() => handleSaveSection("instituciones", "institucion/crear")}
        >
          Guardar Instituciones
        </button>
            </>
          ))}
        </div>
      </div>

      {/* Vehículos */}
      <div className="form-section">
        <h2>Vehículos</h2>
        {/* Similar estructura para vehículos */}
        <button onClick={() => handleSaveSection("vehiculos", "vehiculos")}>
          Guardar Vehículos
        </button>
      </div>

      {/* Víctimas */}
      <div className="form-section">
        <h2>Víctimas</h2>
        {/* Similar estructura para víctimas */}
        <button onClick={() => handleSaveSection("victimas", "victimas")}>
          Guardar Víctimas
        </button>
      </div>

      {/* Inmuebles */}
      <div className="form-section">
        <h2>Inmuebles</h2>
        {/* Similar estructura para inmuebles */}
        <button onClick={() => handleSaveSection("inmuebles", "inmuebles")}>
          Guardar Inmuebles
        </button>
      </div>

      {/* Materiales Peligrosos */}
      <div className="form-section">
        <h2>Materiales Peligrosos</h2>
        {/* Similar estructura para materiales */}
        <button
          onClick={() =>
            handleSaveSection("materialesPs", "materiales-peligrosos")
          }
        >
          Guardar Materiales Peligrosos
        </button>
      </div>

      {/* Móviles */}
      <div className="form-section">
        <h2>Móviles</h2>
        <div className="button-option-group">
          {["Movil1", "Movil2", "Movil3"].map((movil) => (
            <button
              key={movil}
              className={`button-option ${
                formData.moviles.includes(movil) ? "active" : ""
              }`}
              onClick={() => handleMovilToggle(movil)}
            >
              {movil}
            </button>
          ))}
        </div>
        <button className="button button-save" onClick={handleSaveMoviles}>
          Guardar Móviles
        </button>
      </div>

      <div className="form-actions">
        <button className="button-delete" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
