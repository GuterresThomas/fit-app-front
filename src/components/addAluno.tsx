'use client'

import { useState, useEffect } from "react";

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

        const response = await fetch("http://localhost:3030/aluno_create", {
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
            <h2>Adicionar Aluno</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome:</label>
                    <input
                        type="text"
                        id="nome"
                        name="nome"
                        value={newAluno.nome}
                        onChange={(e) =>
                            setNewAluno({ ...newAluno, nome: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={newAluno.email}
                        onChange={(e) =>
                            setNewAluno({ ...newAluno, email: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        type="text"
                        id="telefone"
                        name="telefone"
                        value={newAluno.telefone}
                        onChange={(e) =>
                            setNewAluno({ ...newAluno, telefone: e.target.value })
                        }
                        required
                    />
                </div>
                <div>
                    <label htmlFor="cpf">CPF:</label>
                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={newAluno.cpf}
                        onChange={(e) =>
                            setNewAluno({ ...newAluno, cpf: e.target.value })
                        }
                        required
                    />
                </div>
                <button type="submit">Adicionar Aluno</button>
            </form>
        </div>
    );
}
