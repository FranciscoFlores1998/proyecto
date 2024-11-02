// ejemplo de petición autenticada en Home.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';

export function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get('http://localhost:3000/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                console.error('Error en la petición:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Cargando datos...</p>}
        </div>
    );
}
