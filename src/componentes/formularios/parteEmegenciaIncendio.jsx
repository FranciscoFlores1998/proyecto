
import React, { Fragment, useState } from 'react';
import '../formularios/formStyle.css'

export function ParteEmergenciaIncendio() {
    
    // Estado para almacenar los valores de los campos de entrada
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        comentarios: '',
        descripcion: '',
        categoria: '',
        opciones: [],
        checkbox: false,
    });
    const [error, setError] = useState('');

    // Función para actualizar el estado de cada campo
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    // Contar cuántos campos están completos
    const camposCompletados = Object.values(formData).filter((field) => {
        if (typeof field === 'string') return field.trim() !== '';
        if (Array.isArray(field)) return field.length > 0;
        return field;
    }).length;

    // Manejar opciones múltiples
    const handleOptionClick = (opcion) => {
        setFormData((prevData) => ({
            ...prevData,
            opciones: prevData.opciones.includes(opcion)
                ? prevData.opciones.filter((o) => o !== opcion)
                : [...prevData.opciones, opcion],
        }));
    };

    // Guardar y eliminar
    const handleSave = () => {
        if (!formData.nombre) {
            setError('El campo nombre es obligatorio');
            return;
        }
        setError('');
        console.log('Data guardada:', formData);
    };

    const handleDelete = () => {
        console.log('Data eliminada');
        setFormData({
            nombre: '',
            email: '',
            telefono: '',
            comentarios: '',
            descripcion: '',
            categoria: '',
            opciones: [],
            checkbox: false,
        });
    };

    return (
        <Fragment>
            <div className="form-container">
                <h1>Formulario Combinado</h1>
                <p className="form-enunciado">
                    Completa los campos requeridos: <span className="completed-counter">{camposCompletados} / 8</span>
                </p>

                {/* Campos del formulario de contacto */}
                <div className="form-floating">
                    <input
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <label htmlFor="nombre">Nombre</label>
                </div>
                {error && <p className="error-message">{error}</p>}

                <div className="form-floating">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <label htmlFor="email">Email</label>
                </div>

                <div className="form-floating">
                    <input
                        type="tel"
                        name="telefono"
                        placeholder="Teléfono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <label htmlFor="telefono">Teléfono</label>
                </div>

                <div className="form-floating">
                    <textarea
                        name="comentarios"
                        placeholder="Comentarios"
                        value={formData.comentarios}
                        onChange={handleChange}
                        className="form-control"
                    ></textarea>
                    <label htmlFor="comentarios">Comentarios</label>
                </div>

                {/* Campos adicionales para el formulario de emergencia */}
                <label>Descripción:</label>
                <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Escribe una descripción"
                ></textarea>

                <label>Categoría:</label>
                <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="">Seleccione una categoría</option>
                    <option value="categoria1">Categoría 1</option>
                    <option value="categoria2">Categoría 2</option>
                </select>

                <div className="form-check">
                    <input
                        type="checkbox"
                        name="checkbox"
                        checked={formData.checkbox}
                        onChange={handleChange}
                        className="form-check-input"
                    />
                    <label className="form-check-label">Acepto los términos y condiciones</label>
                </div>

                <p className="form-enunciado">Seleccione opciones múltiples:</p>
                <div className="button-option-group">
                    {['Opción A', 'Opción B', 'Opción C'].map((opcion) => (
                        <button
                            key={opcion}
                            type="button"
                            className={`button-option ${formData.opciones.includes(opcion) ? 'selected' : ''}`}
                            onClick={() => handleOptionClick(opcion)}
                        >
                            {opcion}
                        </button>
                    ))}
                </div>

                {/* Botones de acción */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
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