import React, { useState, useEffect } from 'react';
import './App.css';

const API = process.env.REACT_APP_API || 'https://pegradar-backend.onrender.com';

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);
  const [oportunidades, setOportunidades] = useState([]);
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      if (data.sucesso) {
        setLogado(true);
        setErro('');
        buscarOportunidades();
      } else {
        setErro(data.mensagem);
      }
    } catch (error) {
      setErro('Erro ao conectar com o servidor');
    }
  };

  const buscarOportunidades = async () => {
    try {
      const response = await fetch(`${API}/api/oportunidades`);
      const data = await response.json();
      if (data.sucesso) {
        setOportunidades(data.oportunidades);
      }
    } catch (error) {
      console.error('Erro ao buscar oportunidades:', error);
    }
  };

  return (
    <div className="App">
      {!logado ? (
        <div className="login-container">
          <h2>PegRadar - Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button onClick={handleLogin}>Entrar</button>
          {erro && <p className="erro">{erro}</p>}
        </div>
      ) : (
        <div className="oportunidades-container">
          <h2>Oportunidades de Arbitragem</h2>
          {oportunidades.length === 0 ? (
            <p>Nenhuma oportunidade encontrada.</p>
          ) : (
            oportunidades.map((op, index) => (
              <div key={index} className="card">
                <h3>{op.par}</h3>
                <p><strong>Origem:</strong> {op.origem}</p>
                <p><strong>Destino:</strong> {op.destino}</p>
                <p><strong>APR:</strong> {op.apr.toFixed(2)}%</p>
                <p><strong>Spread Bruto:</strong> {op.spread.toFixed(2)}%</p>
                <p><strong>Taxa estimada (Gas):</strong> ${op.estimatedGasFeeUSD}</p>
                <p><strong>Lucro líquido estimado (sobre R$1000):</strong> ${op.lucroLiquido}</p>
                <p><strong>Tempo estimado:</strong> {op.tempo}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
