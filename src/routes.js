import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import Main from './pages/Main';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import Teste from './pages/Teste';

export default function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/usuarios/:id_usuario" component={Main}/>
            <Route path="/cadastro" component={Cadastro}/>
            <Route path="/perfil" component={Perfil}/>
            <Route path="/teste" component={Teste}/>
        </BrowserRouter>
    );
}