const express = require('express');
const pacienteRoutes = require('./pacienteRoute');
const saudeDaMamaRoutes = require('./saudeDaMamaRoute');
const dataAnalysisRoutes = require('./dataAnalysisRoute');
const usuarioRoutes = require('./usuarioRoute');

const router = express.Router();

// Usar as rotas
router.use('/pacientes', pacienteRoutes);
router.use('/saude-da-mama', saudeDaMamaRoutes);
router.use('/data-analysis', dataAnalysisRoutes); 
router.use('/usuarios', usuarioRoutes);
module.exports = router;
