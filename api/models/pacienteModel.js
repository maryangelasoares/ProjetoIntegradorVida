const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PacienteModel = sequelize.define(
    "Paciente",
    {
        id_paciente: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nome_completo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data_nascimento: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        naturalidade: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        raca: {
            type: DataTypes.ENUM('Branco', 'Pardo', 'Preto', 'Indígena', 'Amarelo'),
            allowNull: false,
        },
        altura: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        peso: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        imc: {
            type: DataTypes.DECIMAL(5, 2),
            allowNull: false,
        },
        escolaridade: {
            type: DataTypes.ENUM(
                'Sem instrução', 
                'Ensino Fundamental Incompleto', 
                'Ensino Fundamental Completo', 
                'Ensino Médio Incompleto', 
                'Ensino Médio Completo', 
                'Ensino Superior Incompleto', 
                'Ensino Superior Completo'
            ),
            allowNull: false,
        },
        renda_familiar: {
            type: DataTypes.ENUM(
                'Sem renda', 
                'Até 1 salário mínimo', 
                '1 a 2 salários mínimos', 
                '2 a 5 salários mínimos', 
                'Maior que 5 salários mínimos'
            ),
            allowNull: false,
        },

        historico_doenca: { // Substitui os campos booleanos individuais
            type: DataTypes.ENUM(
                'Hipertensão Crônica',
                'Diabetes Mellitus',
                'Hipotireoidismo',
                'Trastorno Ansioso-Depressivo',
                'Dislipidemia',
                'Outro'
            ),
            allowNull: false,
        },
        cancer_mama_familiar: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
        },
        cancer_ovario_familiar: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
        },
        outros_casos_familiar: { 
            type: DataTypes.STRING,
            allowNull: true,
        },

        tabagismo: { // Adiciona o campo booleano para tabagismo
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        etilismo: { // Adiciona o campo booleano para etilismo
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        atividade_fisica: { // Adiciona o campo booleano para atividade física
            type: DataTypes.ENUM(
                'Sedentarismo',
                'Caminha Regularmente',
                'Academia de 3 a 5x na Semana',
                'Pratica Outro Tipo de Exercício Físico',
                'Pratica Atividade Física Esporadicamente'
            ),
            allowNull: false,
        },
        gestacao: { // Adiciona o campo booleano para gestação prévia
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }, 
        paridade: { // Adiciona o campo booleano para paridade
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        idade_primeiro_filho: {
            type: DataTypes.INTEGER,
            allowNull: true, // Pode ser nulo se não tiver filhos
        },
        amamentacao: { 
            type: DataTypes.BOOLEAN,
            allowNull: false, 
        },
        duracao_amamentacao_meses: { // Renomeado para maior clareza
            type: DataTypes.INTEGER,
            allowNull: true, 
        },
        menarca_idade: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        menopausa: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
        },
    },
    {
        tableName: "Paciente",
        timestamps: false,
    }
);

module.exports = PacienteModel;