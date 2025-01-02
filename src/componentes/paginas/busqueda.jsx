import React, { useState } from "react";
import { SearchableInput } from "./SearchableInput";

export function BusquedaVoluntario() {
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [formData, setFormData] = useState({
    nombre: "",
    FechaNacimento: "",
    direccion: "",
    telefono: "",
    fechaIngreso: "",
    cargoVoluntario: "",
    claveRadial: "",
    tipoSangre: "",
    alergias: "",
    enfermedades: "",
  });
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  // Función para manejar la selección de un voluntario
  const handleSelectVolunteer = async (volunteer) => {
    try {
      setLoading(true);
      setFetchError(null);

      // Llamar a la API para obtener los datos del voluntario
      const response = await fetch(`/api/volunteers/${volunteer.id}`);
      if (!response.ok) {
        throw new Error("Error al obtener datos del voluntario");
      }

      const data = await response.json();

      // Poblar los campos del formulario con los datos del voluntario
      setFormData({
        nombre: data.nombre || "",
        FechaNacimento: data.fechaNacimiento || "",
        direccion: data.direccion || "",
        telefono: data.telefono || "",
        fechaIngreso: data.fechaIngreso || "",
        cargoVoluntario: data.cargoVoluntario || "",
        claveRadial: data.claveRadial || "",
        tipoSangre: data.tipoSangre || "",
        alergias: data.alergias || "",
        enfermedades: data.enfermedades || "",
      });

      // Agregar el voluntario a la lista de seleccionados
      if (!selectedVolunteers.find((v) => v.id === volunteer.id)) {
        setSelectedVolunteers((prev) => [...prev, volunteer]);
      }
    } catch (error) {
      console.error("Error al cargar datos del voluntario:", error);
      setFetchError("No se pudieron cargar los datos del voluntario.");
    } finally {
      setLoading(false);
    }
  };

  // Función para manejar cambios en los campos editables
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    console.log("Voluntarios seleccionados:", selectedVolunteers);
    // Aquí se podrían enviar los datos editables a la API
  };

  return (
    <div className="form-container">
      <h1>Búsqueda y Registro de Voluntarios</h1>

      {/* Búsqueda de voluntarios */}
      <div className="form-group">
        <label htmlFor="busquedaNombreRut">Búsqueda por NOMBRE o RUT</label>
        <SearchableInput
          placeholder="Buscar por nombre o RUT"
          data={selectedVolunteers} // Opcional: inicializar con voluntarios existentes
          onSelect={handleSelectVolunteer}
          searchKeys={["nombre", "rut"]}
        />
      </div>

      {fetchError && <p className="error-message">{fetchError}</p>}
      {loading && <p>Cargando datos del voluntario...</p>}

      {/* Formulario de registro */}
      <form onSubmit={handleSubmit}>
        {/* Campos solo lectura */}
        <div className="input-container">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            readOnly
            className="form-control"
          />
        </div>

        <div className="row">
          <div className="input-container col-6">
            <label htmlFor="FechaNacimento">Fecha de Nacimiento</label>
            <input
              type="date"
              name="FechaNacimento"
              value={formData.FechaNacimento}
              readOnly
              className="form-control"
            />
          </div>
          <div className="input-container col-6">
            <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
            <input
              type="date"
              name="fechaIngreso"
              value={formData.fechaIngreso}
              readOnly
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
            readOnly
            className="form-control"
          />
        </div>

        {/* Campos editables */}
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
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            name="telefono"
            value={formData.telefono}
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
          Guardar
        </button>
      </form>
    </div>
  );
}
