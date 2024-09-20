const { sequelize, Op } = require('../config/database');
const Sequelize = require('sequelize'); // Importa o Sequelize
const Paciente = require('../models/pacienteModel');
const SaudeDaMama = require('../models/saudeDaMamaModel');



// Função para obter todos os pacientes
async function getPacientes() {
  return await Paciente.findAll();
}

async function getPatientAnalysis() {
  try {
    return await sequelize.query(`
      SELECT 
        COUNT(*) AS total_pacientes,
        SUM(CASE 
              WHEN SaudeDaMama.desfecho_morte = false AND 
                   (SaudeDaMama.metastase = false OR SaudeDaMama.metastase IS NULL) AND 
                   (SaudeDaMama.recidiva = false OR SaudeDaMama.recidiva IS NULL) 
              THEN 1 ELSE 0 
            END) AS total_curados,
        SUM(CASE 
              WHEN (SaudeDaMama.remissao = true) 
              THEN 1 ELSE 0 
            END) AS total_remissao,
        SUM(CASE 
              WHEN (SaudeDaMama.metastase = true) 
              THEN 1 ELSE 0 
            END) AS total_metastase,
        SUM(CASE 
              WHEN (SaudeDaMama.recidiva = true) 
              THEN 1 ELSE 0 
            END) AS total_recidiva,
        SUM(CASE 
              WHEN (SaudeDaMama.recidiva_local = true) 
              THEN 1 ELSE 0 
            END) AS total_recidiva_local
      FROM Paciente
      LEFT JOIN SaudeDaMama ON Paciente.id_paciente = SaudeDaMama.id_paciente;
    `, { type: sequelize.QueryTypes.SELECT });
  } catch (error) {
    console.error('Erro ao obter análise de pacientes:', error);
    throw new Error('Erro interno do servidor');
  }
}


// Distribuição por Raça
async function getDistributionByRace() {
  return await Paciente.findAll({
    attributes: [
      'raca',
      [sequelize.fn('COUNT', sequelize.col('*')), 'total']
    ],
    group: 'raca'
  });
}

// Distribuição por Escolaridade
async function getDistributionByEducation() {
  return await Paciente.findAll({
    attributes: [
      'escolaridade',
      [sequelize.fn('COUNT', sequelize.col('*')), 'total']
    ],
    group: 'escolaridade'
  });
}

// Distribuição por Faixa Etária
async function getDistributionByAgeGroup() {
  return await sequelize.query(`
    SELECT
      CASE
        WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 20 AND 30 THEN '20-30'
        WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 31 AND 40 THEN '31-40'
        WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 41 AND 50 THEN '41-50'
        ELSE '50+'
      END as faixa_etaria,
      COUNT(*) as total
    FROM Paciente
    GROUP BY faixa_etaria
  `, { type: sequelize.QueryTypes.SELECT });
}

// IMC por Faixa Etária e Raça
async function getIMCByAgeGroupAndRace() {
  return await sequelize.query(`
    SELECT 
      raca,
      CASE
        WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 20 AND 30 THEN '20-30'
        WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 31 AND 40 THEN '31-40'
        WHEN TIMESTAMPDIFF(YEAR, data_nascimento, CURDATE()) BETWEEN 41 AND 50 THEN '41-50'
        ELSE '50+'
      END as faixa_etaria,
      AVG(imc) as imc_medio
    FROM Paciente
    GROUP BY raca, faixa_etaria
  `, { type: sequelize.QueryTypes.SELECT });
}

async function getRiskFactors() {
  try {
    return await Paciente.findAll({
      attributes: [
        'raca',
        'escolaridade',
        'renda_familiar',
        'hipertensao_cronica',
        'diabetes_mellitus',
        'hipotireoidismo',
        'transtorno_ansioso_depressivo',
        'dislipidemia',
        'cancer_mama_familiar',
        'cancer_ovario_familiar',
        'tabagismo_carga_tabagica',
        'tabagismo_tempo_vicio_anos',
        'etilismo_dose_diaria',
        'etilismo_tempo_vicio_anos',
        [sequelize.literal(`(SELECT COUNT(*) FROM \`SaudeDaMama\` WHERE \`SaudeDaMama\`.\`id_paciente\` = \`Paciente\`.\`id_paciente\`)`), 'teve_cancer'],
        'HistoriaGinecoObstetrica.amamentacao',
        'HistoriaGinecoObstetrica.menarca_idade',
        'HistoriaGinecoObstetrica.menopausa',
        'HistoriaGinecoObstetrica.idade_menopausa',
        'HistoriaGinecoObstetrica.uso_trh'
      ],
      include: [{
        model: HistoriaGinecoObstetrica,
        attributes: [
          'amamentacao',
          'menarca_idade',
          'menopausa',
          'idade_menopausa',
          'uso_trh'
        ]
      }],
      group: [
        'Paciente.raca',
        'Paciente.escolaridade',
        'Paciente.renda_familiar',
        'Paciente.hipertensao_cronica',
        'Paciente.diabetes_mellitus',
        'Paciente.hipotireoidismo',
        'Paciente.transtorno_ansioso_depressivo',
        'Paciente.dislipidemia',
        'Paciente.cancer_mama_familiar',
        'Paciente.cancer_ovario_familiar',
        'Paciente.tabagismo_carga_tabagica',
        'Paciente.tabagismo_tempo_vicio_anos',
        'Paciente.etilismo_dose_diaria',
        'Paciente.etilismo_tempo_vicio_anos',
        'HistoriaGinecoObstetrica.amamentacao',
        'HistoriaGinecoObstetrica.menarca_idade',
        'HistoriaGinecoObstetrica.menopausa',
        'HistoriaGinecoObstetrica.idade_menopausa',
        'HistoriaGinecoObstetrica.uso_trh',
        'Paciente.id_paciente' 
      ],
      raw: true // Adicione isso para obter os dados como objetos JavaScript puros, sem incluir os metadados do Sequelize.
    });
  } catch (error) {
    console.error('Error fetching risk factors:', error);
    throw error;
  }
}


