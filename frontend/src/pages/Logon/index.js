import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon () {
  const history = useHistory();

  const [id, setId] = useState('');

  async function handleLogin (e) {
    e.preventDefault();

    const data = {
      id
    };

    try {
      const response = await api.post('sessions', data);
 
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);

      history.push('/cases');
    } catch (error) {
      alert('Falha no login tente novamente.')
    }

  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>

        <form onSubmit={handleLogin}>
          <h1>Faça o seu logon</h1>

          <input 
            placeholder="Seu ID" 
            value={id}
            onChange={ e => setId(e.target.value) }
          />

          <button type="submit" className="button">Entrar</button>
        </form>
        <Link className="back-link" to="/register">
          <FiLogIn size={16} color="#E02041" />
          Não tenho cadastro
        </Link>
      </section>

      <img src={heroesImg} alt="Heroes"/>
    </div>
  );
}