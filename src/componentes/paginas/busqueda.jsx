import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../apiConfig";

export function BusquedaVoluntario() {
  const [volunteers, setVolunteers] = useState([]); // Lista de todos los voluntarios
  const [formData, setFormData] = useState({
    nombreVol: "",
    fechaNac: "",
    direccion: "",
    numeroContacto: "",
    tipoSangre: "",
    enfermedades: "",
    alergias: "",
    fechaIngreso: "",
    claveRadial: "",
    cargoVoluntario: "",
    rutVoluntario: "",
    idCompania: "",
    idUsuario: null
  });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Fetch inicial para obtener la lista de voluntarios
  useEffect(() => {
    async function fetchVolunteers() {
      try {
        setLoading(true);
        setFetchError(null);

        const response = await fetch(`${API_BASE_URL}voluntario/obtener`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
        });
        if (!response.ok) {
          throw new Error("Error al obtener la lista de voluntarios.");
        }
        const data = await response.json();
        setVolunteers(data); // Poblar la lista de voluntarios
      } catch (error) {
        console.error("Error al cargar voluntarios:", error);
        setFetchError("No se pudo cargar la lista de voluntarios.");
      } finally {
        setLoading(false);
      }
    }

    fetchVolunteers();
  }, []);

  // Función para manejar la selección de un voluntario
  const handleSelectVolunteer = (volunteer) => {
    // Poblar los campos del formulario con los datos del voluntario seleccionado
    setFormData({
      nombreVol: volunteer.nombreVol || "",
      fechaNac: volunteer.fechaNac || "",
      direccion: volunteer.direccion || "",
      numeroContacto: volunteer.numeroContacto || "",
      tipoSangre: volunteer.tipoSangre || "",
      enfermedades: volunteer.enfermedades || "",
      alergias: volunteer.alergias || "",
      fechaIngreso: volunteer.fechaIngreso || "",
      claveRadial: volunteer.claveRadial || "",
      cargoVoluntario: volunteer.cargoVoluntario || "",
      rutVoluntario: volunteer.rutVoluntario || "",
      idCompania: volunteer.idCompania || "",
      idUsuario: volunteer.idUsuario || null
    });
  };

  // Función para manejar cambios en los campos editables
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Método para actualizar voluntario
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(formData.rutVoluntario);
    try {
      const response = await fetch(
        `${API_BASE_URL}voluntario/actualizar/${formData.rutVoluntario}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al actualizar el voluntario.");
      }

      alert("Voluntario actualizado exitosamente.");
      // Actualizar la lista de voluntarios
      setVolunteers((prev) =>
        prev.map((v) =>
          v.rutVoluntario === formData.rutVoluntario ? formData : v
        )
      );
    } catch (error) {
      console.error("Error al actualizar voluntario:", error);
      alert("No se pudo actualizar el voluntario.");
    }
  };

  return (
    <div className="form-container">
      <h1>Búsqueda y Actualización de Voluntarios</h1>

      {/* Mostrar error de carga */}
      {fetchError && <p className="error-message">{fetchError}</p>}
      {loading && <p>Cargando lista de voluntarios...</p>}

      {/* Lista de voluntarios */}
      {!loading && volunteers.length > 0 && (
        <div>
          <h2>Voluntarios</h2>
          <ul className="volunteers-list">
            {volunteers.map((volunteer) => (
              <li
                key={volunteer.rutVoluntario}
                onClick={() => handleSelectVolunteer(volunteer)}
                className="volunteer-item"
                style={{ cursor: "pointer" }}
              >
                {volunteer.nombreVol} - {volunteer.rutVoluntario}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Formulario de actualización */}
      <form onSubmit={handleUpdate}>
        <div className="input-container">
          <label htmlFor="nombreVol">Nombre</label>
          <input
            type="text"
            name="nombreVol"
            value={formData.nombreVol}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="row">
          <div className="input-container col-6">
            <label htmlFor="fechaNac">Fecha de Nacimiento</label>
            <input
              type="date"
              name="fechaNac"
              value={formData.fechaNac}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="input-container col-6">
            <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
            <input
              type="date"
              name="fechaIngreso"
              value={formData.fechaIngreso}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="tipoSangre">Tipo de Sangre</label>
          <input
            type="text"
            name="tipoSangre"
            value={formData.tipoSangre}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="input-container">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="input-container">
          <label htmlFor="numeroContacto">Número de Contacto</label>
          <input
            type="tel"
            name="numeroContacto"
            value={formData.numeroContacto}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="row">
          <div className="input-container col-6">
            <label htmlFor="claveRadial">Clave Radial</label>
            <input
              type="text"
              name="claveRadial"
              value={formData.claveRadial}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          <div className="input-container col-6">
            <label htmlFor="cargoVoluntario">Cargo Voluntario</label>
            <input
              type="text"
              name="cargoVoluntario"
              value={formData.cargoVoluntario}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>

        <div className="input-container">
          <label htmlFor="alergias">Alergias</label>
          <input
            type="text"
            name="alergias"
            value={formData.alergias}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="input-container">
          <label htmlFor="enfermedades">Enfermedades</label>
          <input
            type="text"
            name="enfermedades"
            value={formData.enfermedades}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button type="submit" className="submit-btn button button-save">
          Actualizar
        </button>
      </form>
    </div>
  );
}
