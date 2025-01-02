import React, { useState, Fragment } from "react";
import { jsPDF } from "jspdf";

export function Estadisticas() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(null);

  const generatePdf = () => {
    try {
      const doc = new jsPDF();
      doc.text("Este es un ejemplo de PDF generado dinámicamente", 10, 10);
      doc.text("Puedes previsualizar este contenido antes de descargarlo.", 10, 20);
      doc.text("Estadísticas importantes irían aquí.", 10, 30);

      const pdfBlob = doc.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(url);
      setError(null);
    } catch (err) {
      setError("Error al generar el PDF. Por favor, inténtelo de nuevo.");
      console.error("Error generating PDF:", err);
    }
  };

  const downloadPdf = () => {
    if (!pdfUrl) return;

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "estadisticas.pdf";
    link.click();
  };

  return (
    <Fragment>
      <div className="form-container">
        <h1>ESTADISTICA</h1>
      </div>
      <div className="pdf-container">
        <h2>Generador y Visor de PDF de Estadísticas</h2>
        <div className="button-container">
          <button onClick={generatePdf}>Vista previa del PDF</button>
          <button onClick={downloadPdf} disabled={!pdfUrl}>
            Descargar PDF
          </button>
        </div>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {pdfUrl && (
          <div className="pdf-preview">
            <h3>Vista previa del PDF de Estadísticas:</h3>
            <iframe
              src={pdfUrl}
              width="100%"
              height="500px"
              title="Vista previa del PDF de Estadísticas"
            ></iframe>
          </div>
        )}
      </div>
    </Fragment>
  );
}

