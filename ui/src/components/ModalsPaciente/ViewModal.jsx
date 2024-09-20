import React, { useState, useEffect } from 'react';
import { Modal, Button, Typography, Box, TextField } from '@mui/material';
import axios from 'axios';
import { GlobalStyles } from '@mui/system';
import { format } from 'date-fns';

const ViewModal = ({ open, onClose, pacienteId }) => {
    const [paciente, setPaciente] = useState(null);
    const [saudeDaMama, setSaudeDaMama] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const pacienteResponse = await axios.get(`http://localhost:3000/api/pacientes/${pacienteId}`);
                setPaciente(pacienteResponse.data);

                const saudeDaMamaResponse = await axios.get(`http://localhost:3000/api/saude-da-mama/${pacienteId}`);
                setSaudeDaMama(saudeDaMamaResponse.data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        if (open && pacienteId) {
            fetchData();
        }
    }, [open, pacienteId]);

    // Funções de formatação
    const formatDate = (dateString) => {
        return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : 'Data não disponível';
    };

    const formatBoolean = (bool) => {
        return bool ? 'Sim' : 'Não';
    };

    const formatValue = (key, value) => {
        if (typeof value === 'boolean') {
            return formatBoolean(value);
        } else if (key.includes('data')) {
            return formatDate(value);
        }
        return value || 'N/A';
    };

    if (!paciente) return null;

    return (
        <>
            <GlobalStyles styles={{
                '::-webkit-scrollbar': { width: '8px' },
                '::-webkit-scrollbar-track': { background: '#f1f1f1' },
                '::-webkit-scrollbar-thumb': { background: '#ff7bac', borderRadius: '4px' },
                '::-webkit-scrollbar-thumb:hover': { background: '#cfcdcd' }
            }} />

            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="view-modal-title"
                aria-describedby="view-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 1000,
                        height: '90%',
                        overflowY: 'auto',
                        bgcolor: 'background.paper',
                        borderRadius: '8px',
                        boxShadow: 24,
                        p: 4,
                        outline: 'none',
                    }}
                >
                    <Typography
                        id="view-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{
                            mb: 2,
                            fontWeight: 'bold',
                            textAlign: 'center',
                            color: '#8A8A8A',
                            letterSpacing: '2px'
                        }}
                    >
                        INFORMAÇÕES DO PACIENTE E SAÚDE DA MAMA
                    </Typography>

                    {/* DADOS DO PACIENTE */}
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                mb: 2,
                                textAlign: 'center',
                                color: '#8A8A8A',
                                letterSpacing: '2px'
                            }}
                        >
                            DADOS DO PACIENTE
                        </Typography>

                        <Box
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                                gap: 2,
                            }}
                        >
                            {Object.entries(paciente).map(([key, value]) => (
                                <TextField
                                    key={key}
                                    label={key.replace(/_/g, ' ')}
                                    value={formatValue(key, value)} // Formata valores
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                    fullWidth
                                    disabled
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* DADOS SAÚDE DA MAMA */}
                    {saudeDaMama && (
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                    mb: 2,
                                    textAlign: 'center',
                                    color: '#8A8A8A',
                                    letterSpacing: '2px'
                                }}
                            >
                                SAÚDE DA MAMA
                            </Typography>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                                    gap: 2,
                                }}
                            >
                                {Object.entries(saudeDaMama).map(([key, value]) => (
                                    <TextField
                                        key={key}
                                        label={key.replace(/_/g, ' ')}
                                        value={formatValue(key, value)} // Formata valores
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                        variant="outlined"
                                        disabled
                                        fullWidth
                                    />
                                ))}
                            </Box>
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            sx={{
                                mt: 2,
                                backgroundColor: '#FF7BAC',
                                color: 'white',
                                '&:hover': {
                                    opacity: 0.8
                                }
                            }}
                            onClick={onClose}
                        >
                            FECHAR
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ViewModal;
