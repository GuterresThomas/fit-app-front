'use client'


import { useRouter } from "next/navigation";
import { Router } from "next/router";

import Register from "@/components/register"
import { useState, useEffect } from "react";

import { ScrollArea } from "@/components/ui/scroll-area"


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Home() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const router = useRouter();
    
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

            // Converta o objeto 'data' em uma string JSON antes de armazená-lo no localStorage
            localStorage.setItem('userID', JSON.stringify(data.user_id));

            localStorage.setItem('userNome', JSON.stringify(data.nome));

            console.log(data.user_id);
            
            console.log(data.nome);

            alert('Login efetuado!');
            router.push("/userpage");
            // Faça o que você quiser com os dados de login, como redirecionar o usuário.
          } else {
            const errorData = await response.json();
            console.error('Login failed:', errorData);
            alert( JSON.stringify(errorData));
            
            // Lida com erros de login aqui.
          }
        } catch (error) {
          console.error('Erro ao fazer login:', error);
          alert('Erro no login')
        }
      };
    

    
    return (
      <div className="md:justify-center h-screen md:flex">
        <div className="md:h-screen md:overflow-hidden md:w-screen md:mr-0">
          <img className=" w-min" src="/banner.jpeg"/>
        </div>
        <div className="md:flex md:justify-center h-screen md:w-[430px] md:h-screen bg-orange-400 ">
            
            <div className="flex flex-col justify-center p-2">
                <h1 className="text-3xl w-40 font-bold text-zinc-100 p-5 m-2 mt-20">FIT <span className="text-black">APP</span></h1>
                <input
                className="m-2 bg-slate-100 rounded-xl p-1 hover:bg-slate-200"    
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
                <input
                className="m-2 bg-slate-100 rounded-xl p-1 hover:bg-slate-200"
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                />
                <button className=" bg-slate-100 rounded-xl m-2 p-1 hover:bg-slate-200 font-bold uppercase "onClick={handleLogin}>Login</button>
                <p></p>
                <div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm">Não tem cadastro ainda? Cadastre-se agora!</AccordionTrigger>
                    <AccordionContent>
                      <ScrollArea className="md:h-[180px] md:w-[350px] rounded-md border p-4">  
                        <Register/>
                      </ScrollArea>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>      
              </div>
            </div>
        </div>
      </div>
    );
}