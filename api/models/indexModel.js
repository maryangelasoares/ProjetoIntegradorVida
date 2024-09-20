const { sequelize } = require("../config/database");
const Paciente = require("./pacienteModel");
const SaudeDaMama = require("./saudeDaMamaModel");
const Usuario = require("./usuarioModel");

// Definindo os relacionamentos entre Paciente e SaudeDaMama
Paciente.hasOne(SaudeDaMama, { 
  foreignKey: "id_paciente",
  onDelete: "CASCADE", // Adicionando cascade para garantir que, ao excluir um paciente, os dados associados sejam removidos
  onUpdate: "CASCADE"
});

SaudeDaMama.belongsTo(Paciente, { 
  foreignKey: "id_paciente",
  onDelete: "CASCADE", 
  onUpdate: "CASCADE"
});

// Exportando os modelos e a conexão sequelize
module.exports = {
  sequelize,
  Paciente,
  SaudeDaMama,
  Usuario,
};
