import React, { useState, useEffect } from "react";
import { HeaderContainer, ButtonCadastro } from "./styles";
import Avatar from "@mui/material/Avatar";
import User from "../../assets/images/users/avatar-5.png";
import Modal from "react-modal";
import RegistroPaciente from "../RegistroPacientes";
import { Menu, MenuItem, Box, Button, TextField } from "@mui/material";
import axios from "axios";

Modal.setAppElement("#root");

const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalSenhaIsOpen, setSenhaIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [loading, setLoading] = useState(false); // Estado para controlar o loading
  const [userName, setUserName] = useState(""); // Estado para armazenar o nome do usuário

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          console.error('Usuário não está autenticado');
          return;
        }

        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/usuarios/${userId}`);
        setUserName(response.data.nome_completo);
        console.log(response.data.nome_completo);
      } catch (error) {
        console.error("Erro ao buscar detalhes do usuário:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModalSenha() {
    setSenhaIsOpen(true);
  }

  function closeModalSenha() {
    setSenhaIsOpen(false);
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangeSenha = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem('userId'); // Recupera o ID do usuário logado
      if (!userId) {
        throw new Error('ID do usuário não encontrado.');
      }

      const response = await axios.put(`http://localhost:3000/api/usuarios/${userId}/alterar-senha`, {
        senhaAtual,
        novaSenha,
      });

      console.log('Senha alterada com sucesso:', response.data);
      closeModalSenha(); // Fecha o modal de alteração de senha
    } catch (error) {
      console.error('Erro ao alterar a senha:', error.response ? error.response.data : error.message);
      alert('Erro ao alterar a senha: ' + (error.response ? error.response.data : error.message));
    } finally {
      setLoading(false);
    }
};


  return (
    <HeaderContainer>
      <Avatar
        alt={userName || "Usuário"}
        src={User}
        sx={{ width: 46, height: 46 }}
        onClick={handleClick}
      />

      <ButtonCadastro onClick={openModal}>+ Novo Cadastro</ButtonCadastro>

      {/* Menu do Perfil */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>{userName || "Perfil"}</MenuItem>
        <MenuItem onClick={() => { handleClose(); openModalSenha(); }}>Alterar Senha</MenuItem>
      </Menu>

      {/* Modal de Registro de Pacientes */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Registro de Pacientes"
        ariaHideApp={false}
        appElement={document.getElementById("root")}
        style={{
          overlay: { backgroundColor: "rgba(28, 28, 28, 0.278)" },
          content: {
            border: "none",
            borderRadius: "8px",
            padding: "20px",
          },
        }}
      >
        <div className="barra-modal">
          <h3>DADOS EPIDEMIOLÓGICOS DO PACIENTE</h3>
          <button onClick={closeModal} className="botao-fechar">
            X
          </button>
        </div>

        <RegistroPaciente closeModal={closeModal} />
      </Modal>

      {/* Modal de Alterar Senha */}
      <Modal
        isOpen={modalSenhaIsOpen}
        onRequestClose={closeModalSenha}
        contentLabel="Alterar Senha"
        ariaHideApp={false}
        appElement={document.getElementById("root")}
        style={{
          overlay: { backgroundColor: "rgba(28, 28, 28, 0.278)" },
          content: {
            border: "none",
            borderRadius: "8px",
            padding: "0",
            width: "300px",
            height: "300px",
            margin: "auto",
          },
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            color: "#333",
            padding: "20px",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <div className="barra-modal">
            <h3>ALTERAR SENHA</h3>
            <button onClick={closeModalSenha} className="botao-fechar">
              X
            </button>
          </div>

          <form onSubmit={handleChangeSenha}>
            <TextField
              type="password"
              placeholder="Senha Atual"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={senhaAtual}
              onChange={(e) => setSenhaAtual(e.target.value)}
            />
            <TextField
              type="password"
              placeholder="Nova Senha"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
              {loading ? 'Alterando...' : 'Alterar Senha'}
            </Button>
          </form>
        </Box>
      </Modal>

      <style jsx>{`
        .barra-modal {
          letter-spacing: 1px;
          padding: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #8a8a8a;
        }

        .botao-fechar {
          background-color: #ff7bac;
          align-items: center;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 50px;
          cursor: pointer;
        }

        .ReactModal__Content {
          overflow-y: auto;
          max-height: 90vh;
        }

        .ReactModal__Content::-webkit-scrollbar {
          width: 8px;
        }

        .ReactModal__Content::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        .ReactModal__Content::-webkit-scrollbar-thumb {
          background: #ff7bac;
          border-radius: 4px;
        }

        .ReactModal__Content::-webkit-scrollbar-thumb:hover {
          background: #cfcdcd;
        }
      `}</style>
    </HeaderContainer>
  );
};

export default Header;
