import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import "./AreaCharts.scss";

const AreaProgressChart = () => {
  const endpoints = [
    "http://localhost:3000/api/data-analysis/survival-rate-treatment",
    "http://localhost:3000/api/data-analysis/remission-rate-tumor-type",
    "http://localhost:3000/api/data-analysis/imc-vs-cancer-type",
  ];
  const titles = [
    "Sobrevida por Tipo de Tratamento",
    "Taxa de Remissão por Tipo de Tumor",
    "Correlação entre IMC e Tipo de Câncer",
  ];

  const [data, setData] = useState([]);
  const [currentEndpointIndex, setCurrentEndpointIndex] = useState(0);
  const [isPieChart, setIsPieChart] = useState(false);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF195E", "#ff7ba5"]; // Cores para o gráfico de pizza

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoints[currentEndpointIndex]);
        console.log("API Response:", response.data);

        // Ajustar o formato dos dados conforme o endpoint;
        const formattedData = response.data.map((item, index) => {
          switch (currentEndpointIndex) {
            case 0: // Sobrevida por Tipo de Tratamento;
              return {
                id: index + 1,
                name: item.tipo_tratamento || "Desconhecido",
                percentValues: item.pacientes_vivos, // Usar pacientes vivos para o gráfico de barras;
              };
            case 1: // Taxa de Remissão por Tipo de Tumor;
              return {
                id: index + 1,
                name: item.tipo_tumor || "Desconhecido",
                percentValues: parseFloat(item.pacientes_em_remissao), // Converter string para número;
              };
            case 2: // Correlação entre IMC e Tipo de Câncer;
              return {
                id: index + 1,
                name: item.tipo_tumor || "Desconhecido",
                percentValues: parseFloat(item.imc_medio), // Converter string para número;
              };
            default:
              return {
                id: index + 1,
                name: "Desconhecido",
                percentValues: 0,
              };
          }
        });

        console.log("Formatted Data:", formattedData);

        setData(formattedData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [currentEndpointIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentEndpointIndex((prevIndex) => (prevIndex + 1) % endpoints.length);
      setIsPieChart((prevIsPieChart) => !prevIsPieChart);
    }, 100000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="progress-bar">
      <div className="progress-bar-info">
        <h4 className="progress-bar-title">{titles[currentEndpointIndex]}</h4>
      </div>
      <div className="progress-bar-chart">
        {isPieChart ? (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                dataKey="percentValues"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
              <XAxis dataKey="name"/>
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentValues" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AreaProgressChart;
