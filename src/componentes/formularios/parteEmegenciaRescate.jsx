import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../formularios/formStyle.css";

export function ParteEmergenciaRescate() {
  //constantes generales
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    //variables generales
    claveEmergencia: "", //emergencia
    direccion: "", //emergencia
    cuadrante: "", //emergencia
    horaInicio: "", //parteemergencia
    horaFin: "", //parteemergencia
    fechaEmergencia: "", //parteemergencia
    oficialEmergencia: "", //parteemergencia
    preinforme: "", //parteemergencia
    instituciones: [{ nombreInstitucion: "",  nombreACargo: "", tipoInstitucion: "",  horaLlegada: "" }], //institucion
    victimas: [{ nombreVictima: "", rutVictima: "", edad: "", descripcion: "" }], //victima
    vehiculos: [{ patente: "", marca: "", modelo: "", tipoVehiculo: "" }], //vehiculo
    materialesPs: [{ nombreMatPel: "", llamarEmpresaQuimica: "", clasificacion: "" }], //materiales peligrosos
    moviles: [],
    //variables indibiduales
  });

  useEffect(() => {
    if (location.state && location.state.claveEmergencia) {
      setFormData((prevData) => ({
        ...prevData,
        claveEmergencia: location.state.claveEmergencia,
      }));
    }
  }, [location]);

  const handleChange = (e, index, section) => {
    const { name, value, type, checked } = e.target;
    if (section) {
      setFormData((prevData) => ({
        ...prevData,
        [section]: prevData[section].map((item, i) =>
          i === index
            ? { ...item, [name]: type === "checkbox" ? checked : value }
            : item
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    // Clear error when field is filled
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
          ? { nombreInstitucion: "", nombreACargo: "", tipoInstitucion: "", horaLlegada: "" }
          : section === "victimas"
          ? { nombreVictima: "", rutVictima: "", edad: "", descripcion: "" }
          : section === "vehiculos"
          ? { patente: "", marca: "", modelo: "", tipoVehiculo: "" }
          : section === "materialesPs"
          ? { nombreMatPel: "", llamarEmpresaQuimica: "", clasificacion: "" }
          : {},
      ],
    }));
  };
  const deleteSection = (section, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: prevData[section].filter((_, i) => i !== index),
    }));
  };
  const handleSave = () => {
    const newErrors = {};
    if (!formData.direccion)
      newErrors.direccion = "El campo dirección es obligatorio";
    if (!formData.fechaEmergencia)
      newErrors.fechaEmergencia = "La fecha de emergencia es obligatoria";
    if (!formData.horaInicio)
      newErrors.horaInicio = "La hora de inicio es obligatoria";
    if (!formData.oficialEmergencia)
      newErrors.oficialEmergencia = "El oficial de emergencia es obligatorio";
    if (!formData.preinforme)
      newErrors.preinforme = "El preinforme es obligatorio";
    if (!formData.patente) newErrors.patente = "La patente es obligatoria";
    if(!formData.nombreVictima)
        newErrors.nombreVictima = "El nombre de la victima es obligatoria";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    setError({});
  };
  const handleCancel = () => {
    navigate("/emergencia");
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
      <div className="form-container row">
        <h2>Información general</h2>
        <div className="form-group col-3">
          <label htmlFor="claveEmergencia">Clave de la emergencia</label>
          <h2>{formData.claveEmergencia}</h2>
          {/* Muestra la clave como texto */}
        </div>
        <div className="form-group col-9">
          <label htmlFor="oficialEmergencia">Oficial de la emergencia</label>
          <input
            id="oficialEmergencia"
            name="oficialEmergencia"
            placeholder="Indique oficial de la emergencia"
            value={formData.oficialEmergencia}
            onChange={handleChange}
          />
          {error.oficialEmergencia && (
            <p className="error-message">{error.oficialEmergencia}</p>
          )}
        </div>
        <div className="form-group col-4">
          <label htmlFor="horaInicio">
            Hora de inicio de la emergencia [despacho]
          </label>
          <input
            id="horaInicio"
            name="horaInicio"
            type="time"
            value={formData.horaInicio}
            onChange={handleChange}
          />
          {error.horaInicio && (
            <p className="error-message">{error.horaInicio}</p>
          )}
        </div>
        <div className="form-group col-4">
          <label htmlFor="horaFin">Hora de fin de la emergencia [6-10]</label>
          <input
            id="horaFin"
            name="horaFin"
            type="time"
            value={formData.horaFin}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="fechaEmergencia">Fecha de la emergencia</label>
          <input
            id="fechaEmergencia"
            name="fechaEmergencia"
            type="date"
            value={formData.fechaEmergencia}
            onChange={handleChange}
          />
          {error.fechaEmergencia && (
            <p className="error-message">{error.fechaEmergencia}</p>
          )}
        </div>
        <div className="form-group col-6">
          <label htmlFor="direccion">Dirección de la emergencia</label>
          <input
            id="direccion"
            name="direccion"
            placeholder="Indique dirección de la emergencia"
            value={formData.direccion}
            onChange={handleChange}
          />
          {error.direccion && (
            <p className="error-message">{error.direccion}</p>
          )}
        </div>
        <div className="form-group col-6">
          <label htmlFor="cuadrante">Cuadrante de la emergencia</label>
          <input
            id="cuadrante"
            name="cuadrante"
            placeholder="Indique cuadrante, villa o sector del llamado"
            value={formData.cuadrante}
            onChange={handleChange}
          />
        </div>
      </div>
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
      {/*VEHICULO*/}
      <div className="form-container row">
        <h2>Vehículos involucrados</h2>
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
      {/*PREINFORME*/}
      <div className="form-container">
        <h2>Preinforme</h2>
        <textarea
          name="preinforme"
          placeholder="Indique el preinforme de la emergencia"
          value={formData.preinforme}
          onChange={handleChange}
        ></textarea>
        {error.preinforme && (
          <p className="error-message">{error.preinforme}</p>
        )}
      </div>
      {/*BOTON DE ACCION*/}
      <div style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}>
        <button className="button button-save" onClick={handleSave}>
          Guardar
        </button>
        <button className="button button-delete" onClick={handleCancel}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
