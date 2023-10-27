'use client'
import React, { useState, useEffect } from 'react';
import {useRouter} from 'next/navigation';
import AddAlunoForm from './addAluno';
import AlunosTreinos from './alunosTreinos';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface Aluno {

    aluno_id: number,
    personal_id: number, // Referência ao personal
    nome: string,
    email: string,
    telefone: string,
    cpf: string,

}

function PersonalInfos() {
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

    const numeroDeAlunos = alunos.length;

  return (
    <div className="p-4">
      <div>
        <Card className=" m-2">
          <CardHeader>
            <CardTitle>
              <div>
                <h1 className="font-bold text-2xl">Bem vindo {userNome}</h1>
              </div>
          </CardTitle>
            <CardDescription>
              <h2 className="text-xl font-semibold ">Suas Informações</h2>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="">Nome: {userNome}</p>
            <p className="">Número de Alunos: {numeroDeAlunos}</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <AlunosTreinos/>
      </div>
    </div>
  );
}


export default PersonalInfos;