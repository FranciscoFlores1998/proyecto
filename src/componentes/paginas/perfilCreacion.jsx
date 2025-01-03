import React, { useState, useMemo, Fragment } from "react";
import API_BASE_URL from "../../apiConfig"; // Asegúrate de que esté correctamente configurado

export function PerfilCreador() {
  const [formData, setFormData] = useState({
    nombreVol: "",
    fechaNac: "",
    direccion: "",
    numeroContacto: "",
    tipoSangre: "",
    enfermedades: "",
    alergias: "",
    fechaIngreso: "",
    cargoVoluntario: "",
    claveRadial: "",
    rutVoluntario: "",
    idCompania: "",
    idUsuario: null,

  });

  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState(null);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (value) setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const validateRut = (rut) => {
    const cleanRut = rut.replace(/[^0-9kK]/g, ""); // Eliminar puntos y guiones
    if (cleanRut.length < 2) {
      return false;
    }

    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();

    // Calcular dígito verificador
    let sum = 0;
    let multiplier = 2;

    for (let i = body.length - 1; i >= 0; i--) {
      sum += multiplier * parseInt(body[i], 10);
      multiplier = multiplier === 7 ? 2 : multiplier + 1;
    }

    const calculatedDv = 11 - (sum % 11);
    const validDv = calculatedDv === 11 ? "0" : calculatedDv === 10 ? "K" : calculatedDv.toString();

    return validDv === dv;
  };
  // Validar campos requeridos
  const validateFields = () => {
    const newErrors = {};
    const requiredFields = [
      { field: "nombreVol", message: "El campo 'Nombre' es obligatorio" },
      { field: "rutVoluntario", message: 'El campo "RUT" es obligatorio' },
      {
        field: "tipoSangre",
        message: "El campo 'Tipo de Sangre' es obligatorio",
      },
      {
        field: "fechaIngreso",
        message: "El campo 'Fecha de Ingreso' es obligatorio",
      },
      {
        field: "claveRadial",
        message: "El campo 'Clave Radial' es obligatorio",
      },
      {
        field: "cargoVoluntario",
        message: "El campo 'Cargo Voluntario' es obligatorio",
      },
    ];

    requiredFields.forEach(({ field, message }) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = message;
      }
    });
    if (formData.rutVoluntario && !validateRut(formData.rutVoluntario)) {
        newErrors.rutVoluntario = "El RUT ingresado no es válido";
      }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Guardar datos
  const handleSave = async () => {
    if (validateFields()) {
      try {
        const response = await fetch(`${API_BASE_URL}/voluntario/crear`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al guardar el perfil.");
        }

        alert("Perfil guardado exitosamente.");
        setFormData({
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
          idUsuario: ""
        });
        setErrors({});
      } catch (err) {
        setBackendError(err.message);
      }
    }
  };

  // Resetear formulario
  const handleDelete = () => {
    setFormData({
      nombreVol: "",
      fechaNac: "",
      direccion: "",
      numeroContacto: "",
      fechaIngreso: "",
      cargoVoluntario: "",
      claveRadial: "",
      tipoSangre: "",
      alergias: "",
      enfermedades: "",
    });
    setErrors({});
    setBackendError(null);
  };

  return (
    <Fragment>
      <div className="form-container">
        <h3>Información Personal del Voluntario</h3>

        {backendError && <p className="error-message">{backendError}</p>}

        {/* Campos del formulario */}
        <div className="input-container">
          <label htmlFor="idCompania">COMPAÑÍA</label>
          <input
            type="text"
            name="idCompania"
            placeholder="Compañía a la que pertenece"
            value={formData.idCompania}
            onChange={handleChange}
            className="form-control"
          />
          {errors.idCompania && <p className="error-message">{errors.idCompania}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="nombreVol">Nombre</label>
          <input
            type="text"
            name="nombreVol"
            placeholder="Nombres + Apellidos"
            value={formData.nombrevol}
            onChange={handleChange}
            className="form-control"
          />
          {errors.nombrevol && <p className="error-message">{errors.nombreVol}</p>}
        </div>
        <div className="input-container">
          <label htmlFor="rutVoluntario">Rut voluntario</label>
          <input
            type="text"
            name="rutVoluntario"
            placeholder="Sin puntos ni guión"
            value={formData.rutVoluntario}
            onChange={handleChange}
            className="form-control"
          />
          {errors.rutVoluntario && <p className="error-message">{errors.rutVoluntario}</p>}
        </div>

        <div className="input-container">
          <label htmlFor="fechaNac">Fecha de Nacimiento</label>
          <input
            type="date"
            name="fechaNac"
            value={formData.fechaNac}
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
          <label htmlFor="numeroContacto">Teléfono</label>
          <input
            type="text"
            name="numeroContacto"
            value={formData.numeroContacto}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="input-container">
          <label htmlFor="fechaIngreso">Fecha de Ingreso</label>
          <input
            type="date"
            name="fechaIngreso"
            value={formData.fechaIngreso}
            onChange={handleChange}
            className="form-control"
          />
          {errors.fechaIngreso && (
            <p className="error-message">{errors.fechaIngreso}</p>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="claveRadial">Clave Radial</label>
          <input
            type="text"
            name="claveRadial"
            value={formData.claveRadial}
            onChange={handleChange}
            className="form-control"
          />
          {errors.claveRadial && (
            <p className="error-message">{errors.claveRadial}</p>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="cargoVoluntario">Cargo Voluntario</label>
          <input
            type="text"
            name="cargoVoluntario"
            value={formData.cargoVoluntario}
            onChange={handleChange}
            className="form-control"
          />
          {errors.cargoVoluntario && (
            <p className="error-message">{errors.cargoVoluntario}</p>
          )}
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
          {errors.tipoSangre && (
            <p className="error-message">{errors.tipoSangre}</p>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="alergias">Alergias</label>
          <textarea
            name="alergias"
            value={formData.alergias}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>

        <div className="input-container">
          <label htmlFor="enfermedades">Enfermedades</label>
          <textarea
            name="enfermedades"
            value={formData.enfermedades}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>

        {/* Botones */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "1rem",
          }}
        >
          <button className="button button-delete" onClick={handleDelete}>
            Reset
          </button>
          <button className="button button-save" onClick={handleSave}>
            Guardar
          </button>
        </div>
      </div>
    </Fragment>
  );
}
