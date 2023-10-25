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

  const storedUserNome = localStorage.getItem('userNome');
  const userNome = storedUserNome ? JSON.parse(storedUserNome) : null;
  

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
    <div className="flex justify-center">
      <div className=" flex flex-col justify-center">
        <div className="">
          Bem vindo {userNome}
        </div>
        <div>
          <h1>Seus alunos:</h1>
        </div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul className="m-2">
            {alunos.map((aluno) => (
              <li key={aluno.aluno_id} className="m-2 p-2">
                <div className=""><p>Nome do aluno: {aluno.nome_aluno}</p></div>
                <div className=""><p>Email do aluno: {aluno.email_aluno}</p></div>
                <div className=""><p>Telefone do aluno: {aluno.telefone_aluno}</p></div>
                <div className=""><p>Personal responsável: {aluno.nome_personal}</p></div>
                </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
