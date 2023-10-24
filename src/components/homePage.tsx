'use client'

import { useState, useEffect } from "react";

export default function Home() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    
    const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:3030/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
          });
    
          if (response.ok) {
            const data = await response.json();
            console.log('Login successful:', data);
            // Faça o que você quiser com os dados de login, como redirecionar o usuário.
          } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData);
            // Lida com erros de login aqui.
          }
        } catch (error) {
          console.error('Erro ao fazer login:', error);
        }
      };
    

    
    return (
      <div>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          require
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          require
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
}