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
} from "@/components/ui/card";

interface Aluno {
  aluno_id: number,
  personal_id: number,
  nome: string,
  email: string,
  telefone: string,
  cpf: string,
}

function PersonalInfos() {
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [userNome, setUserNome] = useState(""); // Initialize with an empty string
  const router = useRouter();

  useEffect(() => {
    const storedUserID = localStorage.getItem('userID');
    const userID = storedUserID ? JSON.parse(storedUserID) : null;

    if (!userID) {
      router.push("/");
      alert('Não autorizado');
      return;
    }

    // Fetch data on the client side after ensuring userID is defined
    fetch(`https://fit-app-node.vercel.app/alunos/personal/${userID}`)
      .then((response) => response.json())
      .then((data) => {
        setAlunos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar alunos:', error);
        setLoading(false);
      });

    // Retrieve userNome from localStorage on the client side
    const storedUserNome = localStorage.getItem('userNome');
    if (storedUserNome) {
      setUserNome(JSON.parse(storedUserNome));
    }
  }, [router]);

  const numeroDeAlunos = alunos.length;

  return (
    <div className="p-4">
      <div>
        <Card className=" m-2">
          <CardHeader>
            <CardTitle>
              <div>
                <h1 className="font-bold text-2xl">Bem vindo, {userNome}</h1>
              </div>
            </CardTitle>
            <CardDescription>
              <h2 className="text-xl font-semibold">Suas Informações</h2>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="">Nome: {userNome}</p>
            <p className="">Número de Alunos: {numeroDeAlunos}</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <AlunosTreinos />
      </div>
    </div>
  );
}

export default PersonalInfos;