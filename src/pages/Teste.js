import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './Teste.css';
import api from '../services/api';
import axios from "axios";

import seta from '../assets/setaEsquerda.png'

export default function Teste({ match, history }) {

    const idUser = localStorage.getItem('@matchjob:id_user');

    const [usuario, setUsuario] = useState('');
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [avatar, setAvatar] = useState('');
    const [celular, setCelular] = useState('');
    const [bio, setBio] = useState('');
    const [id_trabalho, setIdTrabalho] = useState('');
    const [id_conta, setIdConta] = useState('');
    const [trabalhoList, setTrabalhoList] = useState([]);
    const [contaList, setContaList] = useState([]);
    const [userlogged, setUserLogged] = useState([]);
    const [matchs, setMatchs] = useState([]);

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
            console.log(response.data);
            setUserLogged(response.data);

            const [{ usuario, nome, sobrenome, email, avatar, celular, id_trabalho, id_conta, bio }] = response.data;
            setUsuario(usuario)
            setEmail(email)
            setNome(nome);
            setSobrenome(sobrenome);
            setAvatar(avatar);
            setCelular(celular);
            setBio(bio);
            setIdTrabalho(id_trabalho);
            setIdConta(id_conta);

        }
        CarregaUsuarioLogado();
    }, [match.params.id_usuario]);

    const submitCadastroAtualizacao = () => {
        axios.put("http://localhost:3030/perfil", {
            usuario: usuario,
            email: email,
            nome: nome,
            sobrenome: sobrenome,
            avatar: avatar,
            celular: celular,
            id_trabalho: id_trabalho,
            id_conta: id_conta,
            bio: bio,
        }, { headers: { id_usuario: idUser }, });
        toast.success("Perfil atualizado com sucesso!");
    }

    useEffect(() => {
        async function CarregaMatchs() {
            const response = await api.get('/matchusuarios', {
                headers: { id_usuario: idUser }
            });
            setMatchs(response.data);
            console.log(response.data);
        }
        CarregaMatchs();
    }, [match.params.id_usuario]);


    async function voltarPagina() {

        
        const response = await api.get('/usuariologado', {
            headers: { id_usuario: idUser }
        });
        const [{ id_usuario }] = response.data;
        history.push(`/usuarios/${id_usuario}`);
    }
    //console.log(matchs);

    return (

        <div className="container">
            <div className="box">
                <div className="boxEsquerdaIcone">
                    <button type="buttons" onClick={() => voltarPagina()}>
                        <img className="setaEsquerda" src={seta} alr="setavoltar" />
                    </button>
                </div>
                <div className="boxEsquerda">
                    {userlogged.map(row => (
                        <img className="imagem" key={row.id_usuario} src={row.avatar} />
                    ))}
                </div>
                <div className="boxDireita">
                    {userlogged.map(row => (
                        <h1>Olá {row.nome}, esse é seu perfil, fique a vontade.</h1>
                    ))}
                    <div className="rowDiv">
                        <div className="row1">
                            <div className="userLabel">
                                <label className="usuario">Usuario</label>
                            </div>
                            <input className="inputProfile" value={usuario} type="text" name="usuario" disabled placeholder="Usuario" onChange={(e) => { setUsuario(e.target.value) }} />
                        </div>
                        <div className="row1">
                            <div className="userLabel">
                                <label className="email">Email</label>
                            </div>
                            <input className="inputProfile" value={email} type="text" name="email" disabled placeholder="Email"
                                onChange={(e) => { setEmail(e.target.value) }}
                            ></input>
                        </div>
                    </div>
                    { /* Segunda Linha :) */}
                    <div className="rowDiv">
                        <div className="row1">
                            <div className="userLabel">
                                <label className="nome">Nome</label>
                            </div>
                            <input className="inputProfile" value={nome} type="text" name="nome" placeholder="Nome" onChange={(e) => { setNome(e.target.value) }}></input>
                        </div>
                        <div className="row1">
                            <div className="userLabel">
                                <label className="sobrenome">Sobrenome</label>
                            </div>
                            <input className="inputProfile" value={sobrenome} type="text" name="sobrenome" placeholder="Sobrenome" onChange={(e) => { setSobrenome(e.target.value) }} ></input>
                        </div>
                    </div>
                    { /* Terceira Linha :) */}
                    <div className="rowDiv">
                        <div className="row1">
                            <div className="userLabel">
                                <label className="avatar">Avatar</label>
                            </div>
                            <input className="inputProfile" value={avatar} type="text" name="avatar" placeholder="Avatar" onChange={(e) => { setAvatar(e.target.value) }}></input>
                        </div>
                        <div className="row1">
                            <div className="userLabel">
                                <label className="celular">Celular</label>
                            </div>
                            <input className="inputProfile" value={celular} type="text" name="celular" placeholder="Celular" onChange={(e) => { setCelular(e.target.value) }} ></input>
                        </div>
                    </div>
                    { /* Quarta Linha :) */}
                    <div className="rowDiv">

                        <div className="row1">
                            <div className="userLabel">
                                <label className="trabalho">Trabalho</label>
                            </div>
                            <select value={id_trabalho} type="text" name="trabalho" placeholder="Trabalho" onChange={(e) => { setIdTrabalho(e.target.value) }} >
                                {userlogged.map(row => (
                                    <option key={row.id_trabalho} value={row.id_trabalho} disabled selected hidden>{row.descricao_trabalho}</option>
                                ))}
                                {trabalhoList.map(row => (
                                    <option key={row.id_trabalho} value={row.id_trabalho}>{row.descricao_trabalho}</option>
                                ))}
                            </select>
                        </div>

                        <div className="row1">
                            <div className="userLabel">
                                <label className="conta">Tipo da Conta</label>
                            </div>
                            <select value={id_conta} type="text" name="conta" placeholder="Conta" onChange={(e) => { setIdConta(e.target.value) }} >
                                {userlogged.map(row => (
                                    <option key={row.id_conta} value={row.id_conta} disabled selected hidden>{row.descricao_conta}</option>
                                ))}
                                {contaList.map(row => (
                                    <option key={row.id_conta} value={row.id_conta}>{row.descricao_conta}</option>
                                ))}
                            </select>
                        </div>

                    </div>
                    { /* Quinta Linha :) */}
                    <div className="rowDiv">
                        <div className="row1">
                            <div className="userLabel">
                                <label className="conta">Bio</label>
                            </div>
                            <textarea className="profileTextarea" value={bio} name="bio" placeholder="Digite aqui sua expreciência profissional" onChange={(e) => { setBio(e.target.value) }} >
                            </textarea>
                        </div>
                    </div>
                    { /* Sexta Linha :) */}
                    <div className="rowDiv1">
                        <button className="profileButton" type="submit" onClick={submitCadastroAtualizacao}>Enviar</button>
                    </div>
                </div>
                <div >
                    <h1 className="empty">Seus Matchs!</h1>
                    {matchs.length > 0 ? (
                        <ul className="lista">
                            {matchs.map(row => (
                                <li className="cartoes">
                                    <img className="imgMain" src={row.avatar} alt="" />
                                    <footer className="footerprofile">
                                        <strong>{row.nome} {row.sobrenome}</strong>
                                        <p>{row.descricao_conta}</p>
                                        <p>Função: {row.descricao_trabalho}</p>
                                        <p>Celular: {row.celular}</p>
                                        <p>Email: {row.email}</p>
                                        <p>Bio:{row.bio}</p>
                                    </footer>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="empty" >Nada por aqui hoje  =( </div>
                    )}
                </div>
                <ToastContainer />
            </div>
        </div >

    )

}


