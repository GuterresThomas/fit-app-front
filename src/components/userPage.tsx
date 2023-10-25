'use client'

import { useEffect, useState } from 'react';


interface Aluno {
  aluno_id: number;
  nome_aluno: string;
  email_aluno: string;
  telefone_aluno: string;
  cpf_aluno: string;
  nome_personal: string;
}

export default function UserPage() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);

  // Recupere o userID do localStorage
  const storedUserID = localStorage.getItem('userID');
  const userID = storedUserID ? JSON.parse(storedUserID) : null;
  

  useEffect(() => {
    if (userID) {
      // Faça uma solicitação para buscar os alunos associados a esse personal usando o 'userID'
      fetch(`http://localhost:3030/alunos/personal/${userID}`)
        .then((response) => response.json())
        .then((data) => {
          setAlunos(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Erro ao buscar alunos:', error);
          setLoading(false);
        });
    }
  }, [userID]);

  return (
    <div>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul>
          {alunos.map((aluno) => (
            <li key={aluno.aluno_id}>
              {aluno.nome_aluno}
              {aluno.email_aluno}
              {aluno.telefone_aluno}
              {aluno.nome_personal}
              </li>
          ))}
        </ul>
      )}
    </div>
  );
}
