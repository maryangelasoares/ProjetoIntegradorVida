import React from "react";
import { Link, useNavigate } from 'react-router-dom'; // Importe useNavigate para redirecionar
import { Container, MenuAside, MenuDash, ButtonDash, MenuRegistro, LogImg, Header, Logout } from "./styles";
import { MdDashboard } from "react-icons/md";
import { FaClipboardUser } from "react-icons/fa6";
import { RiLogoutBoxRFill } from "react-icons/ri";
import LogoVida from "../../assets/logo.png";
import { useAuth } from '../../hooks/useAuth'; // Importe o hook useAuth para gerenciar autenticação
import axios from 'axios';

const Aside = () => {
  const navigate = useNavigate(); // Use navigate para redirecionar
  const { logout } = useAuth(); // Use o hook useAuth para acessar a função de logout

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/usuarios/logout'); // Chama o endpoint de logout
      logout(); 
      navigate('/login'); 
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <Container>
      <MenuAside>
        <Header>
          <LogImg src={LogoVida} alt="logoVida" />
        </Header>

        <MenuDash>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <ButtonDash>
              <MdDashboard /> Dashboard
            </ButtonDash>
          </Link>
        </MenuDash>

        <MenuRegistro>
          <Link to="/registros" style={{ textDecoration: 'none', color: '#8A8A8A' }}>
            <span>
              <FaClipboardUser /> Registros
            </span>
          </Link>
        </MenuRegistro>


        <Logout onClick={handleLogout}>
          <RiLogoutBoxRFill />
          Sair
        </Logout>
      </MenuAside>
    </Container>
  );
}

export default Aside;
