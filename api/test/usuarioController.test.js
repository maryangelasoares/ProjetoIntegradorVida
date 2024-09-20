const Usuario = require("../models/usuarioModel");
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const segredoJWT = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_SECRET;

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao listar usuários", error: error.message });
  }
};

const obterUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao obter usuário", error: error.message });
  }
};

const criarUsuario = async (req, res) => {
  const { email, nome_completo, senha } = req.body;

  try {
    // Verifica se o email já está registrado
    const usuarioExistente = await Usuario.findOne({ where: { email } });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'Email já registrado.' });
    }

    // Cria um novo usuário
    const novoUsuario = await Usuario.create({ nome_completo, email, senha });
    res.status(201).json({
      message: 'Usuário criado com sucesso.',
      usuario: novoUsuario,
    });
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
  }
};

const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const [updated] = await Usuario.update(req.body, { where: { id_usuario: id } });
    if (updated === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao atualizar usuário", error: error.message });
  }
};

const deletarUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const usuarioDeletado = await Usuario.destroy({ where: { id_usuario: id } });
    if (!usuarioDeletado) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao deletar usuário", error: error.message });
  }
};

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email: { [Op.like]: email.toLowerCase() } } });
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não registrado" });
    }

    const isMatch = await bcrypt.compare(senha, usuario.senha);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ userId: usuario.id_usuario, role: "user" }, segredoJWT, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: usuario.id_usuario, role: "user" }, refreshSecret, { expiresIn: '7d' });

    res.status(200).json({ message: "Login bem-sucedido", role: "user", userId: usuario.id_usuario, token, refreshToken });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: "Erro ao fazer login" });
  }
};

const refreshUsuario = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token necessário' });
  }

  try {
    const decoded = jwt.verify(refreshToken, refreshSecret);
    const newToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, segredoJWT, { expiresIn: '15m' });
    res.status(200).json({ token: newToken });
  } catch (e) {
    return res.status(401).json({ message: 'Refresh token inválido' });
  }
};

const logoutUsuario = (req, res) => {
  res.status(200).json({ message: 'Logout bem-sucedido' });
};

module.exports = {
  listarUsuarios,
  obterUsuarioPorId,
  criarUsuario,
  atualizarUsuario,
  deletarUsuario,
  loginUsuario,
  refreshUsuario,
  logoutUsuario
};
