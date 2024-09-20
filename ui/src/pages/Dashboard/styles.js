import styled from 'styled-components';
import { Typography, Box } from '@mui/material';

export const DashboardContainer = styled.div`
  padding: 20px;
  background-color: #f0f2f5;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espaçamento entre seções */
  width: 100%;
  max-width: 1200px; /* Define um limite de largura */
  margin: 0 auto; /* Centraliza a página */
`;

export const MainChartContainer = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-height: 500px; /* Altura máxima para permitir rolagem */
  overflow-y: auto; /* Adiciona rolagem vertical se necessário */
`;

export const SectionTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #343a40;
  text-align: center;
`;

export const ChartWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 300px; /* Altura ajustada para o gráfico principal */
  max-width: 1000px; /* Limita a largura máxima do gráfico */
  overflow: auto; /* Adiciona rolagem se necessário */
`;

export const SmallChartContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Três gráficos menores em colunas */
  gap: 20px;
  max-height: 600px; /* Altura máxima para a área de gráficos menores */
  overflow-y: auto; /* Adiciona rolagem vertical se necessário */
`;

export const SmallChartWrapper = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 250px; /* Altura menor para os gráficos pequenos */
  max-width: 350px; /* Limita a largura máxima dos gráficos menores */
  overflow: auto; /* Adiciona rolagem se necessário */
`;

export const Container = styled.div``;

export const TableWrapper = styled.div`
  overflow: auto; /* Adiciona rolagem se necessário */
`;

export const TableTitle = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  padding-bottom: 10px;
  margin: 0 0 10px;
  min-height: 45px;
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  select {
    color: #8a8a8a;
    border-color: #ddd;
    border-width: 0 0 1px 0;
    padding: 3px 10px 3px 5px;
    margin: 5px;
  }
`;

export const Title = styled.div`
  margin-right: 200px;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
`;

export const Search = styled.div``;

export const SearchBox = styled.div`
  position: relative;
  float: right;
`;

export const InputGroup = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  right: 0;
  width: ${({ isFocused, boxWidth }) => (isFocused ? '300px' : `${boxWidth}px`)}; /* Largura ajustável */
  min-width: 200px;
  transition: width 0.3s ease;
`;

export const InputGroupAddon = styled.span`
  border: none;
  background: transparent;
  position: absolute;
  z-index: 9;
  align-items: center;
  color: #707070;
`;

export const Input = styled.input`
  height: 30px;
  padding-left: 28px;
  box-shadow: none !important;
  border-bottom: 1px solid #8A8A8A;
  width: 100%;
  color: #8A8A8A;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #ff7aac;
    outline: none;
  }
`;
