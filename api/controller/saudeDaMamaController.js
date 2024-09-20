const { SaudeDaMama } = require('../models/indexModel');

const listarSaudeDaMama = async (req, res) => {
  try {
    const saudeDaMama = await SaudeDaMama.findAll();
    res.status(200).json(saudeDaMama);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar entradas de saúde da mama', error });
  }
};

const obterSaudeDaMamaPorId = async (req, res) => {
  const { id_paciente } = req.params;
  try {
    const entrada = await SaudeDaMama.findOne({
      where: { id_paciente: id_paciente },
    });
    if (!entrada) {
      return res.status(404).json({ message: 'Entrada não encontrada' });
    }
    res.status(200).json(entrada);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter entrada', error });
  }
};


const criarSaudeDaMama = async (req, res) => {
  const {
    id_paciente,
    tipo_tumor, 
    data_diagnostico,
    estadiamento,
    biopsia_linfonodo_sentinela,
    tratamento_neoadjuvante,
    tipo_tratamento_neoadjuvante,
    tipo_cirurgia,
    adjuvancia,
    desfecho_morte,
    data_obito,
    metastase,
    recidiva,
    recidiva_local,
    remissao,
  } = req.body;

  try {
    const novaEntrada = await SaudeDaMama.create({
      id_paciente,
      tipo_tumor, 
      data_diagnostico,
      estadiamento,
      biopsia_linfonodo_sentinela,
      tratamento_neoadjuvante,
      tipo_tratamento_neoadjuvante,
      tipo_cirurgia,
      adjuvancia,
      desfecho_morte,
      data_obito,
      metastase,
      recidiva,
      recidiva_local,
      remissao,
    });
    res.status(201).json(novaEntrada);
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos', error });
  }
};

const atualizarSaudeDaMama = async (req, res) => {
  const { id_paciente } = req.params;
  const updates = req.body;

  try {
    // Cria um novo objeto com apenas os campos relevantes
    const dadosAtualizados = {
      tipo_tumor: updates.tipo_tumor,
      data_diagnostico: updates.data_diagnostico,
      estadiamento: updates.estadiamento,
      tipo_cirurgia: updates.tipo_cirurgia,
      adjuvancia: updates.adjuvancia,
      desfecho_morte: updates.desfecho_morte,
      data_obito: updates.data_obito,
      metastase: updates.metastase,
      recidiva: updates.recidiva,
      recidiva_local: updates.recidiva_local,
      remissao: updates.remissao
    };

    const [updated] = await SaudeDaMama.update(dadosAtualizados, {
      where: { id_paciente }
    });

    if (updated) { 
      const updatedEntrada = await SaudeDaMama.findOne({ where: { id_paciente } });
      res.status(200).json(updatedEntrada);
    } else {
      res.status(404).json({ message: 'Entrada não encontrada' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Dados inválidos', error });
  }
};


const deletarSaudeDaMama = async (req, res) => {
  const { id_cancer_de_mama } = req.params;

  try {
    const deleted = await SaudeDaMama.destroy({
      where: { id_cancer_de_mama }
    });

    if (deleted) {
      res.status(200).json({ message: 'Entrada deletada com sucesso' });
    } else {
      res.status(404).json({ message: 'Entrada não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar entrada', error });
  }
};

module.exports = {
  listarSaudeDaMama,
  obterSaudeDaMamaPorId,
  criarSaudeDaMama,
  atualizarSaudeDaMama,
  deletarSaudeDaMama
};