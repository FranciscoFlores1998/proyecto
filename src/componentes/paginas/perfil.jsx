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
            { field: "direccion", message: 'El campo "Dirección" es obligatorio' },
            { field: "telefono", message: 'El campo "Teléfono" es obligatorio' },
            { field: "tipoSangre", message: 'El campo "Tipo de Sangre" es obligatorio' },
            { field: "alergias", message: 'El campo "Alergias" es obligatorio' },
            { field: "enfermedades", message: 'El campo "Enfermedades" es obligatorio' },
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

        // Validar formato del teléfono
        if (formData.telefono && !/^\+569\d{8}$/.test(formData.telefono)) {
            newErrors.telefono = 'El número de teléfono debe tener el formato +569XXXXXXXX';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (validateFields()) {
            console.log("Datos guardados:", formData);
            setFormData({
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
            setErrors({});
        }
    };

    const handleDelete = () => {
        console.log("Data eliminada");
        setFormData({
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
                    <label htmlFor="direccion">Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        placeholder="Dirección completa"
                        value={formData.direccion}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.direccion && <p className="error-message">{errors.direccion}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="telefono">Teléfono</label>
                    <small>Formato esperado: +569XXXXXXXX</small>
                    <input
                        type="tel"
                        name="telefono"
                        placeholder="Ejemplo: +56912345678"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.telefono && <p className="error-message">{errors.telefono}</p>}
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
                        placeholder="Clave para administración"
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
                        placeholder="Cargo del voluntario"
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
                        placeholder="Ejemplo: O+"
                        value={formData.tipoSangre}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="input-container">
                    <label htmlFor="alergias">Alergias</label>
                    <input
                        type="text"
                        name="alergias"
                        placeholder="Escriba las alergias"
                        value={formData.alergias}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.alergias && <p className="error-message">{errors.alergias}</p>}
                </div>

                <div className="input-container">
                    <label htmlFor="enfermedades">Enfermedades</label>
                    <input
                        type="text"
                        name="enfermedades"
                        placeholder="Escriba las enfermedades"
                        value={formData.enfermedades}
                        onChange={handleChange}
                        className="form-control"
                    />
                    {errors.enfermedades && <p className="error-message">{errors.enfermedades}</p>}
                </div>

                {/* Botones */}
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                    <button className="button button-save" onClick={handleSave}>
                        Save
                    </button>
                    <button className="button button-delete" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </Fragment>
    );
}
