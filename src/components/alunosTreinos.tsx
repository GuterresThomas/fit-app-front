'use client'

import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


interface AlunoTreino {
  aluno_id: number;
  nome_aluno: string;
  email_aluno: string;
  telefone_aluno: string;
  treinos: Treino[]; // Treinos agora é uma lista aqui
  // Adicione outras propriedades conforme necessário
}

interface Treino {
  data_do_treino: string;
  descricao_do_treino: string;
  // Adicione outras propriedades conforme necessário
}

function AlunosTreinos() {
  const personalId = localStorage.getItem("userID"); // Obter o personalId do localStorage

  const [alunosTreinos, setAlunosTreinos] = useState<AlunoTreino[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTreino, setNewTreino] = useState({ data_do_treino: "", descricao_do_treino: "" });
  const [addingTreino, setAddingTreino] = useState(false);

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
          alert("Aluno Excluído com sucesso!");
          setAlunosTreinos(updatedAlunos);
        } else {
          console.error("Erro ao excluir aluno");
        }
      } catch (error) {
        console.error("Erro na solicitação de exclusão:", error);
      }
    }
  };

const formattedDate = newTreino.data_do_treino;
const dateParts = formattedDate.split('-');
const year = dateParts[0];
const month = dateParts[1];
const day = dateParts[2];
const formattedDateStr = `${year}-${month}-${day}`;


  const handleSaveTreino = async (alunoId: number) => {
    try {
      const response = await fetch(`http://localhost:3030/treino_create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTreino, formattedDateStr, aluno_id: alunoId }),
      });

      if (response.ok) {
        const updatedAlunos = alunosTreinos.map((aluno) => {
          if (aluno.aluno_id === alunoId) {
            aluno.treinos.push(newTreino);
          }
          return aluno;
        });

        alert("Treino adicionado com sucesso!");
        setAlunosTreinos(updatedAlunos);
        setAddingTreino(false);
        setNewTreino({ data_do_treino: "", descricao_do_treino: "" });
      } else {
        console.error("Erro ao adicionar treino");
      }
    } catch (error) {
      console.error("Erro na solicitação de adição de treino:", error);
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <Card className="m-2">
        <CardHeader>
          <CardTitle>
            <h1>Informações sobre seus Alunos:</h1>
          </CardTitle>
          <CardDescription></CardDescription>
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
                    <AccordionItem value={`item-${alunoTreino.aluno_id}`}>
                      <AccordionTrigger>Treinos</AccordionTrigger>
                      <AccordionContent>
                        <ul>
                          {alunoTreino.treinos.map((treino, index) => (
                            <li key={index}>
                              <div>Data do Treino: {treino.data_do_treino}</div>
                              <div>Descrição do Treino: {treino.descricao_do_treino}</div>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <button
                    className="bg-orange-400 p-2 rounded-xl font-medium text-white hover:bg-orange-600 m-2"
                    onClick={() => handleDeleteAluno(alunoTreino.aluno_id)}
                  >
                    Excluir Aluno
                  </button>
                  <Popover>
                    <PopoverTrigger className="bg-orange-400 p-2 rounded-xl font-medium text-white hover:bg-orange-600 m-2">Adicionar Treino</PopoverTrigger>
                    <PopoverContent className="bg-white m-2 p-2">
                    {addingTreino ? (
                        <div>
                          <input
                            className="bg-zinc-100 m-2 rounded-xl p-1"
                            type="date"
                            placeholder="Data do Treino"
                            value={newTreino.data_do_treino}
                            onChange={(e) =>
                              setNewTreino({ ...newTreino, data_do_treino: e.target.value })
                            }
                          />
                          <textarea
                            className="bg-zinc-100 m-2 rounded-xl p-1"
                            type="text"
                            placeholder="Descrição do Treino"
                            value={newTreino.descricao_do_treino}
                            onChange={(e) =>
                              setNewTreino({ ...newTreino, descricao_do_treino: e.target.value })
                            }
                          />
                          <button className="bg-orange-400 p-2 rounded-xl font-medium text-white hover:bg-orange-600 m-2" onClick={() => handleSaveTreino(alunoTreino.aluno_id)}>
                            Salvar
                          </button>
                          <button className="bg-orange-400 p-2 rounded-xl font-medium text-white hover:bg-orange-600 m-2" onClick={() => setAddingTreino(false)}>Cancelar</button>
                        </div>
                      ) : (
                        <button className="bg-orange-400 p-2 rounded-xl font-medium text-white hover:bg-orange-600 m-2" onClick={() => setAddingTreino(true)}>Adicionar Treino</button>
                      )}
                    </PopoverContent>
                  </Popover>
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
