import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import api from '../services/api';


export default function Perfil({ match }) {


    const idUser = localStorage.getItem('@matchjob:id_user');
    //console.log(idUser);

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState('');
    const [trabalho, setTrabalho] = useState('');
    const [conta, setConta] = useState('');
    const [bio, setBio] = useState('');
    const [trabalhoList, setTrabalhoList] = useState([]);
    const [contaList, setContaList] = useState([]);
    const [userlogged, setUserLogged] = useState([]);

    const submitCadastroAtualizacao = (history) => {
        console.log(usuario);
        console.log(senha);
        console.log(nome);
        axios.put("http://localhost:3030/perfil", {
            usuario: usuario,
            senha: senha,
            nome: nome,
            sobrenome: sobrenome,
            email: email,
            avatar: avatar,
            bio: bio,
            id_trabalho: trabalho,
            id_conta: conta,
        }, { headers: { id_usuario: idUser }, });
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


    useEffect(() => {
        async function CarregaUsuarioLogado() {

            const response = await api.get('/usuariologado', {
                headers: { id_usuario: idUser }
            });
            setUserLogged(response.data);

            const [{ usuario, senha, nome, sobrenome, email, avatar, bio, id_trabalho, id_conta }] = response.data;
            document.querySelector("[name='usuario']").value = usuario;
            document.querySelector("[name='senha']").value = senha;
            document.querySelector("[name='nome']").value = nome;
            document.querySelector("[name='sobrenome']").value = sobrenome;
            document.querySelector("[name='email']").value = email;
            document.querySelector("[name='avatar']").value = avatar;
            //document.querySelector("[name='trabalho']").value = trabalho;
            //document.querySelector("[name='conta']").value = conta;
            document.querySelector("[name='bio']").value = bio;

        }
        CarregaUsuarioLogado();
    }, []);


    console.log(userlogged);


    return (

        <div className="container-contact100">

            <div className="wrap-contact100">
                <form className="contact100-form validate-form">
                    <Link to="/">
                        <span className="contact100-form-title">
                            Perfil
                        </span>
                    </Link>

                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="usuario" placeholder="Usuario"
                            onChange={(e) => { setUsuario(e.target.value) }}
                        />
                        <span className="focus-input100"></span>
                    </div>
                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="senha" placeholder="Senha"
                            onChange={(e) => { setSenha(e.target.value) }}
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="nome" placeholder="Nome"
                            onChange={(e) => { setNome(e.target.value) }}
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="sobrenome" placeholder="Sobre Nome"
                            onChange={(e) => { setSobrenome(e.target.value) }} />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="email" placeholder="E-mail"
                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" name="avatar" placeholder="Avatar"
                            onChange={(e) => { setAvatar(e.target.value) }}
                        />
                        <span className="focus-input100"></span>
                    </div>

                    <div className="wrap-input100 validate-input">
                        <select className="input100" type="text" name="trabalho" placeholder="Trabalho"
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
                        <select className="input100" type="text" name="conta" placeholder="Contratante ou Contratado"
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
                        <textarea className="input100" name="bio" placeholder="Digite aqui sua experiência profissional"
                            onChange={(e) => { setBio(e.target.value) }}
                        ></textarea>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="container-contact100-form-btn">
                        <button className="contact100-form-btn" type="submit" onClick={submitCadastroAtualizacao}>
                            <span>
                                <i className="fa fa-paper-plane-o m-r-6" aria-hidden="true"></i>
                                Atualizar
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}