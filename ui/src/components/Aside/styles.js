import styled from 'styled-components';

export const Container = styled.div`
    grid-area: AS;
    color: #8A8A8A;
    background-color: #FFF;
    border-right: 0.5px solid  #CCC;
`;

export const MenuAside = styled.nav `
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const MenuDash = styled.div`
    margin: 10px 180px;
`;

export const ButtonDash = styled.button `
    border-radius: 6px;
    background: linear-gradient(90deg, #FFD8E3, #FF7BAC);
    color: #FFF;
    font-size: 16px;
    padding: 6px 26px;
    letter-spacing: 1px;
    text-decoration: none;
    
    display: flex;
    align-items: center;

    > svg {
       font-size: 20px;
       margin-right: 6px;
    }
`;

export const MenuRegistro = styled.div `
    margin: 4px 10px;
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none;
    transition: opacity .3s;

    &:hover {
        opacity: .7;
    };

    > svg {
    font-size: 18px;
    margin-right:5px;
    }
`;

export const Logout = styled.div `
    display: flex;
    align-items: center;
    margin: 24px 0px;
    font-size: 16px;
    cursor: pointer;
    text-decoration: none; 
    transition: opacity .3s;

    &:hover {
        opacity: .7;
    };

    > svg {
    font-size: 18px;
    margin-right: 5px;
    }
`;

export const Header = styled.header ` 
    margin: 10px 0;
`;

export const LogImg = styled.img `
    width: 180px;
`;
