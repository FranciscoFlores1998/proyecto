import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export function Estadisticas() {
  const [filtros, setFiltros] = useState([]);
  const [nuevoFiltro, setNuevoFiltro] = useState({
    campo: "categoria",
    valor: "",
  });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  // Datos iniciales
  const dataEjemplo = [
    { categoria: "A", valor: 30 },
    { categoria: "B", valor: 50 },
    { categoria: "C", valor: 20 },
    { categoria: "D", valor: 60 },
    { categoria: "E", valor: 40 },
  ];

  const agregarFiltro = () => {
    if (nuevoFiltro.valor.trim() !== "") {
      setFiltros([...filtros, { ...nuevoFiltro }]);
      setNuevoFiltro({ campo: "categoria", valor: "" });
    }
  };

  const eliminarFiltro = (index) => {
    const filtrosActualizados = filtros.filter((_, i) => i !== index);
    setFiltros(filtrosActualizados);
  };

  const aplicarFiltros = () => {
    let datosAcumulados = [];

    filtros.forEach((filtro) => {
      let datosFiltrados = [];
      if (filtro.campo === "categoria") {
        datosFiltrados = dataEjemplo.filter((item) =>
          item.categoria.includes(filtro.valor)
        );
      } else if (filtro.campo === "valor") {
        datosFiltrados = dataEjemplo.filter(
          (item) => item.valor >= parseInt(filtro.valor, 10)
        );
      }
      datosAcumulados = [...datosAcumulados, ...datosFiltrados];
    });

    // Eliminar duplicados en datos acumulados
    const datosUnicos = Array.from(
      new Map(datosAcumulados.map((item) => [item.categoria, item])).values()
    );

    setChartData({
      labels: datosUnicos.map((item) => item.categoria),
      datasets: [
        {
          label: "Valores",
          data: datosUnicos.map((item) => item.valor),
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="form-container" style={{ padding: "20px" }}>
      <h1>Estadísticas con Filtros Dinámicos</h1>

      {/* Nuevo filtro */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Agregar Filtros</h2>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <select
            className="col-4"
            value={nuevoFiltro.campo}
            onChange={(e) =>
              setNuevoFiltro({ ...nuevoFiltro, campo: e.target.value })
            }
          >
            <option value="categoria">Categoría</option>
            <option value="valor">Valor Mínimo</option>
          </select>
          <input
            type="text"
            value={nuevoFiltro.valor}
            onChange={(e) =>
              setNuevoFiltro({ ...nuevoFiltro, valor: e.target.value })
            }
            placeholder="Ingrese valor"
          />
          <button
            className="button button-option col-2"
            style={{ marginBottom: "23px" }}
            onClick={agregarFiltro}
          >
            Agregar Filtro
          </button>
        </div>
      </div>

      {/* Lista de filtros */}
      <div className="form-container">
        <h2>Filtros Aplicados</h2>
        {filtros.length > 0 ? (
          <ul>
            {filtros.map((filtro, index) => (
              <li
                key={index}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span>
                  {filtro.campo === "categoria"
                    ? `Categoría contiene: ${filtro.valor}`
                    : `Valor mínimo: ${filtro.valor}`}
                </span>
                <button onClick={() => eliminarFiltro(index)}>Eliminar</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay filtros aplicados.</p>
        )}
        {/* Botón para aplicar filtros */}
        <div
          className="button button-save col-2"
          style={{ marginBottom: "20px" }}
        >
          <button onClick={aplicarFiltros}>Aplicar Filtros</button>
        </div>
      </div>

      {/* Gráfico */}
      <div className="form-container" style={{ height: "800px", width: "80%" }}>
        {chartData.labels.length > 0 ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Gráfico de Barras - Estadísticas",
                },
              },
            }}
          />
        ) : (
          <p>El gráfico se generará después de aplicar los filtros.</p>
        )}
      </div>
    </div>
  );
}
