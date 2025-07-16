import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState('');
  const [oportunidades, setOportunidades] = useState([]);

  const API = process.env.REACT_APP_API || 'https://pegradar-backend.onrender.com';

  const login = async () => {
    const res = await fetch(`${API}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await res.json();
    if (data.sucesso) {
      setToken(data.token);
      alert(`Bem-vindo ${email}`);
    } else {
      alert('Login inválido');
    }
  };

  const buscarOportunidades = async () => {
    const res = await fetch(`${API}/api/oportunidades`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (data.sucesso) {
      setOportunidades(data.oportunidades);
    }
  };

  useEffect(() => {
    if (token) buscarOportunidades();
  }, [token]);

  return (
    <div className="App">
      {!token ? (
        <>
          <h2>PegRadar – Login</h2>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
          <button onClick={login}>Entrar</button>
        </>
      ) : (
        <>
          <h1>Oportunidades de Arbitragem – Redeem Assets</h1>
          {oportunidades.length === 0 && <p>Buscando oportunidades...</p>}
          <div className="cards">
            {oportunidades.map((op, i) => (
              <div key={i} className="card">
                <h2>{op.par}</h2>
                <p><strong>Origem:</strong> {op.origem}</p>
                <p><strong>Destino:</strong> {op.destino}</p>
                <p><strong>APR:</strong> {op.apr}%</p>
                <p><strong>Spread Bruto:</strong> {op.spread}%</p>
                <p><strong>Taxa estimada (Gas):</strong> ${op.estimatedGasFeeUSD}</p>
                <p><strong>Lucro líquido estimado (sobre R$1000):</strong> ${op.lucroLiquido}</p>
                <p><strong>Tempo estimado:</strong> {op.tempo}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
