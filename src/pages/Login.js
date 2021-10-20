import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import './Login.css'
import api from '../services/api'
import logo from '../assets/MatchJobsRoxo.png';
import "react-toastify/dist/ReactToastify.css";

export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        const dataKey = '@matchjob:id_user'

        try {

            const response = await api.post('/login', {
                username,
            });

            const [{ id_usuario }] = response.data;
            localStorage.setItem(dataKey, JSON.stringify(id_usuario))
            history.push(`/usuarios/${id_usuario}`);

            toast.success("Sucesso!");

        } catch (e) {

            console.log(e);
            toast.error("Usuario não encontrado")
        }

    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img className="imgLogin" src={logo} alt="Tindev" />
                <input
                    placeholder="Digite seu usuario"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
                <Link to="/cadastro">
                    <button type="submit">Cadastrar</button>
                </Link>
            </form>
            <ToastContainer />
        </div>


    );
}