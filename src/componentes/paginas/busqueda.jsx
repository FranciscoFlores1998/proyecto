import React, { useState, useEffect } from "react";
import API_BASE_URL from "../../apiConfig";

export function BusquedaVoluntario() {
  const [volunteers, setVolunteers] = useState([]);
  const [filteredVolunteers, setFilteredVolunteers] = useState([]);
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
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    async function fetchVolunteers() {
      try {
        setLoading(true);
        setFetchError(null);

        const response = await fetch(`${API_BASE_URL}/voluntario/obtener`, {
          method: "GET",
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener la lista de voluntarios.");
        }

        const data = await response.json();
        setVolunteers(data);
        setFilteredVolunteers(data); // Inicialmente muestra todos los voluntarios
      } catch (error) {
        console.error("Error al cargar voluntarios:", error);
        setFetchError("No se pudo cargar la lista de voluntarios.");
      } finally {
        setLoading(false);
      }
    }

    fetchVolunteers();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = volunteers.filter(
      (volunteer) =>
        volunteer.nombreVol.toLowerCase().includes(query) ||
        volunteer.rutVoluntario.toLowerCase().includes(query)
    );

    setFilteredVolunteers(filtered);
  };

  const handleSelectVolunteer = (volunteer) => {
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
    });
  };

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
  };

  return (
    <div className="form-container">
      <h1>Búsqueda y Registro de Voluntarios</h1>

      {/* Mostrar error de carga */}
      {fetchError && <p className="error-message">{fetchError}</p>}
      {loading && <p>Cargando lista de voluntarios...</p>}

      {/* Buscador */}
      <div className="input-container">
        <label htmlFor="search">Buscar Voluntario</label>
        <input
          type="text"
          id="search"
          placeholder="Buscar por nombre o RUT"
          value={searchQuery}
          onChange={handleSearchChange}
          className="form-control"
        />
      </div>

  {/* Lista de voluntarios filtrados */}
{!loading && filteredVolunteers.length > 0 && (
  <div>
    <h2>Resultados</h2>
    <ul className="volunteers-list">
      {filteredVolunteers.slice(0, 10).map((volunteer) => (
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
    {filteredVolunteers.length > 10 && (
      <p className="info-message">Mostrando los primeros 10 resultados.</p>
    )}
  </div>
)}


      {/* Formulario con datos del voluntario */}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="nombreVol">Nombre</label>
          <input
            type="text"
            name="nombreVol"
            value={formData.nombreVol}
            readOnly
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
        <div>
          {/*tipo de sangre*/}
          <div className="input-container">
            <label htmlFor="tipoSangre">Tipo de Sangre</label>
            <input
              type="text"
              name="tipoSangre"
              placeholder=" "
              value={formData.tipoSangre}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {/*alergias*/}
          <div className="input-container">
            <label htmlFor="alergias">Alergias</label>
            <input
              type="text"
              name="alergias"
              placeholder=" "
              value={formData.alergias}
              onChange={handleChange}
              className="form-control"
            />
            
          </div>
          {/*Enfermedades*/}
          <div className="input-container">
            <label htmlFor="enfermedades">Enfermedades</label>
            <input
              type="text"
              name="enfermedades"
              placeholder=" "
              value={formData.enfermedades}
              onChange={handleChange}
              className="form-control"
            />
          
          </div>
        </div>

        <button type="submit" className="button button-save">
          Guardar
        </button>
      </form>
    </div>
  );
}
