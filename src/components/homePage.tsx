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
            alert('Login efetuado!')
            // Faça o que você quiser com os dados de login, como redirecionar o usuário.
          } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData);
            
            // Lida com erros de login aqui.
          }
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          alert('Erro no login')
        }
      };
    

    
    return (
      <div className="justify-center flex">
        <div className="flex justify-center mt-20 h-80 bg-orange-400 rounded-2xl ">
            <div className="flex flex-col align-middle justify-center p-2">
                <input
                className="m-2 bg-slate-100 rounded-md p-1 hover:bg-slate-200"    
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                require
                />
                <input
                className="m-2 bg-slate-100 rounded-md p-1 hover:bg-slate-200"
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                require
                />
                <button className=" bg-slate-100 rounded-md m-2 p-1 hover:bg-slate-200 font-bold uppercase "onClick={handleLogin}>Login</button>
            </div>
        </div>
      </div>
    );
}