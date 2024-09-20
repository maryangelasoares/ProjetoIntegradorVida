import styled from "styled-components";

export const FormContainer = styled.div` 
  position: relative;
  display: flex;
  flex-direction: column;
  color: #8a8a8a;
`;

export const FormTitle = styled.h3` 
  color: #8a8a8a;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 12px;
  letter-spacing: 2px;
`;

export const Form = styled.form` 
  display: flex;
  flex-direction: column;
`;

export const FormField = styled.div` 
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 4px;
  width: 100%;

  & > div {
    flex: 1;
    min-width: 100px;
    margin: 6px;
    margin-bottom: 8px;
  };

  Input {
    color: #8A8A8A;
  };

  Select {
    color: #8A8A8A;
  };
`;

export const Confirm = styled.div ` 
  display: flex;
  align-items: center;
  justify-content: space-around;
  

  div {
    margin-top: 6px;
  }
`;

export const Input = styled.input` 
  color: #8a8a8a;
 border: 1px solid #8a8a8a;
`;


export const ErroMensagem = styled.div` 

`;

export const SubmitButton = styled.div` 

`;

export const Button= styled.button` 

`;

