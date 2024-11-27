import React, { Fragment, useState } from "react";
import axios from 'axios';
import '../paginas/sesion.css'

export function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Envía las credenciales al backend
            const response = await axios.post('http://localhost:3000/login', { email, password });

            // Guarda el token en el almacenamiento local
            localStorage.setItem('token', response.data.token);

            // Llama la función para indicar que el usuario está autenticado
            onLogin();

            // Limpia el formulario y el mensaje de error
            setEmail('');
            setPassword('');
            setError('');
        } catch (err) {
            setError('Email o contraseña incorrectos');
        }
    };

    return (
        <Fragment>
            <div className="login-page" onSubmit>
                <div className="container "
                    style={{
                        display: 'grid',
                        placeItems: 'center',
                        height: '50%'
                    }}>
                    <h1 className="h3 mb-3 fw-normal text-center" >Login React</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {/*mejorar css en .form-floating */}
                    <div className="login-container">
                        <div className="form-floating">
                            <input
                                type="email"
                                className="form-control"
                                id="txt_correo"
                                name="txt_correo"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <label htmlFor="txt_correo"  >Correo</label>
                        </div>
                        <div className="form-floating">
                            <input
                                type="password"
                                className="form-control"
                                id="txt_contraseña"
                                name="txt_contraseña"
                                placeholder="contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <label htmlFor="txt_contraseña">Contraseña</label>
                        </div>
                        <div className="container-center">
                            <div className="form-check text-start my-3">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    value="remember-me"
                                    id="flexCheckDefault" />
                                <label className="form-check-label" for="flexCheckDefault">
                                    RECUPERAR
                                </label>
                            </div>
                            <button
                                className="login-button" onClick={handleLogin}>
                                Iniciar Sesión</button>
                            <p className="mt-5 mb-3 text-body-secondary text-center">
                                &copy; 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}