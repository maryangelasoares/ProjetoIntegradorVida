const express = require('express');
const {
  listarSaudeDaMama,
  obterSaudeDaMamaPorId,
  criarSaudeDaMama,
  atualizarSaudeDaMama,
  deletarSaudeDaMama,
} = require('../controller/saudeDaMamaController');

const saudeDaMamaRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Saúde da Mama
 *   description: Endpoints para gerenciamento da saúde da mama
 */

/**
 * @swagger
 * /saude-da-mama:
 *   get:
 *     summary: Lista todas as entradas de saúde da mama
 *     tags: [Saúde da Mama]
 *     responses:
 *       200:
 *         description: Sucesso
 *       500:
 *         description: Erro ao listar entradas
 */
saudeDaMamaRoute.get('/', listarSaudeDaMama);

/**
 * @swagger
 * /saude-da-mama/{id_paciente}:
 *   get:
 *     summary: Obtém uma entrada de saúde da mama por ID do paciente
 *     tags: [Saúde da Mama]
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
 *         description: Entrada não encontrada
 *       500:
 *         description: Erro ao obter entrada
 */
saudeDaMamaRoute.get('/:id_paciente', obterSaudeDaMamaPorId);

/**
 * @swagger
 * /saude-da-mama:
 *   post:
 *     summary: Cria uma nova entrada de saúde da mama
 *     tags: [Saúde da Mama]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_paciente:
 *                 type: integer
 *               tipo_tumor:
 *                 type: string
 *                 enum: [
 *                   'Carcinoma ductal invasivo', 
 *                   'Carcinoma invasivo SOE', 
 *                   'Carcinoma invasivo de tipo não especial', 
 *                   'Carcinoma lobular invasivo', 
 *                   'Carcinoma tubular invasivo', 
 *                   'Carcinoma medular invasivo', 
 *                   'Carcinoma mucinoso invasivo', 
 *                   'Carcinoma metaplásico', 
 *                   'Carcinoma colóide invasivo', 
 *                   'Outros tipos de câncer de mama'
 *                 ]
 *               data_diagnostico:
 *                 type: string
 *                 format: date
 *               estadiamento:
 *                 type: string
 *                 enum: ['Estádio 0', 'Estádio I', 'Estádio II', 'Estádio III', 'Estádio IV']
 *               biopsia_linfonodo_sentinela:
 *                 type: boolean
 *               tratamento_neoadjuvante:
 *                 type: boolean
 *               tipo_tratamento_neoadjuvante:
 *                 type: string
 *               tipo_cirurgia:
 *                 type: string
 *                 enum: ['Mastectomia', 'Quadrantectomia', 'Setorectomia', 'Outros']
 *               adjuvancia:
 *                 type: string
 *                 enum: ['Quimioterapia', 'Radioterapia', 'Endocrinoterapia', 'Terapia Alvo', 'Nenhuma']
 *               desfecho_morte:
 *                 type: boolean
 *               data_obito:
 *                 type: string
 *                 format: date
 *               metastase:
 *                 type: boolean
 *               recidiva:
 *                 type: boolean
 *               recidiva_local:
 *                 type: boolean
 *               remissao:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Entrada criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar entrada
 */
saudeDaMamaRoute.post('/', criarSaudeDaMama);

/**
 * @swagger
 * /saude-da-mama/{id_cancer_de_mama}:
 *   put:
 *     summary: Atualiza uma entrada de saúde da mama existente (apenas os campos fornecidos)
 *     tags: [Saúde da Mama]
 *     parameters:
 *       - in: path
 *         name: id_cancer_de_mama
 *         required: true
 *         description: ID da entrada de saúde da mama
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo_tumor:
 *                 type: string
 *                 enum: [
 *                   'Carcinoma ductal invasivo', 
 *                   'Carcinoma invasivo SOE', 
 *                   'Carcinoma invasivo de tipo não especial', 
 *                   'Carcinoma lobular invasivo', 
 *                   'Carcinoma tubular invasivo', 
 *                   'Carcinoma medular invasivo', 
 *                   'Carcinoma mucinoso invasivo', 
 *                   'Carcinoma metaplásico', 
 *                   'Carcinoma colóide invasivo', 
 *                   'Outros tipos de câncer de mama'
 *                 ]
 *               data_diagnostico:
 *                 type: string
 *                 format: date
 *               estadiamento:
 *                 type: string
 *                 enum: ['Estádio 0', 'Estádio I', 'Estádio II', 'Estádio III', 'Estádio IV']
 *               tipo_cirurgia:
 *                 type: string
 *                 enum: ['Mastectomia', 'Quadrantectomia', 'Setorectomia', 'Outros']
 *               adjuvancia:
 *                 type: string
 *                 enum: ['Quimioterapia', 'Radioterapia', 'Endocrinoterapia', 'Terapia Alvo', 'Nenhuma']
 *               desfecho_morte:
 *                 type: boolean
 *               data_obito:
 *                 type: string
 *                 format: date
 *               metastase:
 *                 type: boolean
 *               recidiva:
 *                 type: boolean
 *               recidiva_local:
 *                 type: boolean
 *               remissao:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Entrada atualizada com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Entrada não encontrada
 *       500:
 *         description: Erro ao atualizar entrada
 */
saudeDaMamaRoute.put('/:id_paciente', atualizarSaudeDaMama);


/**
 * @swagger
 * /saude-da-mama/{id_cancer_de_mama}:
 *   delete:
 *     summary: Deleta uma entrada de saúde da mama existente
 *     tags: [Saúde da Mama]
 *     parameters:
 *       - in: path
 *         name: id_cancer_de_mama
 *         required: true
 *         description: ID da entrada de saúde da mama
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Entrada deletada com sucesso
 *       404:
 *         description: Entrada não encontrada
 *       500:
 *         description: Erro ao deletar entrada
 */
saudeDaMamaRoute.delete('/:id_cancer_de_mama', deletarSaudeDaMama);

module.exports = saudeDaMamaRoute;
