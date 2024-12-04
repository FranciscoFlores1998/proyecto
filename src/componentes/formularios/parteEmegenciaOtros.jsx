import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../formularios/formStyle.css";

export function ParteEmergenciaOtros() {
  //constantes generales
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [confirmSave, setConfirmSave] = useState(false);
  const location = useLocation();
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
    inmuebles: [{ direccionInmueble: "", estadoInmueble: "", tipoInmueble: "" }], //inmueble
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
          : section === "inmuebles"
          ? { direccionInmueble: "", estadoInmueble: "", tipoInmueble: "" }
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
        newErrors.nombreVictima = "El nombre del  es obligatoria";

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});
    setShowModal(true);
  };

  const handleConfirmSave = () => {
    if (confirmSave) {
      console.log("Data guardada:", formData);
      setShowModal(false);
      setConfirmSave(false);
    } else {
      setError("Por favor, confirme que desea guardar los datos");
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
      <div className="button-group">
        <button className="button button-save" onClick={handleSave}>
          Guardar
        </button>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirmar Guardado</h2>
            <label>
              <input
                type="checkbox"
                checked={confirmSave}
                onChange={(e) => setConfirmSave(e.target.checked)}
              />
              Confirmo que deseo guardar los datos
            </label>
            {error.confirm && <p className="error-message">{error.confirm}</p>}
            <div className="modal-buttons">
              <button onClick={handleConfirmSave}>Guardar</button>
              <button onClick={() => setShowModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