async function getCancerMamaPorRendaFamiliar() {
  return await Paciente.findAll({
    attributes: [
      'renda_familiar',
      [sequelize.fn('COUNT', sequelize.col('SaudeDaMama.id_cancer_de_mama')), 'total_casos']
    ],
    include: [
      {
        model: SaudeDaMama,
        attributes: []
      }
    ],
    group: ['Paciente.renda_familiar'],
    raw: true,
  });
}

async function getSurvivalRateByTreatment() {
  try {
    return await sequelize.query(`
      SELECT 
        SaudeDaMama.tipo_tratamento_neoadjuvante AS tipo_tratamento,
        AVG(TIMESTAMPDIFF(YEAR, SaudeDaMama.data_diagnostico, IFNULL(SaudeDaMama.data_obito, CURDATE()))) AS media_sobrevida,
        COUNT(CASE WHEN SaudeDaMama.desfecho_morte = false THEN 1 END) AS pacientes_vivos,
        COUNT(CASE WHEN SaudeDaMama.desfecho_morte = true THEN 1 END) AS pacientes_falecidos
      FROM Paciente
      LEFT JOIN SaudeDaMama ON Paciente.id_paciente = SaudeDaMama.id_paciente
      GROUP BY tipo_tratamento;
    `, { type: sequelize.QueryTypes.SELECT });
  } catch (error) {
    console.error('Erro ao obter sobrevida por tratamento:', error);
    throw new Error('Erro interno do servidor');
  }
}
async function getRemissionRateByTumorType() {
  try {
    return await sequelize.query(`
      SELECT 
        SaudeDaMama.tipo_tumor AS tipo_tumor,
        COUNT(*) AS total_pacientes,
        SUM(CASE WHEN SaudeDaMama.remissao = true THEN 1 ELSE 0 END) AS pacientes_em_remissao
      FROM Paciente
      LEFT JOIN SaudeDaMama ON Paciente.id_paciente = SaudeDaMama.id_paciente
      GROUP BY tipo_tumor;
    `, { type: sequelize.QueryTypes.SELECT });
  } catch (error) {
    console.error('Erro ao obter taxa de remissão por tipo de tumor:', error);
    throw new Error('Erro interno do servidor');
  }
}
async function getIMCvsCancerType() {
  try {
    return await sequelize.query(`
      SELECT 
        SaudeDaMama.tipo_tumor AS tipo_tumor,
        AVG(Paciente.imc) AS imc_medio,
        COUNT(*) AS total_pacientes
      FROM Paciente
      LEFT JOIN SaudeDaMama ON Paciente.id_paciente = SaudeDaMama.id_paciente
      GROUP BY tipo_tumor;
    `, { type: sequelize.QueryTypes.SELECT });
  } catch (error) {
    console.error('Erro ao obter IMC por tipo de tumor:', error);
    throw new Error('Erro interno do servidor');
  }
}

async function getPacienteStatusWithIMC() {
  try {
    return await sequelize.query(`
      SELECT 
    Paciente.nome_completo,
    SaudeDaMama.remissao,
    SaudeDaMama.desfecho_morte,
    CASE
        WHEN SaudeDaMama.remissao = 1 THEN 'Remissão'
        WHEN SaudeDaMama.desfecho_morte = 1 THEN 'Óbito'
        ELSE 'Em tratamento'
    END AS status
FROM
    Paciente
        LEFT JOIN
    SaudeDaMama ON Paciente.id_paciente = SaudeDaMama.id_paciente;
    `, { type: sequelize.QueryTypes.SELECT });
  } catch (error) {
    console.error('Erro ao obter informações do paciente:', error);
    throw new Error('Erro interno do servidor');
  }
}

async function getStatusPaciente() {
  try {
    return await sequelize.query(`
      SELECT 
    Paciente.*, 
    SaudeDaMama.remissao, 
    SaudeDaMama.desfecho_morte 
FROM Paciente
LEFT JOIN SaudeDaMama ON Paciente.id_paciente = SaudeDaMama.id_paciente;`, 
{ type: sequelize.QueryTypes.SELECT });    
  } 
  catch (error) {
    console.error('Erro ao obter status do paciente:', error);
    throw new Error('Erro interno do servidor');
  }
}

module.exports = {
  getPacientes,
  getPatientAnalysis,
  getDistributionByEducation,
  getDistributionByAgeGroup,
  getIMCByAgeGroupAndRace,
  getDistributionByRace,
  getRiskFactors,
  getCancerMamaPorRendaFamiliar,
  getIMCvsCancerType,
  getSurvivalRateByTreatment,
  getRemissionRateByTumorType,
  getPacienteStatusWithIMC,
  getStatusPaciente
};
