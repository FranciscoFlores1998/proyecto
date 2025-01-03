import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_BASE_URL from "../../apiConfig"; // Asegúrate de tener esta configuración
import "../formularios/formStyle.css";

export function ParteEmergenciaRescate() {
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    claveEmergencia: "",
    direccion: "",
    cuadrante: "",
    horaInicio: "",
    horaFin: "",
    fechaEmergencia: "",
    preinforme: "",
    oficialEmergencia: "",
    folioPAsistencia: null,
  });

  useEffect(() => {
    if (location.state && location.state.claveEmergencia) {
      setFormData((prevData) => ({
        ...prevData,
        claveEmergencia: location.state.claveEmergencia,
      }));
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (value) {
      setError((prevError) => ({ ...prevError, [name]: "" }));
    }
  };

  const handleSave = async () => {
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

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    setError({});

    try {
      const response = await fetch(`${API_BASE_URL}/parte-emergencia/crear`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          tipoEmergencia: "Rescate",
          horaInicio: formData.horaInicio,
          horaFin: formData.horaFin,
          fechaEmergencia: formData.fechaEmergencia,
          preInforme: formData.preinforme,
          oficial: formData.oficialEmergencia,
          folioPAsistencia: formData.folioPAsistencia,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al guardar la emergencia.");
      }

      const data = await response.json(); // Respuesta con el folioPEmergencia
      const { folioPEmergencia } = data;

      alert("Emergencia registrada exitosamente.");

      // Navegar a la segunda parte, pasando datos relevantes
      navigate("/parte-emergencia-rescate2", {
        state: {
          claveEmergencia: formData.claveEmergencia,
          direccion: formData.direccion,
          fechaEmergencia: formData.fechaEmergencia,
          folioPEmergencia, // Agregar folioPEmergencia
        },
      });
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleCancel = () => {
    navigate("/emergencia");
  };

  return (
    <div className="form-container">
      <div className="form-container row">
        <h2>Información general</h2>
        <div className="form-group col-3">
          <label htmlFor="claveEmergencia">Clave de la emergencia</label>
          <h2>{formData.claveEmergencia}</h2>
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
          {error.direccion && <p className="error-message">{error.direccion}</p>}
        </div>
        <div className="form-group col-6">
          <label htmlFor="cuadrante">Cuadrante</label>
          <input
            id="cuadrante"
            name="cuadrante"
            placeholder="Indique cuadrante"
            value={formData.cuadrante}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="form-container">
        <h2>Preinforme</h2>
        <textarea
          name="preinforme"
          placeholder="Indique el preinforme"
          value={formData.preinforme}
          onChange={handleChange}
        ></textarea>
        {error.preinforme && (
          <p className="error-message">{error.preinforme}</p>
        )}
      </div>
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
