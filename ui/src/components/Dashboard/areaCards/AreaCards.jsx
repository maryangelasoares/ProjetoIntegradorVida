import React, { useEffect, useState } from "react";
import axios from "axios";
import AreaCard from "./AreaCard";
import "./AreaCards.scss";

const AreaCards = () => {
  // Estado para armazenar os dados da análise de pacientes;
  const [analysisData, setAnalysisData] = useState({
    total_pacientes: 0,
    total_curados: 0,
    total_remissao: 0,
    total_metastase: 0,
    total_recidiva: 0,
    total_recidiva_local: 0
  });

  // Função para buscar os dados da API;
  useEffect(() => {
    const fetchPatientAnalysis = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/data-analysis/pacientes/analise");
        // Atualizar o estado com os dados da API (primeiro item da resposta);
        setAnalysisData(response.data[0]);
      } catch (error) {
        console.error("Erro ao Buscar Análise de Pacientes:", error);
      }
    };

    fetchPatientAnalysis();
  }, []); // Executa apenas uma vez ao montar o componente;

  return (
    <section className="content-area-cards">
      {/* Card Total de Pacientes */}
      <AreaCard
        colors={["#e4e8ef", "#f29a2e"]}
        percentFillValue={100} // Assume 100% de pacientes (total geral);
        cardInfo={{
          title: "TOTAL DE PACIENTES",
          value: `${analysisData.total_pacientes}`,
          text: `Total de Pacientes Monitorados`,
        }}
      />    
      
      {/* Card Pacientes em Remissão */}
      <AreaCard
        colors={["#e4e8ef", "#4ce13f"]}
        percentFillValue={(analysisData.total_remissao / analysisData.total_pacientes) * 100}
        cardInfo={{
          title: "PACIENTES EM REMISSÃO",
          value: `${analysisData.total_remissao}`,
          text: `Pacientes Monitorados em Remissão`,
        }}
      />
      
      {/* Card Pacientes com Metástase */}
      <AreaCard
        colors={["#e4e8ef", "#ff4e4e"]}
        percentFillValue={(analysisData.total_metastase / analysisData.total_pacientes) * 100}
        cardInfo={{
          title: "PACIENTES EM MATÁSTASE",
          value: `${analysisData.total_metastase}`,
          text: `Pacientes Monitorados em Metástase`,
        }}
      />
      
      {/* Card Pacientes com Recidiva */}
      <AreaCard
        colors={["#e4e8ef", "#ffb74e"]}
        percentFillValue={(analysisData.total_recidiva / analysisData.total_pacientes) * 100}
        cardInfo={{
          title: "PACIENTES EM RECIDIVA",
          value: `${analysisData.total_recidiva}`,
          text: `Pacientes Monitorados em Recidiva`,
        }}
      />
      
    </section>
  );
};

export default AreaCards;
