import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Input from "../../components/Input";
import Button from "../../components/Button";
import logoImg from "../../assets/logo.png";

import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';

import {
    FaGithub,
    FaInstagram,
    FaLinkedin
} from 'react-icons/fa';

import {
    Body,
    Container,
    ImgLogo,
    Form,
    FormTitle,
    Footer,
    FooterDev,
    MenuItemLink,
    CheckContainer,
    PasswordContainer,
    ShowPasswordButton
} from "./styles";
import axios from 'axios'; // Importa o axios

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const navigate = useNavigate();
    const { login, logged } = useAuth();

    useEffect(() => {
        if (logged) {
            navigate('/dashboard');
        }
    }, [logged, navigate]);

    useEffect(() => {
        const storedRememberMe = localStorage.getItem('lsRememberMe');
        if (storedRememberMe === 'true') {
            setRememberMe(true);
            const storedEmail = localStorage.getItem('username');
            if (storedEmail) {
                setEmail(storedEmail);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('lsRememberMe', rememberMe);
        if (rememberMe) {
            localStorage.setItem('username', email);
        } else {
            localStorage.removeItem('username');
        }
    }, [rememberMe, email]);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loading) return; // Evita múltiplas submissões
    
        setLoading(true);
    
        try {
            const response = await axios.post('http://localhost:3000/api/usuarios/login', {
                email,
                senha: password
            }); 
            
            if (response.status === 200) {
                const { token, id_usuario } = response.data;
    
                // Armazenar o token e id_usuario no localStorage
                localStorage.setItem('userId', id_usuario);
                localStorage.setItem('token', token);
    
                // Atualiza o estado de autenticação no hook
                login(token, id_usuario);
                console.log('Login bem-sucedido. Redirecionando...');
    
                // Redireciona para o dashboard
                navigate('/dashboard');
            } else {
                toast.error('Credenciais inválidas. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            if (error.response) {
                toast.error(error.response.data.message || 'Erro ao fazer login. Tente novamente.');
            } else if (error.request) {
                toast.error('Sem resposta do servidor. Verifique sua conexão e tente novamente.');
            } else {
                toast.error('Erro ao enviar a requisição. Tente novamente mais tarde.');
            }
        } finally {
            setLoading(false); // Remove o estado de carregamento
        }
    };
    
    return (
        <Body>
            <Container>
                <ImgLogo>
                    <img src={logoImg} alt="VIDA" />
                </ImgLogo>

                {/* Formulário de login */}
                <Form onSubmit={handleLogin}>
                    <FormTitle>CONECTAR</FormTitle>

                    {/* Campo de email */}
                    <Input
                        type="email"
                        placeholder="e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Campo de senha */}
                    <PasswordContainer>
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <ShowPasswordButton
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "Esconder" : "Mostrar"}
                        </ShowPasswordButton>
                    </PasswordContainer>

                    {/* Campo de remember me */}
                    <CheckContainer>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="lsRememberMe"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                            }
                            label="Lembrar-me"
                        />
                    </CheckContainer>

                    {/* Botão de envio */}
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Entrando...' : 'ENTRAR'}
                    </Button>
                </Form>

                
                {/* Rodapé com links para redes sociais */}
                <Footer>
                    COPYRIGHT  2O24 © VIDA | VISUALIZAÇÃO & DADOS EM SAÚDE DA MAMA - TODOS OS DIREITOS RESERVADOS
                </Footer>

                <FooterDev>
                    DESENVOLVIDO POR MARYÂNGELA SOARES
                    <MenuItemLink
                        href="https://github.com/maryangelasoares"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaGithub />
                    </MenuItemLink>
                    <MenuItemLink
                        href="https://instagram.com/maryangelasoares"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaInstagram />
                    </MenuItemLink>
                    <MenuItemLink
                        href="https://linkedin.com/in/maryangelasoares"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FaLinkedin />
                    </MenuItemLink>
                </FooterDev>
            </Container>
            <ToastContainer />
        </Body>
    );
};

export default Login;
