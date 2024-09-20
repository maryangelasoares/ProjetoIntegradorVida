const express = require('express');
const pacienteController = require('../controller/pacienteController');
const pacienteRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Pacientes
 *   description: Endpoints para gerenciamento de pacientes
 */

/**
 * @swagger
 * /pacientes:
 *   get:
 *     summary: Lista todos os pacientes
 *     tags: [Pacientes]
 *     responses:
 *       200:
 *         description: Sucesso
 *       500:
 *         description: Erro ao listar pacientes
 */
pacienteRoute.get('/', pacienteController.listarPacientes);

/**
 * @swagger
 * /pacientes/{id_paciente}:
 *   get:
 *     summary: Obtém um paciente por ID
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         description: ID do paciente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro ao obter o paciente
 */
pacienteRoute.get('/:id_paciente', pacienteController.obterPacientePorId);

/**
 * @swagger
 * /pacientes:
 *   post:
 *     summary: Cria um novo paciente
 *     tags: [Pacientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_completo:
 *                 type: string
 *               endereco:
 *                 type: string
 *               cidade:
 *                 type: string
 *               telefone:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               naturalidade:
 *                 type: string
 *               raca:
 *                 type: string
 *                 enum: [Branco, Pardo, Preto, Indígena, Amarelo]
 *               altura:
 *                 type: number
 *                 format: float 
 *               peso:
 *                 type: number
 *                 format: float 
 *               imc:
 *                 type: number
 *                 format: float 
 *               escolaridade:
 *                 type: string
 *                 enum: [Sem instrução, Ensino Fundamental Incompleto, Ensino Fundamental Completo, Ensino Médio Incompleto, Ensino Médio Completo, Ensino Superior Incompleto, Ensino Superior Completo]
 *               renda_familiar:
 *                 type: string
 *                 enum: [Sem renda, Até 1 salário mínimo, 1 a 2 salários mínimos, 2 a 5 salários mínimos, Maior que 5 salários mínimos]
 *               historico_doenca:
 *                 type: string
 *                 enum: [Hipertensão Crônica, Diabetes Mellitus, Hipotireoidismo, Trastorno Ansioso-Depressivo, Dislipidemia, Outro]
 *               cancer_mama_familiar:
 *                 type: boolean
 *               cancer_ovario_familiar:
 *                 type: boolean
 *               outros_casos_familiar:
 *                 type: string
 *               tabagismo:
 *                 type: boolean
 *               etilismo:
 *                 type: boolean
 *               atividade_fisica:
 *                 type: string
 *                 enum: [Sedentarismo, Caminha Regularmente, Academia de 3 a 5x na Semana, Pratica Outro Tipo de Exercício Físico, Pratica Atividade Física Esporadicamente]
 *               gestacao:
 *                 type: boolean
 *               paridade:
 *                 type: boolean
 *               idade_primeiro_filho:
 *                 type: integer
 *               amamentacao:
 *                 type: boolean
 *               duracao_amamentacao_meses:
 *                 type: integer
 *               menarca_idade:
 *                 type: integer
 *               menopausa:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar paciente
 */
pacienteRoute.post('/', pacienteController.criarPaciente);

/**
 * @swagger
 * /pacientes/{id_paciente}:
 *   put:
 *     summary: Atualiza um paciente existente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         description: ID do paciente
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_completo:
 *                 type: string
 *               endereco:
 *                 type: string
 *               cidade:
 *                 type: string
 *               telefone:
 *                 type: string
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *               naturalidade:
 *                 type: string
 *               raca:
 *                 type: string
 *                 enum: [Branco, Pardo, Preto, Indígena, Amarelo]
 *               altura:
 *                 type: number
 *                 format: float 
 *               peso:
 *                 type: number
 *                 format: float 
 *               imc:
 *                 type: number
 *                 format: float 
 *               escolaridade:
 *                 type: string
 *                 enum: [Sem instrução, Ensino Fundamental Incompleto, Ensino Fundamental Completo, Ensino Médio Incompleto, Ensino Médio Completo, Ensino Superior Incompleto, Ensino Superior Completo]
 *               renda_familiar:
 *                 type: string
 *                 enum: [Sem renda, Até 1 salário mínimo, 1 a 2 salários mínimos, 2 a 5 salários mínimos, Maior que 5 salários mínimos]
 *               historico_doenca:
 *                 type: string
 *                 enum: [Hipertensão Crônica, Diabetes Mellitus, Hipotireoidismo, Trastorno Ansioso-Depressivo, Dislipidemia, Outro]
 *               cancer_mama_familiar:
 *                 type: boolean
 *               cancer_ovario_familiar:
 *                 type: boolean
 *               outros_casos_familiar:
 *                 type: string
 *               tabagismo:
 *                 type: boolean
 *               etilismo:
 *                 type: boolean
 *               atividade_fisica:
 *                 type: string
 *               gestacao:
 *                 type: boolean
 *               paridade:
 *                 type: boolean
 *               idade_primeiro_filho:
 *                 type: integer
 *               amamentacao:
 *                 type: boolean
 *               duracao_amamentacao_meses:
 *                 type: integer
 *               menarca_idade:
 *                 type: integer
 *               menopausa:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro ao atualizar paciente
 */
pacienteRoute.put('/:id_paciente', pacienteController.atualizarPaciente);

/**
 * @swagger
 * /pacientes/{id_paciente}:
 *   delete:
 *     summary: Deleta um paciente existente
 *     tags: [Pacientes]
 *     parameters:
 *       - in: path
 *         name: id_paciente
 *         required: true
 *         description: ID do paciente
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Paciente deletado com sucesso
 *       404:
 *         description: Paciente não encontrado
 *       500:
 *         description: Erro ao deletar paciente
 */
pacienteRoute.delete('/:id_paciente', pacienteController.deletarPaciente);

module.exports = pacienteRoute;
