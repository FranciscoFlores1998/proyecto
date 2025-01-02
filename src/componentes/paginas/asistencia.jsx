import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SearchableInput } from "./SearchableInput";

const allVolunteers = [
  { id: 1, nombre: "Juan Pérez", rut: "12345678-9", claveRadial: "41" },
  { id: 2, nombre: "María González", rut: "98765432-1", claveRadial: "71" },
  { id: 3, nombre: "Carlos Rodríguez", rut: "11223344-5", claveRadial: "103" },
  { id: 4, nombre: "Carlos ", rut: "11223344-5", claveRadial: "113" },
  { id: 5, nombre: " Rodríguez", rut: "111111-5", claveRadial: "183" },
  { id: 6, nombre: "Carlos sdaa", rut: "2222-5", claveRadial: "193" },
  {
    id: 7,
    nombre: "asdcqav f Rodríguez",
    rut: "1122334554544-5",
    claveRadial: "201",
  },
];

export function Asistencia() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [formData, setFormData] = useState({
    tipoLlamado: "",
    aCargoDelCuerpo: "",
    oficialEmergencia: "",
    fechaEmergencia: "",
    horaInicio: "",
    horaFin: "",
    direccion: "",
    observacion: "",
    moviles: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (value) setError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSave = () => {
    const newErrors = {};
    const requiredFields = [
      "direccion",
      "fechaEmergencia",
      "horaInicio",
      "oficialEmergencia",
      "aCargoDelCuerpo",
      "observacion",
    ];
    requiredFields.forEach((field) => {
      if (!formData[field])
        newErrors[field] = `El campo ${field} es obligatorio`;
    });
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
    } else {
      setError({});
    }
  };
  const handleCancel = () => {
    navigate("/inicio");
  };

  const handleMovilToggle = (movil) => {
    setFormData((prev) => ({
      ...prev,
      moviles: prev.moviles.includes(movil)
        ? prev.moviles.filter((m) => m !== movil)
        : [...prev.moviles, movil],
    }));
  };

  const handleSelectVolunteer = (volunteer) => {
    if (!selectedVolunteers.find((v) => v.id === volunteer.id)) {
      setSelectedVolunteers((prev) => [...prev, volunteer]);
    }
  };

  const handleRemoveVolunteer = (id) => {
    setSelectedVolunteers((prev) => prev.filter((v) => v.id !== id));
  };

  const sortedVolunteers = useMemo(() => {
    return [...selectedVolunteers].sort((a, b) =>
      a.claveRadial.localeCompare(b.claveRadial)
    );
  }, [selectedVolunteers]);

  return (
    <div className="form-container">
      <div className="form-container row">
        <h2>Información general</h2>
        <div className="form-group col-3">
          <label htmlFor="tipoLlamado">Acto de servicio</label>
          <select
            id="tipoLlamado"
            name="tipoLlamado"
            value={formData.tipoLlamado}
            onChange={handleChange}
          >
            <option value="">Seleccione...</option>
            <option value="tipoLlamado1">Reunión ordinaria</option>
            <option value="tipoLlamado2">Reunión extraordinaria</option>
            <option value="tipoLlamado3">Ejercicio reglamentario</option>
            <option value="tipoLlamado4">Ejercicio académico</option>
            <option value="tipoLlamado5">Ejercicio de especialidad</option>
            <option value="tipoLlamado6">Ejercicio de presentación</option>
            <option value="tipoLlamado7">Campaña económica</option>
            <option value="tipoLlamado8">1ra ALARMA DE INCENCIO</option>
            <option value="tipoLlamado9">2da ALARMA DE INCENCIO</option>
            <option value="tipoLlamado10">3ra ALARMA DE INCENCIO</option>
            <option value="tipoLlamado11">ACUARTELAMIENTO GENERAL</option>
            <option value="tipoLlamado12">ACUARTELAMIENTO PREVENTIVO</option>
            <option value="tipoLlamado13">Entrenamiento estándar</option>
            <option value="tipoLlamado14">Citación de COMANDANCIA</option>
            <option value="tipoLlamado15">Citación de SUPERINTENDENCIA</option>
            <option value="tipoLlamado16">Romería</option>
            <option value="tipoLlamado17">Sesión solemne</option>
          </select>
        </div>
        <div className="form-group col-3">
          <label htmlFor="aCargoDelCuerpo">Citación realizada por</label>
          <select
            name="aCargoDelCuerpo"
            value={formData.aCargoDelCuerpo}
            onChange={handleChange}
          >
            <option value="">Seleccione..</option>
            <option value="tipoInstitucion1">SUPERINTENDENCIA</option>
            <option value="tipoInstitucion2">COMANDANCIA</option>
            <option value="tipoInstitucion3">COMANDANCIA</option>
          </select>
          {error.aCargoDelCuerpo && (
            <p className="error-message">{error.aCargoDelCuerpo}</p>
          )}
        </div>
        <div className="form-group col-6">
          <label htmlFor="oficialEmergencia">Oficial a cargo</label>
          <input
            id="oficialEmergencia"
            name="oficialEmergencia"
            placeholder="Indique oficial a cargo"
            value={formData.oficialEmergencia}
            onChange={handleChange}
          />
          {error.oficialEmergencia && (
            <p className="error-message">{error.oficialEmergencia}</p>
          )}
        </div>
        <div className="form-group col-4">
          <label htmlFor="horaInicio">Hora de inicio</label>
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
          <label htmlFor="horaFin">Hora de fin</label>
          <input
            id="horaFin"
            name="horaFin"
            type="time"
            value={formData.horaFin}
            onChange={handleChange}
          />
        </div>
        <div className="form-group col-4">
          <label htmlFor="fechaEmergencia">Fecha</label>
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
          <label htmlFor="direccion">Dirección</label>
          <input
            id="direccion"
            name="direccion"
            placeholder="Indique dirección"
            value={formData.direccion}
            onChange={handleChange}
          />
          {error.direccion && (
            <p className="error-message">{error.direccion}</p>
          )}
        </div>
        <div className="form-group col-6">
          <label htmlFor="observacion">Observaciones</label>
          <textarea
            name="observacion"
            placeholder="Indique la observación"
            value={formData.observacion}
            onChange={handleChange}
          ></textarea>
          {error.observacion && (
            <p className="error-message">{error.observacion}</p>
          )}
        </div>
      </div>

      <div className="form-container">
        <h2>ASISTENCIA</h2>
        <div className="form-container row">
          <h3 className="col-12">Búsqueda de asistentes</h3>
          <div className="form-group col-4">
            <label htmlFor="busquedaNombreRut">Búsqueda por NOMBRE o RUT</label>
            <SearchableInput
              placeholder="Buscar por nombre o RUT"
              data={allVolunteers}
              onSelect={handleSelectVolunteer}
              searchKeys={["nombre", "rut"]}
              selectedVolunteers={selectedVolunteers}
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="busquedaClaveRadial">
              Búsqueda por CLAVE RADIAL
            </label>
            <SearchableInput
              placeholder="Buscar por clave radial"
              data={allVolunteers}
              onSelect={handleSelectVolunteer}
              searchKeys={["claveRadial"]}
              selectedVolunteers={selectedVolunteers}
            />
          </div>
        </div>

        <div className="form-container selected-volunteers ">
          <h3>Voluntarios asistentes </h3>
          {sortedVolunteers.length > 0 ? (
            <ul>
              {sortedVolunteers.map((volunteer) => (
                <li className="row" key={volunteer.id} style={{ padding: 2 }}>
                  <div className="col-4 " style={{ gap: 10 }}>
                    {volunteer.nombre} - {volunteer.rut}
                  </div>
                  <div className="col-1 text-center">
                    {" "}
                    {volunteer.claveRadial}
                  </div>
                  <button
                    className="button button-delete col-auto"
                    onClick={() => handleRemoveVolunteer(volunteer.id)}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay voluntarios asistentes</p>
          )}
        </div>
      </div>

      <div className="form-container">
        <h2>Móviles asistentes</h2>
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

      {/* Botones de acción */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
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
