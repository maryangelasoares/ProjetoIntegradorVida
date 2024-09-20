CREATE TABLE SaudeDaMama (
    id_cancer_de_mama INT AUTO_INCREMENT PRIMARY KEY,
    id_paciente INT NOT NULL,
    tipo_tumor ENUM(
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
    data_diagnostico DATE,
    estadiamento ENUM(
        'Estádio 0',
        'Estádio I',
        'Estádio II',
        'Estádio III',
        'Estádio IV'
    ),
    biopsia_linfonodo_sentinela BOOLEAN,
    tratamento_neoadjuvante BOOLEAN,
    tipo_tratamento_neoadjuvante VARCHAR(255),
    tipo_cirurgia ENUM(
        'Mastectomia',
        'Quadrantectomia',
        'Setorectomia',
        'Outros'
    ),
    adjuvancia ENUM(
        'Quimioterapia',
        'Radioterapia',
        'Endocrinoterapia',
        'Terapia Alvo',
        'Nenhuma'
    ),
    desfecho_morte BOOLEAN,
    data_obito DATE,
    metastase BOOLEAN,
    recidiva BOOLEAN,
    recidiva_local BOOLEAN,
    remissao BOOLEAN,
    FOREIGN KEY (id_paciente) REFERENCES Paciente(id_paciente) 
);