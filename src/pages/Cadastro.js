import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import './Cadastro.css';

import api from '../services/api';

export default function Cadastro({ match, history }) {

    const [usuario, setUsuario] = useState('');
    const [celular, setCelular] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [trabalho, setTrabalho] = useState('');
    const [conta, setConta] = useState('');
    const [bio, setBio] = useState('');
    const [trabalhoList, setTrabalhoList] = useState([]);
    const [contaList, setContaList] = useState([]);

    async function submitCadastro() {
        try {
            const response = await axios.post("http://localhost:3030/novoUsuario", {
                usuario: usuario,
                celular: celular,
                nome: nome,
                sobrenome: sobrenome,
                email: email,
                avatar: avatar,
                bio: bio,
                id_trabalho: trabalho,
                id_conta: conta,
            });
            console.log(response.data);
            history.push("/");
            toast.success("Sucesso!");
        } catch {
            toast.error("Erro ao Cadastrar. Tente novamente.")
        }

    }

    useEffect(() => {
        async function CarregaTrabalho() {
            const response = await api.get('/trabalho');
            setTrabalhoList(response.data);
        }
        CarregaTrabalho();
    }, [match.params.id_usuario]);

    useEffect(() => {
        async function CarregaConta() {
            const response = await api.get('/tipoconta');
            setContaList(response.data);
        }
        CarregaConta();
    }, [match.params.id_usuario]);

    return (

        <div className="container-contact100">

            <div className="wrap-contact100">
                <form className="contact100-form validate-form">
                    <span className="contact100-form-title">
                        Cadastro
                    </span>
                    <Link to="/">
                        <p className="contact100-form-subtitle">Voltar</p>
                    </Link>

                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="usuario" placeholder="Usuario" required
                            onChange={(e) => { setUsuario(e.target.value) }}
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="celular" placeholder="Celular" required
                            onChange={(e) => { setCelular(e.target.value) }}
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="nome" placeholder="Nome" required
                            onChange={(e) => { setNome(e.target.value) }}
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="sobrenome" placeholder="Sobre Nome" required
                            onChange={(e) => { setSobrenome(e.target.value) }} />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="email" placeholder="E-mail" required
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="avatar" placeholder="Avatar" required
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <select className="input100" type="text" name="trabalho" placeholder="Trabalho" required
                            onChange={(e) => { setTrabalho(e.target.value) }}
                        >
                            <option value="0">Selecione seu trabalho</option>
                            {trabalhoList.map(row => (
                                <option key={row.id_trabalho} value={row.id_trabalho}>{row.descricao_trabalho}</option>
                            ))}
                        </select>
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <select className="input100" type="text" name="conta" placeholder="Contratante ou Contratado" required
                            onChange={(e) => { setConta(e.target.value) }}
                        >
                            <option value="0">Contratante ou Contratado</option>
                            {contaList.map(row => (
                                <option key={row.id_conta} value={row.id_conta}>{row.descricao_conta}</option>
                            ))}
                        </select>
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <textarea className="input100" name="bio" placeholder="Digite aqui sua experiência profissional" required
                            onChange={(e) => { setBio(e.target.value) }}
                        ></textarea>
                        <span className="focus-input100"></span>
                    </div>

                    <div className="container-contact100-form-btn">
                        <button className="contact100-form-btn" type="button" onClick={submitCadastro}>
                            <span>
                                <i className="fa fa-paper-plane-o m-r-6" aria-hidden="true"></i>
                                Enviar
                            </span>
                        </button>
                    </div>
                </form>
                <ToastContainer />
            </div>
        </div>



    )
}