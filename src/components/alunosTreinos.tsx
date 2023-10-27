'use client'

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"



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

  const handleDeleteAluno = async (alunoId: number) => {
    const confirmDelete = window.confirm("Tem certeza de que deseja excluir este aluno?");

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:3030/aluno_delete/${alunoId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          // Atualize a lista de alunos após a exclusão
          const updatedAlunos = alunosTreinos.filter((aluno) => aluno.aluno_id !== alunoId);
          alert('Aluno Excluido com sucesso!')
          setAlunosTreinos(updatedAlunos);
        } else {
          console.error("Erro ao excluir aluno");
        }
      } catch (error) {
        console.error("Erro na solicitação de exclusão:", error);
      }
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Card className="m-2">
      <CardHeader>
        <CardTitle><h1>Informações sobre seus Alunos:</h1></CardTitle>
        <CardDescription>

        </CardDescription>
      </CardHeader>
        <CardContent>
          <div>
            <ul>
            {alunosTreinos.map((alunoTreino) => (
              <li className="border-zinc-300 p-1 m-1 border" key={alunoTreino.aluno_id}>
                <div>Nome do Aluno: {alunoTreino.nome_aluno}</div>
                <div>Email do Aluno: {alunoTreino.email_aluno}</div>
                <div>Telefone do Aluno: {alunoTreino.telefone_aluno}</div>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Treinos</AccordionTrigger>
                    <AccordionContent>
                      <div>Data do Treino: {alunoTreino.data_do_treino}</div>
                      <div>Descrição do Treino: {alunoTreino.descricao_do_treino}</div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <button className="bg-orange-400 p-2 rounded-xl font-medium text-white hover:bg-orange-600 m-2" onClick={() => handleDeleteAluno(alunoTreino.aluno_id)} >Excluir Aluno</button>
                    </li>
                  ))}
              </ul>
          </div>
      </CardContent>
    </Card>
  </div>
  );
}

export default AlunosTreinos;
