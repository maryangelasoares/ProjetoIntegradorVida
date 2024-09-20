CREATE TABLE Paciente (
    id_paciente INT AUTO_INCREMENT PRIMARY KEY,
    nome_completo VARCHAR(255) NOT NULL,
    endereco VARCHAR(255) NOT NULL,
    cidade VARCHAR(255) NOT NULL,
    telefone VARCHAR(255) NOT NULL,
    data_nascimento DATE NOT NULL,
    naturalidade VARCHAR(255) NOT NULL,
    raca ENUM('Branco', 'Pardo', 'Preto', 'Indígena', 'Amarelo') NOT NULL,
    altura DECIMAL(5, 2) NOT NULL,
    peso DECIMAL(5, 2) NOT NULL,
    imc DECIMAL(5, 2) NOT NULL,
    escolaridade ENUM(
        'Sem instrução', 
        'Ensino Fundamental Incompleto', 
        'Ensino Fundamental Completo', 
        'Ensino Médio Incompleto', 
        'Ensino Médio Completo', 
        'Ensino Superior Incompleto', 
        'Ensino Superior Completo'
    ) NOT NULL,
    renda_familiar ENUM(
        'Sem renda', 
        'Até 1 salário mínimo', 
        '1 a 2 salários mínimos', 
        '2 a 5 salários mínimos', 
        'Maior que 5 salários mínimos'
    ) NOT NULL,
    historico_doenca ENUM(
        'Hipertensão Crônica',
        'Diabetes Mellitus',
        'Hipotireoidismo',
        'Trastorno Ansioso-Depressivo',
        'Dislipidemia',
        'Outro'
    ) NOT NULL,
    cancer_mama_familiar BOOLEAN NOT NULL,
    cancer_ovario_familiar BOOLEAN NOT NULL,
    outros_casos_familiar VARCHAR(255),
    tabagismo BOOLEAN NOT NULL,
    etilismo BOOLEAN NOT NULL,
    atividade_fisica ENUM(
        'Sedentarismo',
        'Caminha Regularmente',
        'Academia de 3 a 5x na Semana',
        'Pratica Outro Tipo de Exercício Físico',
        'Pratica Atividade Física Esporadicamente'
    ) NOT NULL,
    gestacao BOOLEAN NOT NULL,
    paridade BOOLEAN NOT NULL,
    idade_primeiro_filho INT,
    amamentacao BOOLEAN NOT NULL,
    duracao_amamentacao_meses INT,
    menarca_idade INT NOT NULL,
    menopausa BOOLEAN NOT NULL
);
