import React, { useState } from "react";
import axios from 'axios';

import {
  TextField,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Box,
  Snackbar,
  Alert
} from '@mui/material';


import {
  FormContainer,
  FormTitle,
  Form,
  FormField,
  ErroMensagem,
  SubmitButton
} from "./styles";

const RegistroPacientes = ({ closeModal}) => {

  // Definindo estados no topo do componente
  const [userData, setUserData] = useState({
    nome_completo: '',
    endereco: '',
    cidade: '',
    telefone: '',
    data_nascimento: '',
    naturalidade: '',
    raca: '',
    altura: '',
    peso: '',
    imc: '',
    escolaridade: '',
    renda_familiar: '',
    historico_doenca: '',
    cancer_mama_familiar: false,
    cancer_ovario_familiar: false,
    outros_casos_familiar: '',
    tabagismo: false,
    etilismo: false,
    atividade_fisica: '',
    gestacao: false,
    paridade: false,
    idade_primeiro_filho: '',
    amamentacao: false,
    duracao_amamentacao_meses: '',
    menarca_idade: '',
    menopausa: false,
    tipo_tumor: '',
    data_diagnostico: '',
    estadiamento: '',
    biopsia_linfonodo_sentinela: false,
    tratamento_neoadjuvante: false,
    tipo_tratamento_neoadjuvante: null,
    tipo_cirurgia: '',
    adjuvancia: '',
    desfecho_morte: false,
    data_obito: null,
    metastase: false,
    recidiva: false,
    recidiva_local: false,
    remissao: false
  });

  // Estados para sucesso e erro
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Pode ser 'success' ou 'error'


  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    setUserData((prevUserData) => {
      const updatedUserData = {
        ...prevUserData,
        [name]: type === 'file' ? files[0] : value,
      };

      // Calcula o IMC se altura e peso forem fornecidos
      if ((name === "altura" || name === "peso") && updatedUserData.altura && updatedUserData.peso) {
        const alturaMetros = updatedUserData.altura / 100; // Convertendo altura para metros
        const peso = updatedUserData.peso;

        // Verifica se altura e peso são válidos antes de calcular o IMC
        if (alturaMetros > 0 && peso > 0) {
          const imcCalculado = peso / (alturaMetros * alturaMetros);
          updatedUserData.imc = imcCalculado.toFixed(1);
        }
      }

      return updatedUserData;
    });
  };

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value === 'sim'
    }));
  };

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const dadosPaciente = {
        nome_completo: userData.nome_completo,
        endereco: userData.endereco,
        cidade: userData.cidade,
        telefone: userData.telefone,
        data_nascimento: userData.data_nascimento,
        naturalidade: userData.naturalidade,
        raca: userData.raca,
        altura: parseFloat(userData.altura),
        peso: parseFloat(userData.peso),
        imc: parseFloat(userData.imc),
        escolaridade: userData.escolaridade,
        renda_familiar: userData.renda_familiar,
        historico_doenca: userData.historico_doenca,
        cancer_mama_familiar: userData.cancer_mama_familiar,
        cancer_ovario_familiar: userData.cancer_ovario_familiar,
        outros_casos_familiar: userData.outros_casos_familiar,
        tabagismo: userData.tabagismo,
        etilismo: userData.etilismo,
        atividade_fisica: userData.atividade_fisica,
        gestacao: userData.gestacao,
        paridade: userData.paridade,
        idade_primeiro_filho: parseFloat(userData.idade_primeiro_filho),
        amamentacao: userData.amamentacao,
        duracao_amamentacao_meses: parseFloat(userData.duracao_amamentacao_meses),
        menarca_idade: parseFloat(userData.menarca_idade),
        menopausa: userData.menopausa,
      };

      const dadosSaudeDaMama = {
        tipo_tumor: userData.tipo_tumor,
        data_diagnostico: userData.data_diagnostico,
        estadiamento: userData.estadiamento,
        biopsia_linfonodo_sentinela: userData.biopsia_linfonodo_sentinela,
        tratamento_neoadjuvante: userData.tratamento_neoadjuvante,
        tipo_tratamento_neoadjuvante: userData.tipo_tratamento_neoadjuvante,
        tipo_cirurgia: userData.tipo_cirurgia,
        adjuvancia: userData.adjuvancia,
        desfecho_morte: userData.desfecho_morte,
        data_obito: userData.data_obito,
        metastase: userData.metastase,
        recidiva: userData.recidiva,
        recidiva_local: userData.recidiva_local,
        remissao: userData.remissao
      };

      const pacienteResponse = await axios.post('http://localhost:3000/api/pacientes', dadosPaciente);
      const pacienteId = pacienteResponse.data.id_paciente;

      dadosSaudeDaMama.id_paciente = pacienteId;

      await axios.post('http://localhost:3000/api/saude-da-mama', dadosSaudeDaMama);

      setSnackbarMessage('Dados salvos com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      closeModal(); // Fecha o modal após sucesso

    } catch (error) {
      console.error('Erro ao criar paciente ou dados de saúde da mama:', error);
      setSnackbarMessage('Erro ao salvar os dados. Tente novamente.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };


  return (
    <FormContainer>
      <FormTitle>
        DADOS DO PACIENTE
      </FormTitle>

      <Form onSubmit={handleSubmit}>
        <FormField>
          <div>
            <TextField
              label="Nome Completo"
              variant="outlined"
              fullWidth
              margin="normal"
              name="nome_completo"
              value={userData.nome_completo}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>

          <div>
            <TextField
              label="Endereço"
              variant="outlined"
              fullWidth
              margin="normal"
              name="endereco"
              value={userData.endereco}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>

          <div>
            <TextField
              label="Cidade"
              variant="outlined"
              fullWidth
              margin="normal"
              name="cidade"
              value={userData.cidade}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>

          <div>
            <TextField
              label="Telefone"
              variant="outlined"
              fullWidth
              margin="normal"
              name="telefone"
              value={userData.telefone}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>

          <div>
            <TextField
              label="Data de nascimento"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              name="data_nascimento"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              value={userData.data_nascimento}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>

          <div>
            <TextField
              label="Naturalidade"
              variant="outlined"
              fullWidth
              margin="normal"
              name="naturalidade"
              value={userData.naturalidade}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>
        </FormField>

        <FormField>
          <div>
            <TextField
              select
              label="Raça/Etnia"
              variant="outlined"
              fullWidth
              margin="normal"
              name="raca"
              value={userData.raca}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            >
              <MenuItem value="" disabled>Selecione a Raça/Etnia</MenuItem>
              <MenuItem value="Branco">Branco</MenuItem>
              <MenuItem value="Preto">Preto</MenuItem>
              <MenuItem value="Pardo">Pardo</MenuItem>
              <MenuItem value="Amarelo">Amarelo</MenuItem>
              <MenuItem value="Indígena">Indígena</MenuItem>
            </TextField>
          </div>

          <div>
            <TextField
              select
              label="Escolaridade"
              variant="outlined"
              fullWidth
              margin="normal"
              name="escolaridade"
              value={userData.escolaridade}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            >
              <MenuItem value="" disabled>Selecione a escolaridade</MenuItem>
              <MenuItem value="Sem Instrução">Sem Instrução</MenuItem>
              <MenuItem value="Ensino Fundamental Incompleto">Ensino Fundamental Incompleto</MenuItem>
              <MenuItem value="Ensino Fundamental Completo">Ensino Fundamental Completo</MenuItem>
              <MenuItem value="Ensino Médio Incompleto">Ensino Médio Incompleto</MenuItem>
              <MenuItem value="Ensino Médio Completo">Ensino Médio Completo</MenuItem>
              <MenuItem value="Ensino Superior Incompleto">Ensino Superior Incompleto</MenuItem>
              <MenuItem value="Ensino Superior completo">Ensino Superior Completo</MenuItem>
            </TextField>
          </div>

          <div>
            <TextField
              select
              label="Renda Familiar"
              variant="outlined"
              fullWidth
              margin="normal"
              name="renda_familiar"
              value={userData.renda_familiar}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            >
              <MenuItem value="" disabled>Selecione a renda familiar</MenuItem>
              <MenuItem value="Sem Renda">Sem Instrução</MenuItem>
              <MenuItem value="Até 1 salário mínimo">Até 1 salário mínimo</MenuItem>
              <MenuItem value="1 a 2 salários mínimos">1 a 2 salários mínimos</MenuItem>
              <MenuItem value="2 a 5 salários mínimos">2 a 5 salários mínimos</MenuItem>
              <MenuItem value="Maior que 5 salários mínimos">Maior que 5 salários mínimos</MenuItem>
            </TextField>
          </div>

          <div>
            <TextField
              label="Altura (cm)"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="altura"
              value={userData.altura}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>

          <div>
            <TextField
              label="Peso (kg)"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="peso"
              value={userData.peso}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>

          <div>
            <TextField
              label="IMC"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              name="imc"
              value={userData.imc}
              onChange={handleInputChange}
              disabled
            />
          </div>
        </FormField>

        <FormField>
          <div>
            <TextField
              select
              label="Histórico de Doenças"
              variant="outlined"
              fullWidth
              margin="normal"
              name="historico_doenca"
              value={userData.historico_doenca}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            >
              <MenuItem value="" disabled>Selecione a História Patológica</MenuItem>
              <MenuItem value="Hipertensão Crônica">Hipertensão Crônica</MenuItem>
              <MenuItem value="Diabetes Mellitus">Diabetes Mellitus</MenuItem>
              <MenuItem value="Hipotireoidismo">Hipotireoidismo</MenuItem>
              <MenuItem value="Trastorno Ansioso-Depressivo">Trastorno Ansioso-Depressivo</MenuItem>
              <MenuItem value="Dislipidemia">Dislipidemia</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </TextField>
          </div>

          <div>
            <TextField
              select
              label="Atividade Física"
              variant="outlined"
              fullWidth
              margin="normal"
              name="atividade_fisica"
              value={userData.atividade_fisica}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            >
              <MenuItem value="" disabled>Selecione a História Patológica</MenuItem>
              <MenuItem value="Sedentarismo">Sedentarismo</MenuItem>
              <MenuItem value="Caminha Regularmente">Caminha Regularmente</MenuItem>
              <MenuItem value="Academia de 3 a 5x na Semana">Academia de 3 a 5x na Semana</MenuItem>
              <MenuItem value="Pratica Outro Tipo de Exercício Físico">Prática Outro Tipo de Exercício Físico</MenuItem>
              <MenuItem value="Pratica Atividade Física Esporadicamente">Prática Atividade Física Esporadicamente</MenuItem>
            </TextField>
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Tabagismo
              </FormLabel>
              <RadioGroup
                row
                name="tabagismo"
                value={userData.tabagismo ? 'sim' : 'nao'}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Etilismo
              </FormLabel>
              <RadioGroup
                row
                name="etilismo"
                value={userData.etilismo ? 'sim' : 'nao'}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Câncer de Mama na Família
              </FormLabel>
              <RadioGroup
                row
                name="cancer_mama_familiar"
                value={userData.cancer_mama_familiar ? 'sim' : 'nao'}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Câncer de Ovário na Família
              </FormLabel>
              <RadioGroup
                row
                name="cancer_ovario_familiar"
                value={userData.cancer_ovario_familiar ? 'sim' : 'nao'}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </FormField>

        <FormField>
          <div>
            <TextField
              label="Outros Casos de Câncer na Família"
              variant="outlined"
              fullWidth
              margin="normal"
              name="outros_casos_familiar"
              value={userData.outros_casos_familiar}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>

          <div>
            <TextField
              label="Menarca (Idade)"
              variant="outlined"
              fullWidth
              margin="normal"
              name="menarca_idade"
              type="number"
              value={userData.menarca_idade}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Histórico de Gestação
              </FormLabel>
              <RadioGroup
                row
                name="gestacao"
                value={userData.gestacao ? 'sim' : 'nao'}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: userData.gestacao ? '#8a8a8a' : 'default',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                      }}
                    />
                  } label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: userData.gestacao ? '#8a8a8a' : 'default',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                      }}
                    />
                  }
                  label="Não" />
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Paridade
              </FormLabel>
              <RadioGroup
                row
                name="paridade"
                value={userData.paridade ? 'sim' : 'nao'}
                onChange={handleRadioChange}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />

                {/* Campo condicional dentro do RadioGroup */}
                {userData.paridade && (
                  <TextField
                    label="Idade Quando Teve o Primeiro Filho"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="idade_primeiro_filho"
                    value={userData.idade_primeiro_filho}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#8a8a8a',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FF7BAC',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#8a8a8a',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#8a8a8a',
                      },
                      '&:hover .MuiInputLabel-root': {
                        color: '#FF7BAC',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#8A8A8A',
                      }
                    }}
                  />
                )}
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Amamentação
              </FormLabel>
              <RadioGroup
                row
                name="amamentacao"
                value={userData.amamentacao ? 'sim' : 'nao'}
                onChange={handleRadioChange}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />

                {/* Campo condicional dentro do RadioGroup */}
                {userData.amamentacao && (
                  <TextField
                    label="Duração em Meses"
                    type="number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="duracao_amamentacao_meses"
                    value={userData.duracao_amamentacao_meses}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#8a8a8a',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FF7BAC',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#8a8a8a',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#8a8a8a',
                      },
                      '&:hover .MuiInputLabel-root': {
                        color: '#FF7BAC',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#8A8A8A',
                      }
                    }}
                  />
                )}

              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Menopausa
              </FormLabel>
              <RadioGroup
                row
                name="menopausa"
                value={userData.menopausa ? 'sim' : 'nao'}
                onChange={handleRadioChange}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </FormField>

        {/* REGISTRO SAÚDE DA MAMA */}
        <FormTitle>
          SAÚDE DA MAMA
        </FormTitle>

        <FormField>
          {/* BIOPSIA */}
          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Biopsia do Linfonodo
              </FormLabel>
              <RadioGroup
                row
                name="biopsia_linfonodo_sentinela"
                value={userData.biopsia_linfonodo_sentinela ? 'sim' : 'nao'}
                onChange={handleRadioChange}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </div>

          {/* TRATAMENTO NEOADJUVANTE */}
          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Tratamento Neoadjuvante
              </FormLabel>
              <RadioGroup
                row
                name="tratamento_neoadjuvante"
                value={userData.tratamento_neoadjuvante ? 'sim' : 'nao'}
                onChange={handleRadioChange}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
                {/* Campo condicional */}
                {userData.tratamento_neoadjuvante && (
                  <TextField
                    label="Tipo de Tratamento Neoadjuvante"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="tipo_tratamento_neoadjuvante"
                    value={userData.tipo_tratamento_neoadjuvante}
                    onChange={handleInputChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#8a8a8a',
                        },
                        '&:hover fieldset': {
                          borderColor: '#FF7BAC',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#8a8a8a',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: '#8a8a8a',
                      },
                      '&:hover .MuiInputLabel-root': {
                        color: '#FF7BAC',
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#8A8A8A',
                      }
                    }}
                  />
                )}
              </RadioGroup>
            </FormControl>
          </div>

          {/* TIPO DE TUMOR */}
          <div>
            <TextField
              select
              label="Tipo de Tumor"
              variant="outlined"
              fullWidth
              margin="normal"
              name="tipo_tumor"
              value={userData.tipo_tumor}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            >
              <MenuItem value="" disabled>Selecione o tipo de tumor</MenuItem>
              <MenuItem value="Carcinoma ductal invasivo">Carcinoma ductal invasivo</MenuItem>
              <MenuItem value="Carcinoma invasivo SOE">Carcinoma invasivo SOE</MenuItem>
              <MenuItem value="Carcinoma invasivo de tipo não especial">Carcinoma invasivo de tipo não especial</MenuItem>
              <MenuItem value="Carcinoma lobular invasivo">Carcinoma lobular invasivo</MenuItem>
              <MenuItem value="Carcinoma tubular invasivo">Carcinoma tubular invasivo</MenuItem>
              <MenuItem value="Carcinoma medular invasivo">Carcinoma medular invasivo</MenuItem>
              <MenuItem value="Carcinoma mucinoso invasivo">Carcinoma mucinoso invasivo</MenuItem>
              <MenuItem value="Carcinoma metaplásico">Carcinoma metaplásico</MenuItem>
              <MenuItem value="Carcinoma colóide invasivo">Carcinoma colóide invasivo</MenuItem>
              <MenuItem value="Outros tipos de câncer de mama">Outros tipos de câncer de mama</MenuItem>
            </TextField>
          </div>

          {/* DIAGNÓSTICO */}
          <div>
            <TextField
              label="Data do Diagnóstico"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              name="data_diagnostico"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              value={userData.data_diagnostico}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>

          {/* ESTÁDIO DE TUMOR */}
          <div>
            <TextField
              select
              label="Estádio do Tumor"
              variant="outlined"
              fullWidth
              margin="normal"
              name="estadiamento"
              value={userData.estadiamento}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a', // Cor da borda padrão
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            >
              <MenuItem value="" disabled>Selecione o estadiamento</MenuItem>
              <MenuItem value="Estádio 0">Estádio 0</MenuItem>
              <MenuItem value="Estádio I">Estádio I</MenuItem>
              <MenuItem value="Estádio II">Estádio II</MenuItem>
              <MenuItem value="Estádio III">Estádio III</MenuItem>
              <MenuItem value="Estádio IV">Estádio IV</MenuItem>
            </TextField>
          </div>

          {/* CIRURGIA */}
          <div>
            <TextField
              select
              label="Tipo de Cirúrgia"
              variant="outlined"
              fullWidth
              margin="normal"
              name="tipo_cirurgia"
              value={userData.tipo_cirurgia}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            >
              <MenuItem value="" disabled>Selecione o tipo de cirurgia</MenuItem>
              <MenuItem value="Mastectomia">Mastectomia</MenuItem>
              <MenuItem value="Quadrantectomia">Quadrantectomia</MenuItem>
              <MenuItem value="Setorectomia">Setorectomia</MenuItem>
              <MenuItem value="Outros">Outros</MenuItem>
            </TextField>
          </div>

          {/* TRATAMENTO ADJUVANTE */}
          <div>
            <TextField
              select
              label="Tratamento Adjuvância"
              variant="outlined"
              fullWidth
              margin="normal"
              name="adjuvancia"
              value={userData.adjuvancia}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a', // Cor da borda ao focar
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            >
              <MenuItem value="" disabled>Selecione a adjuvância</MenuItem>
              <MenuItem value="Quimioterapia">Quimioterapia</MenuItem>
              <MenuItem value="Radioterapia">Radioterapia</MenuItem>
              <MenuItem value="Endocrinoterapia">Endocrinoterapia</MenuItem>
              <MenuItem value="Terapia Alvo">Terapia Alvo</MenuItem>
              <MenuItem value="Nenhuma">Nenhuma</MenuItem>
            </TextField>
          </div>
        </FormField>

        {/* REMISSÃO / RECIDIVA / METÁSTASE */}
        <FormField>
          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Remissão
              </FormLabel>
              <RadioGroup
                row
                name="remissao"
                value={userData.remissao ? 'sim' : 'nao'}
                onChange={handleRadioChange}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Metástase
              </FormLabel>
              <RadioGroup
                row
                name="metastase"
                value={userData.metastase ? 'sim' : 'nao'}
                onChange={handleRadioChange}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Recidiva
              </FormLabel>
              <RadioGroup
                row
                name="recidiva"
                value={userData.recidiva ? 'sim' : 'nao'}
                onChange={handleRadioChange}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Recidiva Local
              </FormLabel>
              <RadioGroup
                row
                name="recidiva_local"
                value={userData.recidiva_local ? 'sim' : 'nao'}
                onChange={handleRadioChange}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl>
              <FormLabel
                component="legend"
                sx={{
                  color: '#8a8a8a',
                  '&.Mui-focused': {
                    color: '#FF7BAC',
                  },
                }}
              >
                Desfecho Por Morte
              </FormLabel>
              <RadioGroup
                row
                name="desfecho_morte"
                value={userData.desfecho_morte ? 'sim' : 'nao'}
                onChange={handleRadioChange}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <FormControlLabel
                  value="sim"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Sim"
                />
                <FormControlLabel
                  value="nao"
                  control={
                    <Radio
                      sx={{
                        color: '#8a8a8a',
                        '&.Mui-checked': {
                          color: '#FF7BAC',
                        },
                        '&.Mui-focusVisible': {
                          outline: 'none !important',
                        },
                        '&.Mui-focusVisible .MuiSvgIcon-root': {
                          color: '#FF7BAC',
                        }
                      }}
                    />
                  }
                  label="Não"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <TextField
              label="Data da Morte"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              name="data_obito"
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
              value={userData.data_obito}
              onChange={handleInputChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#8a8a8a',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FF7BAC',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#8a8a8a',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#8a8a8a',
                },
                '&:hover .MuiInputLabel-root': {
                  color: '#FF7BAC',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#8A8A8A',
                }
              }}
            />
          </div>
        </FormField>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: '#FF7BAC',
              color: 'white',
              '&:hover': {
                opacity: 0.8
              }
            }}
          >
            <SubmitButton> Salvar </SubmitButton>
          </Button>
        </Box>
        <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      </Form>
    </FormContainer>
  );
};

export default RegistroPacientes;