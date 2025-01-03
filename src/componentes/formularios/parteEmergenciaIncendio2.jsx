import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig"; // Asegúrate de tener esta configuración
import "../formularios/formStyle.css";

export function ParteEmergenciaIncendio2() {
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

  const handleSave = async () => {
    // Validaciones
    const newErrors = {};
    if (!formData.folioPEmergencia)
      newErrors.folioPEmergencia = "El folio de la emergencia es obligatorio.";
    if (!formData.claveEmergencia)
      newErrors.claveEmergencia = "La clave de emergencia es obligatoria.";
    if (!formData.direccion)
      newErrors.direccion = "La dirección es obligatoria.";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});

    try {
      const response = await fetch(
        `${API_BASE_URL}/parte-emergencia/completar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Error al guardar los datos adicionales.");
      }

      alert("Datos adicionales registrados exitosamente.");
      navigate("/emergencias");
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleCancel = () => {
    navigate("/emergencias");
  };

  const handleMovilToggle = (movil) => {
    setFormData((prevData) => ({
      ...prevData,
      moviles: prevData.moviles.includes(movil)
        ? prevData.moviles.filter((m) => m !== movil)
        : [...prevData.moviles, movil],
    }));
  };

  return (
    <div className="form-container">
      <h2>Parte de Emergencia - Detalles Adicionales</h2>
      <div className="form-group row">
        <div className="form-group col-2">
          <label htmlFor="folioPEmergencia">Folio de la Emergencia</label>
          <h3>{formData.folioPEmergencia}</h3>
        </div>
        <div className="form-group col-2">
          <label htmlFor="claveEmergencia">Clave de Emergencia</label>
          <h3>{formData.claveEmergencia}</h3>
        </div>
        <div className="form-group col-3">
          <label htmlFor="direccion">Dirección</label>
          <h4>{formData.direccion}</h4>
        </div>
        <div className="form-group col-3">
          <label htmlFor="fechaEmergencia">Fecha de la Emergencia</label>
          <h4>{formData.fechaEmergencia}</h4>
        </div>
      </div>
      {/* Continuar con el resto de las secciones como "instituciones", "inmuebles", etc. */}
{/*INSTITUCION*/}
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
          </>
        ))}
        <button
          className="button-option col-auto"
          onClick={() => addSection("instituciones")}
        >
          Agregar Institución
        </button>
      </div>
      {/*INMUEBLE*/}
      <div className="form-container row">
        <h2>Inmuebles involucrados en la emergencia</h2>
        {formData.inmuebles.map((inmueble, index) => (
          <>
            <div key={index} className="form-group-Data col-11">
              <input
                name="direccionInmueble"
                placeholder="indique dirección exacta"
                value={inmueble.direccionInmueble}
                onChange={(e) => handleChange(e, index, "inmuebles")}
              />
              <input
                name="estadoInmueble"
                placeholder="Indique estado del inmueble"
                value={inmueble.estadoInmueble}
                onChange={(e) => handleChange(e, index, "inmuebles")}
              />

              <select
                name="tipoInmueble"
                value={inmueble.tipoInmueble}
                onChange={(e) => handleChange(e, index, "inmuebles")}
              >
                <option value="">Tipo de inmueble</option>
                <option value="tipoInmueble1">
                  Establecimiento de recreación
                </option>
                <option value="tipoInmueble2">
                  Establecimiento educacional
                </option>
                <option value="tipoInmueble3">Establecimiento estatal</option>
                <option value="tipoInmueble4">
                  Establecimiento hospitalario
                </option>
                <option value="tipoInmueble5">Industria</option>
                <option value="tipoInmueble6">Inmueble de oficinas</option>
                <option value="tipoInmueble7">Inmueble habitacional</option>
                <option value="tipoInmueble8">Local comercial</option>
                <option value="tipoInmueble9">Lugar de culto</option>
                <option value="tipoInmueble10">Vía pública</option>
                <option value="tipoInmueble11">OTRO</option>
              </select>
            </div>
            <div className="col-1">
              <button
                className="button-delete"
                onClick={() => deleteSection("inmuebles", index)}
              >
                ELIMINAR
              </button>
            </div>
          </>
        ))}
        <button
          className="button-option col-auto"
          onClick={() => addSection("inmuebles")}
        >
          Agregar inmueble
        </button>
      </div>
      {/*VEHICULO*/}
      <div className="form-container row">
        <h2>vehículos involucrados</h2>
        {formData.vehiculos.map((vehiculo, index) => (
          <>
            <div key={index} className="form-group-Data col-11">
              <input
                name="patente"
                placeholder="Patente del vehículo"
                value={vehiculo.patente}
                onChange={(e) => handleChange(e, index, "vehiculos")}
              />
              <input
                name="marca"
                placeholder="Marca del vehiculo"
                value={vehiculo.marca}
                onChange={(e) => handleChange(e, index, "vehiculos")}
              />
              <input
                name="modelo"
                placeholder="Modelo del vehículo"
                value={vehiculo.modelo}
                onChange={(e) => handleChange(e, index, "vehiculos")}
              />
              <select
                name="tipoVehiculo"
                value={vehiculo.tipoVehiculo}
                onChange={(e) => handleChange(e, index, "vehiculos")}
              >
                <option value="">Tipo de vehículo</option>
                <option value="tipoVehiculo1">Bicicleta</option>
                <option value="tipoVehiculo2">motocicleta</option>
                <option value="tipoVehiculo3">vehículo de carga mayor</option>
                <option value="tipoVehiculo4">vehículo de carga menor</option>
                <option value="tipoVehiculo5">
                  vehículo de tracción animal
                </option>
                <option value="tipoVehiculo6">
                  vehículo de transporte de personas (+10)
                </option>
                <option value="tipoVehiculo7">
                  vehículo de transporte de personas (-10)
                </option>
                <option value="tipoVehiculo8">vehículo menor</option>
                <option value="tipoVehiculo9">OTRO</option>
              </select>
            </div>
            <div className="col-1">
              <button
                className="button-delete"
                onClick={() => deleteSection("vehiculos", index)}
              >
                ELIMINAR
              </button>
            </div>
          </>
        ))}
        <button
          className="button-option col-auto"
          onClick={() => addSection("vehiculos")}
        >
          Agregar vehiculo
        </button>
      </div>
      {/*MatPel*/}
      <div className="form-container row">
        <h2>Materiales peligros encontrados</h2>
        {formData.materialesPs.map((materialesP, index) => (
          <>
            <div key={index} className="form-group-Data col-11">
              <input
                name="nombreMatPel"
                placeholder="Nombre del material encontrado"
                value={materialesP.nombreMatPel}
                onChange={(e) => handleChange(e, index, "materialesPs")}
              />
              <select
                name="clasificacion"
                value={materialesP.clasificacion}
                onChange={(e) => handleChange(e, index, "materialesPs")}
              >
                <option value="">clasificacion</option>
                <option value="clasificacion1">Explosivos</option>
                <option value="clasificacion2">Gases</option>
                <option value="clasificacion3">Líquidos inflamables</option>
                <option value="clasificacion4">Materiales corrosivos</option>
                <option value="clasificacion5">Materiales oxidantes</option>
                <option value="clasificacion6">Materiales radiactivos</option>
                <option value="clasificacion7">Materiales venenosos</option>
                <option value="clasificacion8">Sólidos inflamables</option>
                <option value="clasificacion9">
                  Otros materiales regulados
                </option>
                <option value="clasificacion10">
                  Se desconoce material y/o procedencia
                </option>
              </select>
              <select
                name="llamarEmpresaQuimica"
                value={materialesP.llamarEmpresaQuimica}
                onChange={(e) => handleChange(e, index, "materialesPs")}
              >
                <option value="">¿Fue necesario llamar a una empresa química?</option>
                <option value={true}>Sí</option>
                <option value={false}>No</option>
              </select>
            </div>
            <div className="col-1">
              <button
                className="button-delete"
                onClick={() => deleteSection("materialesPs", index)}
              >
                ELIMINAR
              </button>
            </div>
          </>
        ))}
        <button
          className="button-option col-auto"
          onClick={() => addSection("materialesPs")}
        >
          Agregar material encontrado
        </button>
      </div>
      {/*VICTIMA*/}
      <div className="form-container row">
        <h2>Involucrados</h2>
        {formData.victimas.map((victima, index) => (
          <>
            <div key={index} className="form-group-Data col-11">
              <input
                name="nombreVictima"
                placeholder="Nombre del involucrado"
                value={victima.nombreVictima}
                onChange={(e) => handleChange(e, index, "victimas")}
              />
              <input
                name="rutVictima"
                placeholder="RUT"
                value={victima.rutVictima}
                onChange={(e) => handleChange(e, index, "victimas")}
              />
              <input
                name="edad"
                type="number"
                placeholder="Edad"
                value={victima.edad}
                onChange={(e) => handleChange(e, index, "victimas")}
              />
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={victima.descripcion}
                onChange={(e) => handleChange(e, index, "victimas")}
              ></textarea>
            </div>
            <div className="col-1">
              <button
                className="button-delete"
                onClick={() => deleteSection("victimas", index)}
              >
                ELIMINAR
              </button>
            </div>
          </>
        ))}
        <button
          className="button-option col-auto"
          onClick={() => addSection("victimas")}
        >
          Agregar involucrado
        </button>
      </div>
      {/*MOVIL*/}
      <div className="form-container">
        <h2>MOVILES asistentes</h2>
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
      </div>
      <div className="form-actions">
        <button className="button button-save" onClick={handleSave}>
          Guardar
        </button>
        <button className="button button-cancel" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
