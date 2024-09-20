import styled from "styled-components";

export const Container = styled.div` 
    height: 37.2rem; 
    width: 79rem;
    background-color: #fff;
    border-radius: 10px;
    padding: 16px 16px 16px 16px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
`;

export const TableWrapper = styled.div`
`;


export const TableTitle = styled.div`
    display: flex;
    justify-content: space-between;
    align-self: center;

    font-size: 15px;
    padding-bottom: 10px;
    margin: 0 0 10px;
    min-height: 45px;
`;

export const Options = styled.div`
    display: flex;
    align-items: center;
    appearance: none;
    select {
        color: #8a8a8a;
        border-color: #ddd;
        border-width: 0 0 1px 0;
        padding: 3px 10px 3px 5px;
        margin: 5px;
    };
`;

export const Title = styled.div`
    margin-right: 200px;
    letter-spacing: 2px;
    display: flex;
    align-items: center;
`;

export const Search = styled.div `

`;

export const SearchBox = styled.div`
    position: relative;
    float: right;
`;

export const InputGroup = styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    right: 0;
    width: 240px;
    transition: width 0.3s ease;
`;

export const InputGroupAddon = styled.span`
    border: none;
    background: transparent;
    position: absolute;
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

export const TableContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

export const Th = styled.th`
  letter-spacing: 2px;
  background-color: #f2f2f2;
  padding: 10px;
  border-bottom: 1px solid #8A8A8A;  
`;

export const Td = styled.td`
  padding: 10px;
  border-bottom: 1px solid #8A8A8A;  
`;

export const ActionIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    align-items: center;

    transition: opacity .3s;

    &:hover {
        opacity: .7;
    };
}

  svg {
    color: #ff7aac;
    width: 18px;
    height: 18px;
}
`;

export const CustomTooltip = styled.div`
  .custom-tooltip {
    position: absolute;
    z-index: 9999; /* Garantir que o tooltip esteja acima de outros elementos */
    /* Adicione outros estilos que desejar aqui */
  }
`;