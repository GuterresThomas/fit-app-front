'use client'

import { useEffect, useState } from 'react';
import {useRouter} from 'next/navigation';
import NavBar from '@/components/navbar';
import PersonalInfos from '@/components/personalinfos'

import { ScrollArea } from "@/components/ui/scroll-area"



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
  
  const router = useRouter();

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
    } else {
      router.push("/");
      alert('não autorizado')
    }
  }, [userID, router]);

  return (
    <div className="flex">
      <div className=" flex flex-col justify-center">
        <div className="text-2xl uppercase ml-0 font-semibold">
          Bem vindo {userNome}!
        </div>
        <div>
          <PersonalInfos/>
        </div>
        <div>
          <h1 className="">Seus alunos:</h1>
        </div>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <ul className="m-2 p-2">
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
