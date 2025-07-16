import React, { useState, useEffect } from 'react';
import './App.css';

const API = 'https://pegradar-backend.onrender.com';

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [logado, setLogado] = useState(false);
  const [oportunidades, setOportunidades] = useState([]);
  const [valorBase, setValorBase] = useState(1000);
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    setErro('');
    const res = await fetch(`${API}/api/login`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email, senha })
    });
    const j = await res.json();
    if (j.sucesso) {
      setLogado(true);
      fetchOportunidades();
    } else {
      setErro(j.mensagem);
    }
  };

  const fetchOportunidades = async () => {
    try {
      const res = await fetch(`${API}/api/oportunidades?valor=${valorBase}`);
      const j = await res.json();
      if (j.sucesso) setOportunidades(j.oportunidades);
      else setErro(j.mensagem);
    } catch {
      setErro('Erro ao carregar oportunidades');
    }
  };

  useEffect(() => {
    if (logado) fetchOportunidades();
  }, [valorBase, logado]);

  if (!logado) {
    return (
      <div className="login-screen">
        <div className="login-box">
          <h1>PegRadar</h1>
          <input type="email"   placeholder="Email" value={email}   onChange={e=>setEmail(e.target.value)}  />
          <input type="password"placeholder="Senha" value={senha}   onChange={e=>setSenha(e.target.value)}/>
          <button onClick={handleLogin}>Entrar</button>
          {erro && <p className="error">{erro}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header>
        <h1>Oportunidades de Arbitragem</h1>
        <div className="controls">
          <label>
            Valor Base (R$):
            <input
              type="number"
              value={valorBase}
              onChange={e=>setValorBase(Number(e.target.value))}
            />
          </label>
          <button onClick={fetchOportunidades}>Atualizar</button>
        </div>
      </header>
      <div className="cards-grid">
        {oportunidades.map((op, i) => (
          <a key={i} href={op.linkSwap} target="_blank" rel="noreferrer" className="card">
            <div className="card-header">
              <span className="badge">{op.chain.toUpperCase()}</span>
              <h2>{op.par}</h2>
            </div>
            <div className="card-body">
              <p><strong>Origem:</strong> {op.origem}</p>
              <p><strong>Destino:</strong> {op.destino}</p>
              <p><strong>APR:</strong> {op.apr}%</p>
              <p><strong>Spread:</strong> {op.spread}%</p>
              <p><strong>Gás:</strong> ${op.estimatedGasFeeUSD}</p>
              <p><strong>Lucro:</strong> R${op.lucroLiquido}</p>
              <p><strong>Tempo:</strong> {op.tempo}</p>
            </div>
            <div className="card-footer">
              <button>Ir para swap</button>
            </div>
          </a>
        ))}
        {oportunidades.length === 0 && <p className="no-data">Nenhuma oportunidade encontrada.</p>}
      </div>
    </div>
  );
}
