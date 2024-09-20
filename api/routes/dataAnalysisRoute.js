const express = require('express');
const dataAnalysis = require('../services/DataAnalysis'); // Ajuste o caminho conforme a localização do seu controlador

const dataAnalysisRoutes = express.Router();

// Rota para buscar todos os pacientes
dataAnalysisRoutes.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await dataAnalysis.getPacientes();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

dataAnalysisRoutes.get('/pacientes/analise', async (req, res) => {
  try {
    const analisePacientes = await dataAnalysis.getPatientAnalysis();
    res.json(analisePacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para correlacionar idade no diagnóstico, tempo de tratamento e tempo para início do tratamento
dataAnalysisRoutes.get('/pacientes/correlacao', async (req, res) => {
  try {
    const correlacao = await dataAnalysis.correlacionarDados();
    res.json(correlacao);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para distribuição por raça
dataAnalysisRoutes.get('/distribution/race', async (req, res) => {
  try {
    const distribution = await dataAnalysis.getDistributionByRace();
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para distribuição por escolaridade
dataAnalysisRoutes.get('/distribution/education', async (req, res) => {
  try {
    const distribution = await dataAnalysis.getDistributionByEducation();
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para distribuição por faixa etária
dataAnalysisRoutes.get('/distribution/ageGroup', async (req, res) => {
  try {
    const distribution = await dataAnalysis.getDistributionByAgeGroup();
    res.json(distribution);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para IMC médio por faixa etária e raça
dataAnalysisRoutes.get('/imc/ageGroupRace', async (req, res) => {
  try {
    const imcData = await dataAnalysis.getIMCByAgeGroupAndRace();
    res.json(imcData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para fatores de risco relacionados ao câncer de mama
dataAnalysisRoutes.get('/risk-factors', async (req, res) => {
  try {
    const riskFactors = await dataAnalysis.getRiskFactors();
    res.json(riskFactors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para relação entre câncer de mama e renda familiar
dataAnalysisRoutes.get('/relacao-cancer-mama-renda', async (req, res) => {
  try {
    const dados = await dataAnalysis.getCancerMamaPorRendaFamiliar();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para análise de sobrevida por tipo de tratamento
dataAnalysisRoutes.get('/survival-rate-treatment', async (req, res) => {
  try {
    const survivalData = await dataAnalysis.getSurvivalRateByTreatment();
    res.json(survivalData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para taxa de remissão por tipo de tumor
dataAnalysisRoutes.get('/remission-rate-tumor-type', async (req, res) => {
  try {
    const remissionData = await dataAnalysis.getRemissionRateByTumorType();
    res.json(remissionData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para correlação entre IMC e tipo de câncer
dataAnalysisRoutes.get('/imc-vs-cancer-type', async (req, res) => {
  try {
    const imcVsCancerData = await dataAnalysis.getIMCvsCancerType();
    res.json(imcVsCancerData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

dataAnalysisRoutes.get('/status_paciente', async (req, res) => {
  try {
    const statusPaciente = await dataAnalysis.getPacienteStatusWithIMC();
    res.json(statusPaciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = dataAnalysisRoutes;
