const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const PacienteModel = require('./pacienteModel');

const SaudeDaMamaModel = sequelize.define(
  "SaudeDaMama",
  {
    id_cancer_de_mama: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_paciente: {
      type: DataTypes.INTEGER,
      references: {
        model: PacienteModel,
        key: 'id_paciente',
      },
      allowNull: false,
    },
    tipo_tumor: {
      type: DataTypes.ENUM(
        'Carcinoma ductal invasivo',
        'Carcinoma invasivo SOE',
        'Carcinoma invasivo de tipo não especial',
        'Carcinoma lobular invasivo',
        'Carcinoma tubular invasivo',
        'Carcinoma medular invasivo',
        'Carcinoma mucinoso invasivo',
        'Carcinoma metaplásico',
        'Carcinoma colóide invasivo',
        'Outros tipos de câncer de mama'
      ),
      allowNull: true,
    },
    data_diagnostico: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estadiamento: {
      type: DataTypes.ENUM(
        'Estádio 0',
        'Estádio I',
        'Estádio II',
        'Estádio III',
        'Estádio IV'
      ),
      allowNull: true,
    },
    biopsia_linfonodo_sentinela: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tratamento_neoadjuvante: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    tipo_tratamento_neoadjuvante: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo_cirurgia: {
      type: DataTypes.ENUM(
        'Mastectomia',
        'Quadrantectomia',
        'Setorectomia',
        'Outros'
      ),
      allowNull: true,
    },
    adjuvancia: {
      type: DataTypes.ENUM(
        'Quimioterapia', 
        'Radioterapia', 
        'Endocrinoterapia', 
        'Terapia Alvo', 
        'Nenhuma'
      ),
      allowNull: true,
    },
    desfecho_morte: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    data_obito: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    metastase: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    recidiva: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    recidiva_local: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    remissao: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    tableName: "SaudeDaMama",
    timestamps: false,
  }
);

module.exports = SaudeDaMamaModel;
