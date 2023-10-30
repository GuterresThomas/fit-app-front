'use client'

import { useState, useEffect } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

export default function AddAlunoForm() {

    const randomAlunoId = Math.floor(Math.random() * 10000); // Gere um número aleatório entre 0 e 999 (ajuste o limite conforme necessário)


    const [newAluno, setNewAluno] = useState({
        aluno_id: randomAlunoId,
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        personal_id: 1, // Substitua 1 pelo ID do personal trainer desejado (será atualizado dinamicamente)
    });

    useEffect(() => {
        // Recupere o `personal_id` do cache localStorage
        const personalId = JSON.parse(localStorage.getItem('userID') ?? 'null');
        if (personalId) {
            // Atualize o `personal_id` no estado
            console.log('personal id', personalId);
            setNewAluno({ ...newAluno, personal_id: personalId });
        }
    }, []);

    const addAluno = async () => {

        const response = await fetch("https://fit-app-node.vercel.app/aluno_create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAluno),
        });

        if (response.status === 200) {
            setNewAluno({
                aluno_id: randomAlunoId, // Você pode manter a configuração manual para teste, mas o servidor atribuirá o valor correto
                nome: "",
                email: "",
                telefone: "",
                cpf: "",
                personal_id: newAluno.personal_id, // Use o `personal_id` atualizado do estado
            });
            alert("Aluno adicionado com sucesso");
        }
    };

    const handleSubmit = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        addAluno();
    };

    return (
        <div>
      <Card>
        <CardHeader>
          <CardTitle>Adicionar Aluno</CardTitle>
          <CardDescription>Adicione as informações sobre o aluno abaixo:</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="flex flex-col">
              <label className="m-2 " htmlFor="nome">
                Nome:
              </label>
              <input
                className="bg-zinc-100 m-2 rounded-xl p-1"
                placeholder="nome"
                type="text"
                id="nome"
                name="nome"
                value={newAluno.nome}
                onChange={(e) => setNewAluno({ ...newAluno, nome: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="m-2 " htmlFor="email">
                Email:
              </label>
              <input
                className="bg-zinc-100 m-2 rounded-xl p-1"
                placeholder="email"
                type="text"
                id="email"
                name="email"
                value={newAluno.email}
                onChange={(e) => setNewAluno({ ...newAluno, email: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="m-2 " htmlFor="telefone">
                Telefone:
              </label>
              <input
                className="bg-zinc-100 m-2 rounded-xl p-1"
                placeholder="telefone"
                type="text"
                id="telefone"
                name="telefone"
                value={newAluno.telefone}
                onChange={(e) => setNewAluno({ ...newAluno, telefone: e.target.value })}
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="m-2 " htmlFor="cpf">
                CPF:
              </label>
              <input
                className="bg-zinc-100 m-2 rounded-xl p-1"
                placeholder="cpf"
                type="text"
                id="cpf"
                name="cpf"
                value={newAluno.cpf}
                onChange={(e) => setNewAluno({ ...newAluno, cpf: e.target.value })}
                required
              />
            </div>
            <button className="bg-orange-400 p-2 rounded-xl font-medium text-white hover:bg-orange-600 m-2" type="submit">
              Adicionar Aluno
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
    );
}
