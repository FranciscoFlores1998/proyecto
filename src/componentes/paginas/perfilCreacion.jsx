import React, { Fragment, useState } from "react";
import "../formularios/formStyle.css";

export function PerfilUsuario() {
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

    const [errors, setErrors] = useState({});

    // Función para manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Función para validar los campos
    const validateFields = () => {
        const newErrors = {};
        const requiredFields = [
            { field: "nombre", message: 'El campo "Nombre" es obligatorio' },
            { field: "tipoSangre", message: 'El campo "Tipo de Sangre" es obligatorio' },
            { field: "fechaIngreso", message: 'El campo "Fecha de Ingreso" es obligatorio' },
            { field: "claveRadial", message: 'El campo "Clave Radial" es obligatorio' },
            { field: "cargoVoluntario", message: 'El campo "Cargo Voluntario" es obligatorio' },
        ];

        // Validar campos obligatorios
        requiredFields.forEach(({ field, message }) => {
            if (!formData[field]?.trim()) {
                newErrors[field] = message;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateFields()) {
            console.log("Datos guardados:", formData);
            setFormData({
                nombre: "",
                FechaNacimento: "",
                fechaIngreso: "",
                cargoVoluntario: "",
                claveRadial: "",
                tipoSangre: "",
            });
            setErrors({});
        }
    };

    const handleDelete = () => {
        console.log("Data eliminada");
        setFormData({
            nombre: "",
            FechaNacimento: "",
            fechaIngreso: "",
            cargoVoluntario: "",
            claveRadial: "",
            tipoSangre: "",
        });
    };

    return (
        <Fragment>
            <div className="form-container">
                <h3>Información Personal del Voluntario</h3>

                {/* Formulario */}
                <div className="input-container">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombres + 2 apellidos"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.nombre && <p className="error-message">{errors.nombre}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="FechaNacimento">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        name="FechaNacimento"
                        value={formData.FechaNacimento}
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
                </div>

                <div className="input-container">
                    <label htmlFor="claveRadial">Clave Radial</label>
                    <input
                        type="text"
                        name="claveRadial"
                        placeholder="claveRadial for admin"
                        value={formData.claveRadial}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="cargoVoluntario">Cargo Voluntario</label>
                    <input
                        type="text"
                        name="cargoVoluntario"
                        placeholder="cargoVoluntario for super admin"
                        value={formData.cargoVoluntario}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="tipoSangre">Tipo de Sangre</label>
                    <input
                        type="text"
                        name="tipoSangre"
                        placeholder="Grupo + Rh Ejemplo: O+"
                        value={formData.tipoSangre}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                {/* Botones */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                    <button className="button button-delete" onClick={handleDelete}>
                        Delete
                    </button>
                    <button className="button button-save" onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </Fragment>
    );
}
