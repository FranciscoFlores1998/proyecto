import React, { useEffect, useState } from "react";
import { ExternalLink, Download } from "lucide-react";
import { jsPDF } from "jspdf";

export function AsistenciaLista() {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch de referencias
  useEffect(() => {
    async function fetchReferences() {
      try {
        setLoading(true);
        const response = await fetch("/api/references");
        if (!response.ok) {
          throw new Error("Failed to fetch references");
        }
        const data = await response.json();
        setReferences(data);
      } catch (error) {
        console.error("Error al cargar referencias:", error);
        setError("Error al cargar referencias. Por favor, intente nuevamente.");
      } finally {
        setLoading(false);
      }
    }

    fetchReferences();
  }, []);

  const handleView = (referenceUrl) => {
    window.open(referenceUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = async (reference) => {
    try {
      const response = await fetch(reference.url);
      const blob = await response.blob();
      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text(reference.title, 20, 20);
      doc.setFontSize(12);
      doc.text(reference.description, 20, 30);

      // Intentar agregar contenido si el blob es texto
      if (blob.type.startsWith("text")) {
        const text = await blob.text();
        const splitContents = doc.splitTextToSize(text, 180);
        doc.text(splitContents, 10, 40);
      }

      doc.save(`${reference.title}.pdf`);
    } catch (error) {
      console.error("Error al descargar el documento:", error);
      alert(
        "Hubo un error al descargar el documento. Por favor, intente nuevamente."
      );
    }
  };

  if (loading) {
    return <p className="text-center">Cargando referencias...</p>;
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
            <th scope="col">Título</th>
            <th scope="col">Descripción</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {references.map((ref, index) => (
            <tr key={ref.id}>
              <td>{index + 1}</td>
              <td>{ref.title}</td>
              <td>{ref.description}</td>
              <td>
                <div className="flex space-x-2">
                  <button
                    className="button button-view"
                    onClick={() => handleView(ref.url)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visualizar
                  </button>
                  <button
                    className="button button-download"
                    onClick={() => handleDownload(ref)}
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
