const Paciente = require('../models/pacienteModel');
const { Op } = require('sequelize');
require('dotenv').config();

// Lista todos os pacientes com paginação
const listarPacientes = async (req, res) => {
  let { page = 1, limit = 10, searchTerm = '' } = req.query;
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);
  const offset = (page - 1) * limit;

  console.log(`Buscando pacientes - Página: ${page}, Limite: ${limit}, Offset: ${offset}, Termo de Busca: ${searchTerm}`); // Log para verificar os parâmetros

  try {
    const whereClause = {};

    if (searchTerm) {
      whereClause.nome_completo = { [Op.like]: `%${searchTerm}%` };
    }

    const { count, rows: pacientes } = await Paciente.findAndCountAll({
      where: whereClause,
      limit,
      offset
    });

    console.log(`Total de pacientes encontrados: ${count}`); // Log para verificar o total de pacientes encontrados
    console.log(`Pacientes retornados:`, pacientes); // Log para verificar os dados retornados

    res.set('x-total-count', count);
    res.status(200).json(pacientes);
  } catch (error) {
    console.error('Erro ao listar pacientes:', error);
    res.status(500).json({ message: 'Erro ao listar pacientes', error });
  }
};


// Função utilitária para encontrar paciente por ID
const encontrarPacientePorId = async (id_paciente) => {
  const paciente = await Paciente.findByPk(id_paciente);
  if (!paciente) {
    throw new Error('Paciente não encontrado');
  }
  return paciente;
};

// Obtém um paciente por ID
const obterPacientePorId = async (req, res) => {
  const { id_paciente } = req.params;
  try {
    const paciente = await encontrarPacientePorId(id_paciente);
    res.status(200).json(paciente);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Cria um novo paciente
const criarPaciente = async (req, res) => {
  try {
    const novoPaciente = await Paciente.create(req.body);
    res.status(201).json(novoPaciente);
  } catch (error) {
    res.status(400).json({ message: 'Erro ao criar paciente', error });
  }
};

// Atualiza um paciente existente
const atualizarPaciente = async (req, res) => {
  const { id_paciente } = req.params;
  try {
    const paciente = await encontrarPacientePorId(id_paciente);
    await paciente.update(req.body);
    res.status(200).json({ message: 'Paciente atualizado com sucesso' });
  } catch (error) {
    res.status(400).json({ message: 'Erro ao atualizar paciente', error });
  }
};

// Deleta um paciente existente
const deletarPaciente = async (req, res) => {
  const { id_paciente } = req.params;
  try {
    const paciente = await encontrarPacientePorId(id_paciente);
    await paciente.destroy();
    res.status(200).json({ message: 'Paciente deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar paciente', error });
  }
};

module.exports = {
  listarPacientes,
  obterPacientePorId,
  criarPaciente,
  atualizarPaciente,
  deletarPaciente
};
