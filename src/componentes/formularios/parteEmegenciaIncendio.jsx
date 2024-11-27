import React, { Fragment, useState } from 'react';
import '../formularios/formStyle.css'

export function ParteEmergenciaIncendio() {
    const [formData, setFormData] = useState({
        claveEmergencia: [],
        direccion: '',
        cuadrante: '',
        horaInicio: '',
        horaFin: '',
        fechaEmergencia: '',
        oficialEmergencia: '',
        naturaleza: [],
        tipoNaturaleza: [],
        instituciones: [{ nombreInstitucion: '', nombreACargo: '', tipoInstitucion: '', horaLlegada: '' }],
        victimas: [{ nombreVictima: '', rutVictima: '', edad: '', descripcion: '' }],
        moviles: []
    });
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [confirmSave, setConfirmSave] = useState(false);

    const handleChange = (e, index, section) => {
        const { name, value, type, checked } = e.target;
        if (section) {
            setFormData(prevData => ({
                ...prevData,
                [section]: prevData[section].map((item, i) =>
                    i === index ? { ...item, [name]: type === 'checkbox' ? checked : value } : item
                )
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
    };

    const handleListChange = (name, value) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: prevData[name].includes(value)
                ? prevData[name].filter(item => item !== value)
                : [...prevData[name], value]
        }));
    };

    const addSection = (section) => {
        setFormData(prevData => ({
            ...prevData,
            [section]: [...prevData[section], section === 'instituciones'
                ? { nombreInstitucion: '', nombreACargo: '', tipoInstitucion: '', horaLlegada: '' }
                : { nombreVictima: '', rutVictima: '', edad: '', descripcion: '' }
            ]
        }));
    };

    const handleSave = () => {
        if (!formData.direccion) {
            setError('El campo dirección es obligatorio');
            return;
        }
        setError('');
        console.log('Data guardada:', formData);
    };

    const handleConfirmSave = () => {
        if (confirmSave) {
            console.log('Data guardada:', formData);
            setShowModal(false);
            setConfirmSave(false);
        } else {
            setError('Por favor, confirme que desea guardar los datos');
        }
    };

    const handleMovilToggle = (movil) => {
        setFormData(prevData => ({
            ...prevData,
            moviles: prevData.moviles.includes(movil)
                ? prevData.moviles.filter(m => m !== movil)
                : [...prevData.moviles, movil]
        }));
    };
    return (
        <div className="form-container">

            <div className="form-container">
                <h2>Información General</h2>
                <div className="form-group">
                    <label htmlFor="claveEmergencia">Clave Emergencia</label>
                    <select
                        id="claveEmergencia"
                        value={formData.claveEmergencia}
                        onChange={(e) => handleListChange('claveEmergencia', e.target.value)}
                    >
                        <option value="">Seleccione clave</option>
                        <option value="clave1">Clave 1</option>
                        <option value="clave2">Clave 2</option>
                        <option value="clave3">Clave 3</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección</label>
                    <input
                        id="direccion"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cuadrante">Cuadrante</label>
                    <input
                        id="cuadrante"
                        name="cuadrante"
                        value={formData.cuadrante}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="horaInicio">Hora Inicio</label>
                    <input
                        id="horaInicio"
                        name="horaInicio"
                        type="time"
                        value={formData.horaInicio}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="horaFin">Hora Fin</label>
                    <input
                        id="horaFin"
                        name="horaFin"
                        type="time"
                        value={formData.horaFin}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fechaEmergencia">Fecha Emergencia</label>
                    <input
                        id="fechaEmergencia"
                        name="fechaEmergencia"
                        type="date"
                        value={formData.fechaEmergencia}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="oficialEmergencia">Oficial Emergencia</label>
                    <input
                        id="oficialEmergencia"
                        name="oficialEmergencia"
                        value={formData.oficialEmergencia}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="naturaleza">Naturaleza</label>
                    <select
                        id="naturaleza"
                        value={formData.naturaleza}
                        onChange={(e) => handleListChange('naturaleza', e.target.value)}
                    >
                        <option value="">Seleccione naturaleza</option>
                        <option value="naturaleza1">Naturaleza 1</option>
                        <option value="naturaleza2">Naturaleza 2</option>
                        <option value="naturaleza3">Naturaleza 3</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="tipoNaturaleza">Tipo Naturaleza</label>
                    <select
                        id="tipoNaturaleza"
                        value={formData.tipoNaturaleza}
                        onChange={(e) => handleListChange('tipoNaturaleza', e.target.value)}
                    >
                        <option value="">Seleccione tipo de naturaleza</option>
                        <option value="tipo1">Tipo 1</option>
                        <option value="tipo2">Tipo 2</option>
                        <option value="tipo3">Tipo 3</option>
                    </select>
                </div>
            </div>

            <div className="form-container">
                <h2>Instituciones asistentes</h2>
                {formData.instituciones.map((institucion, index) => (
                    <div key={index} className="form-group">
                        <input
                            name="nombreInstitucion"
                            placeholder="Nombre Institución"
                            value={institucion.nombreInstitucion}
                            onChange={(e) => handleChange(e, index, 'instituciones')}
                        />
                        <input
                            name="nombreACargo"
                            placeholder="Nombre a Cargo"
                            value={institucion.nombreACargo}
                            onChange={(e) => handleChange(e, index, 'instituciones')}
                        />
                        <select
                            name="tipoInstitucion"
                            value={institucion.tipoInstitucion}
                            onChange={(e) => handleChange(e, index, 'instituciones')}
                        >
                            <option value="">Tipo de Institución</option>
                            <option value="tipo1">Tipo 1</option>
                            <option value="tipo2">Tipo 2</option>
                            <option value="tipo3">Tipo 3</option>
                        </select>
                        <input
                            name="horaLlegada"
                            type="time"
                            placeholder="Hora de Llegada"
                            value={institucion.horaLlegada}
                            onChange={(e) => handleChange(e, index, 'instituciones')}
                        />
                    </div>
                ))}
                <button className='button-option' onClick={() => addSection('instituciones')}>Agregar Institución</button>
            </div>

            <div className="form-container">
                <h2>Víctimas</h2>
                {formData.victimas.map((victima, index) => (
                    <div key={index} className="form-group">
                        <input
                            name="nombreVictima"
                            placeholder="Nombre Víctima"
                            value={victima.nombreVictima}
                            onChange={(e) => handleChange(e, index, 'victimas')}
                        />
                        <input
                            name="rutVictima"
                            placeholder="RUT Víctima"
                            value={victima.rutVictima}
                            onChange={(e) => handleChange(e, index, 'victimas')}
                        />
                        <input
                            name="edad"
                            type="number"
                            placeholder="Edad"
                            value={victima.edad}
                            onChange={(e) => handleChange(e, index, 'victimas')}
                        />
                        <textarea
                            name="descripcion"
                            placeholder="Descripción"
                            value={victima.descripcion}
                            onChange={(e) => handleChange(e, index, 'victimas')}
                        ></textarea>
                    </div>
                ))}
                <button className='button-option' onClick={() => addSection('victimas')}>Agregar Víctima</button>
            </div>

            <div className="form-container">
                <h2>MOVILES asistentes</h2>
                <div className="button-option-group">
                    {['Movil1', 'Movil2', 'Movil3'].map((movil) => (
                        <button
                            key={movil}
                            type="button"
                            className={`button-option ${formData.moviles.includes(movil) ? 'active' : ''}`}
                            onClick={() => handleMovilToggle(movil)}
                        >
                            {movil}
                        </button>
                    ))}
                </div>
            </div>

            {error && <p className="error-message">{error}</p>}

            <div className="button-group">
                <button className="button button-save" onClick={handleSave}>Guardar</button>
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

