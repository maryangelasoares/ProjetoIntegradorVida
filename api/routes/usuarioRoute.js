const express = require('express');
const usuarioController = require('../controller/usuarioController');
const usuarioRoute = express.Router();

/**
 * @swagger
 * tags:
 *   name: Usuários
 *   description: Endpoints para gerenciamento de usuários
 */

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Realiza o login de um usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Falha na autenticação
 *       500:
 *         description: Erro ao realizar login
 */
usuarioRoute.post('/login', usuarioController.loginUsuario);

/**
 * @swagger
 * /usuarios/refresh:
 *   post:
 *     summary: Atualiza o token JWT usando um refresh token
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT atualizado com sucesso
 *       401:
 *         description: Refresh token inválido
 *       500:
 *         description: Erro ao atualizar o token
 */
usuarioRoute.post('/refresh', usuarioController.refreshUsuario);

/**
 * @swagger
 * /usuarios/logout:
 *   post:
 *     summary: Realiza o logout do usuário
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Logout bem-sucedido
 */
usuarioRoute.post('/logout', usuarioController.logoutUsuario);

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Lista todos os usuários
 *     tags: [Usuários]
 *     responses:
 *       200:
 *         description: Sucesso
 *       500:
 *         description: Erro ao listar usuários
 */
usuarioRoute.get('/', usuarioController.listarUsuarios);

/**
 * @swagger
 * /usuarios/{id_usuario}:
 *   get:
 *     summary: Obtém um usuário por ID
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao obter o usuário
 */
usuarioRoute.get('/:id_usuario', usuarioController.obterUsuarioPorId);

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_completo:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro ao criar usuário
 */
usuarioRoute.post('/', usuarioController.criarUsuario);

/**
 * @swagger
 * /usuarios/{id_usuario}:
 *   put:
 *     summary: Atualiza um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID do usuário
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
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao atualizar usuário
 */
usuarioRoute.put('/:id_usuario', usuarioController.atualizarUsuario);

/**
 * @swagger
 * /usuarios/{id_usuario}:
 *   delete:
 *     summary: Deleta um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao deletar usuário
 */
usuarioRoute.delete('/:id_usuario', usuarioController.deletarUsuario);
/**
 * @swagger
 * /usuarios/{id_usuario}/alterar-senha:
 *   put:
 *     summary: Altera a senha de um usuário existente
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: id_usuario
 *         required: true
 *         description: ID do usuário
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               senhaAtual: 
 *                 type: string
 *                 description: Senha atual do usuário
 *               novaSenha:
 *                 type: string
 *                 description: Nova senha desejada
 *     responses:
 *       200:
 *         description: Senha alterada com sucesso
 *       400:
 *         description: Dados inválidos (e.g., senhas não coincidem)
 *       401:
 *         description: Senha atual incorreta
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro ao alterar senha
 */
usuarioRoute.put('/:id_usuario/alterar-senha', usuarioController.alterarSenha);

module.exports = usuarioRoute;
