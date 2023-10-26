'use client'

import React, { useState, useEffect } from "react";

interface AlunoTreino {
  aluno_id: number;
  nome_aluno: string;
  email_aluno: string;
  telefone_aluno: string;
  data_do_treino: string;
  descricao_do_treino: string;
  // Adicione outras propriedades conforme necessário
}

function AlunosTreinos() {
  const personalId = localStorage.getItem('userID'); // Obter o personalId do localStorage

  const [alunosTreinos, setAlunosTreinos] = useState<AlunoTreino[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3030/alunos/personal/${personalId}`);
        if (response.ok) {
          const data = await response.json();
          setAlunosTreinos(data);
        } else {
          console.error("Erro ao buscar dados");
        }
      } catch (error) {
        console.error("Erro na solicitação:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [personalId]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>Alunos e Treinos:</h1>
      <ul>
        {alunosTreinos.map((alunoTreino) => (
          <li key={alunoTreino.aluno_id}>
            <div>Nome do Aluno: {alunoTreino.nome_aluno}</div>
            <div>Email do Aluno: {alunoTreino.email_aluno}</div>
            <div>Telefone do Aluno: {alunoTreino.telefone_aluno}</div>
            <div>Data do Treino: {alunoTreino.data_do_treino}</div>
            <div>Descrição do Treino: {alunoTreino.descricao_do_treino}</div>
            {/* Adicione mais informações conforme necessário */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlunosTreinos;
