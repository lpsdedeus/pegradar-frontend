import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [email,setEmail] = useState('');
  const [senha,setSenha] = useState('');
  const [token,setToken] = useState('');
  const [opps,setOpps] = useState([]);
  const [msg,setMsg] = useState('');

  const API = 'https://pegradar-backend.onrender.com';

  const login = async e => {
    e.preventDefault();
    const r = await fetch(`${API}/api/login`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({email,senha})
    });
    const j = await r.json();
    if(j.sucesso){ setToken(j.token); setMsg(`Bem-vindo ${email}`); }
    else setMsg(j.mensagem);
  };

  useEffect(()=>{
    if(!token) return;
    fetch(`${API}/api/oportunidades`,{ headers:{ Authorization:`Bearer ${token}` }})
      .then(r=>r.json())
      .then(j=> j.sucesso ? setOpps(j.oportunidades) : setMsg(j.mensagem))
      .catch(()=>setMsg('Erro ao carregar'));
  },[token]);

  if(!token){
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <form onSubmit={login} className="bg-white p-6 rounded shadow-md w-80">
          <h2 className="text-xl mb-4">PegRadar Login</h2>
          <input className="w-full mb-2 p-2 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
          <input type="password" className="w-full mb-2 p-2 border" placeholder="Senha" value={senha} onChange={e=>setSenha(e.target.value)}/>
          <button className="w-full bg-blue-600 text-white p-2 rounded">Entrar</button>
          {msg && <p className="mt-2 text-red-500">{msg}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-2xl mb-4">Oportunidades de Arbitragem</h2>
      <table className="w-full bg-white rounded shadow">
        <thead><tr className="bg-blue-200"><th className="p-2">Par</th><th>Spread</th><th>APR</th><th>Tempo</th></tr></thead>
        <tbody>
          {opps.map((o,i)=>(
            <tr key={i} className="border-t">
              <td className="p-2">{o.par}</td>
              <td className="p-2">{o.spread}%</td>
              <td className="p-2">{o.apr}%</td>
              <td className="p-2">{o.tempo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
