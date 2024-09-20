import React, { useState, useEffect } from "react";
import {
    Container, TableWrapper, TableTitle, Options, Title, Search, SearchBox, Input, InputGroup, InputGroupAddon,
    TableContainer, Table, Th, Td, ActionIcons, CustomTooltip
} from "./styles";
import { BsSearchHeart } from "react-icons/bs";
import { MdDeleteForever, MdVisibility, MdEdit } from "react-icons/md";
import { Tooltip } from 'react-tooltip';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import axios from 'axios';
import EditModal from '../../components/ModalsPaciente/EditModal';
import ViewModal from '../../components/ModalsPaciente/ViewModal';
import DeleteModal from '../../components/ModalsPaciente/DeleteModal';

const Registro = () => {
    const [pacientes, setPacientes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itensPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPaciente, setSelectedPaciente] = useState(null);

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                // 1. Buscar dados dos pacientes
                const pacientesResponse = await axios.get('http://localhost:3000/api/pacientes', {
                    params: {
                        page: currentPage,
                        limit: itensPerPage,
                        searchTerm: searchTerm
                    }
                });
                const pacientesData = pacientesResponse.data;

                // 2. Buscar dados de status dos pacientes
                const statusResponse = await axios.get('http://localhost:3000/api/data-analysis/status_paciente');
                const statusData = statusResponse.data;

                // 3. Combinar os dados
                const pacientesComStatus = pacientesData.map(paciente => {
                    // Encontrar o status correspondente ao paciente
                    const pacienteStatus = statusData.find(s => s.nome_completo === paciente.nome_completo);

                    // Adicionar o status ao objeto do paciente
                    if (pacienteStatus) {
                        paciente.status = pacienteStatus.status;
                    } else {
                        paciente.status = "Sem Status"; // Ou outro valor padrão adequado
                    }
                    return paciente;
                });
                setPacientes(pacientesComStatus);

                // Ajustar o cálculo de totalPages para considerar o número real de pacientes
                const totalPacientes = parseInt(pacientesResponse.headers['x-total-count'], 10);
                const novasTotalPages = Math.ceil(totalPacientes / itensPerPage);
                setTotalPages(novasTotalPages); 

                // Garantir que a página atual não ultrapasse o limite após a atualização
                if (currentPage > novasTotalPages) {
                    setCurrentPage(novasTotalPages); 
                }

            } catch (error) {
                console.error('Erro ao buscar pacientes ou status:', error);
            }
        };

        fetchPacientes();
    }, [currentPage, searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleViewClick = (paciente) => {
        setSelectedPaciente(paciente);
        setIsViewModalOpen(true);
    };

    const handleEditClick = (paciente) => {
        setSelectedPaciente(paciente);
        setIsEditModalOpen(true);
    };

    const handleDeleteClick = (paciente) => {
        setSelectedPaciente(paciente);
        setIsDeleteModalOpen(true);
    };

    const handleUpdatePaciente = async (formData) => {
        try {
            console.log('Dados enviados:', formData); // Verifica o conteúdo do formData
            await axios.put(`http://localhost:3000/api/saude-da-mama/${selectedPaciente.id_paciente}`, formData);
            setIsEditModalOpen(false);
        } catch (error) {
            console.error('Erro ao atualizar paciente:', error);
        }
    };
    

    return (
        <Container>
            <TableWrapper>
                <TableTitle>
                    <Title>/REGISTRO DE PACIENTES</Title>
                    <Search>
                        <SearchBox>
                            <InputGroup>
                                <InputGroupAddon>
                                    <BsSearchHeart />
                                </InputGroupAddon>
                                <Input
                                    type="text"
                                    placeholder="Procurar..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                />
                            </InputGroup>
                        </SearchBox>
                    </Search>
                </TableTitle>

                <TableContainer>
                    <Table>
                        <thead>
                            <tr>
                                <Th>ID</Th>
                                <Th>NOME PACIENTE</Th>
                                <Th>CIDADE</Th>
                                <Th>STATUS</Th>
                                <Th>AÇÃO</Th>
                            </tr>
                        </thead>
                        <tbody>
                            {pacientes.map(paciente => (
                                <tr key={paciente.id_paciente}>
                                    <Td>{paciente.id_paciente}</Td>
                                    <Td>{paciente.nome_completo}</Td>
                                    <Td>{paciente.cidade}</Td>
                                    <Td>{paciente.status}</Td>
                                    <Td>
                                        <ActionIcons>
                                            <button onClick={() => handleViewClick(paciente)}>
                                                <MdVisibility />
                                            </button>
                                            <button onClick={() => handleEditClick(paciente)}>
                                                <MdEdit />
                                            </button>
                                            <button onClick={() => handleDeleteClick(paciente)}>
                                                <MdDeleteForever />
                                            </button>
                                        </ActionIcons>
                                        <CustomTooltip>
                                            <Tooltip className="custom-tooltip" place="top" type="dark" effect="solid" />
                                        </CustomTooltip>
                                    </Td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableContainer>

                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        renderItem={(item) => (
                            <PaginationItem
                                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                {...item}
                            />
                        )}
                    />
                </Stack>
            </TableWrapper>
            {selectedPaciente && (
                <>
                    <ViewModal
                        open={isViewModalOpen}
                        onClose={() => setIsViewModalOpen(false)}
                        pacienteId={selectedPaciente.id_paciente}
                    />

                    <EditModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        saudeDaMama={selectedPaciente}  // Certifique-se de que isso contenha os dados que você precisa
                        pacienteId={selectedPaciente.id_paciente}  // Passar o id do paciente
                        onUpdate={handleUpdatePaciente}
                    />

                    <DeleteModal
                        open={isDeleteModalOpen}
                        onClose={() => setIsDeleteModalOpen(false)}
                        pacienteId={selectedPaciente.id_paciente}
                        onDelete={() => {
                            setPacientes(pacientes.filter(p => p.id_paciente !== selectedPaciente.id_paciente));
                            setIsDeleteModalOpen(false);
                        }}
                    />
                </>
            )}

        </Container>
    );
};

export default Registro;
