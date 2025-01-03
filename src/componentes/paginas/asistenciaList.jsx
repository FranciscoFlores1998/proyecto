import React, { useEffect, useState } from "react";
import { ExternalLink, Download } from "lucide-react";
import API_BASE_URL from "../../apiConfig"; // Asegúrate de importar la URL base de tu backend

export function AsistenciaLista() {
  const [partesAsistencia, setPartesAsistencia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch de partes de asistencia
  useEffect(() => {
    async function fetchPartesAsistencia() {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/parte-asistencia/obtener`,{
          method:'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true',
          }
        });
        console.log(response);
        if (!response.ok) {
          throw new Error("Error al obtener las asistencias.");
        }
        const data = await response.json();
        console.log(data);
        setPartesAsistencia(data);
      } catch (error) {
        console.error("Error al cargar partes de asistencia:", error);
        setError("Error al cargar las asistencias. Por favor, intente nuevamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchPartesAsistencia();
  }, []);
  

  const handleView = (id) => {
    // Lógica para ver detalles de una asistencia (puedes personalizar esto)
    alert("Visualizar detalles de la asistencia con ID: ${id}");
  };

  const handleDownload = (parte) => {
    // Lógica para descargar la asistencia como PDF (puedes personalizar esto)
    alert('Descargar información de la asistencia con ID: ${parte.id}');
  };

  if (loading) {
    return <p className="text-center">Cargando asistencias...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="form-container">
      <h1>Lista de Asistencias</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tipo de Llamado</th>
            <th scope="col">Dirección</th>
            <th scope="col">Fecha</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {partesAsistencia.map((parte, index) => (
            <tr key={parte.id}>
              <td>{index + 1}</td>
              <td>{parte.tipoLlamado}</td>
              <td>{parte.direccionAsistencia}</td>
              <td>{parte.fechaAsistencia}</td>
              <td>
                <div className="flex space-x-2">
                  <button
                    className="button button-view"
                    onClick={() => handleView(parte.id)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visualizar
                  </button>
                  <button
                    className="button button-download"
                    onClick={() => handleDownload(parte)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Descargar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}