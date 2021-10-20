import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { Button, Modal } from 'react-bootstrap';
import './Main.css';


import api from '../services/api';
import logo from '../assets/MatchJobsRoxo.png';
import like from '../assets/like.png'
import dislike from '../assets/dislike.png'

export default function Main({ match, history }) {

    const [usuarios, setUsuarios] = useState([]);
    const [userlogged, setUserLogged] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function CarregaUsuarios() {
            const response = await api.get('/usuarios', {
                headers: { id_usuario: match.params.id_usuario }
            });
            setUsuarios(response.data);
        }
        CarregaUsuarios();
    }, [match.params.id_usuario]);

    useEffect(() => {
        async function CarregaUsuarioLogado() {
            const response = await api.get('/usuariologado', {
                headers: { id_usuario: match.params.id_usuario }
            });
            setUserLogged(response.data);
        }
        CarregaUsuarioLogado();
    }, [match.params.id_usuario]);

    async function handleLike(id_usuario, id_acao) {
        const usuarioLogado = parseInt(match.params.id_usuario);
        const response = await api.post(`/usuarios/${id_usuario}/acao`, { id_acao }, { headers: { id_usuario1: usuarioLogado }, })

        console.log(response.data);
        setUsuarios(usuarios.filter(user => user.id_usuario !== id_usuario));
        toast.success("Like Enviado!");

        if (response.data) {
            setShow(true);
            toast.info("Deu match");
        }
    };

    const handleClose = () => setShow(false);

    async function handleDislike(id_usuario, id_acao) {
        const usuarioLogado = parseInt(match.params.id_usuario);
        await api.post(`/usuarios/${id_usuario}/acao`, { id_acao }, { headers: { id_usuario1: usuarioLogado }, })

        setUsuarios(usuarios.filter(user => user.id_usuario !== id_usuario));

        toast.warn("Dislike Enviado");
    };

    async function handleSubmit() {


        const response = await api.get('/usuariologado', {
            headers: { id_usuario: match.params.id_usuario }
        });
        const [{ id_usuario }] = response.data;
        history.push(`/teste`);
    }



    return (
        <div className="main-container">
            <Link to="/">
                <img className="imgLogin2" onClick={() => localStorage.removeItem('@matchjob:id_user')}
                    src={logo} alt="MatchJobs" />
            </Link>


            <div className="teste">
                {userlogged.map(row => (
                    <button type="buttons" onClick={() => handleSubmit()}>
                        <img className="teste" key={row.id_usuario} src={row.avatar} alt="" />
                    </button>
                ))}
            </div>

            {usuarios.length > 0 ? (
                <ul>
                    {usuarios.map(user => (
                        <li key={user.id_usuario}>
                            <img className="imgMain" src={user.avatar} alt="" />
                            <footer>
                                <strong>{user.nome}</strong>
                                <p>Função: {user.descricao_trabalho}</p>
                                <p>{user.descricao_conta}</p>
                                <p>Bio: {user.bio}</p>
                            </footer>
                            <div className="buttons">
                                <button type="buttons" onClick={() => handleLike(user.id_usuario, 1)}>
                                    <img className="like" src={like}></img>
                                </button>
                                <button type="buttons" onClick={() => handleDislike(user.id_usuario, 2)}>
                                    <img className="like" src={dislike}></img>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="empty" >Nada por aqui hoje  =( </div>
            )}
            <ToastContainer />
            <Modal show={show} >
                <Modal.Header>
                    <Modal.Title>Parabéns!!! você tem um novo Match</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, para vizualizar seu novo matchs basta ir no seu perfil!!! Boa sorte.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}