'use client'

import { useState, useEffect } from "react";

export default function UserPage() {
    const [alunos, setAlunos] = useState([])
    const alunosDoPersonal = async () => {
        try {
          const response = await fetch('http://localhost:3030/alunos');
          if (response.ok) {
            const data = await response.json();
            setAlunos(data); // Define os dados dos alunos no estado.
          } else {
            // Lidar com erros de resposta, se necessário.
            console.error('Erro ao buscar alunos:', response.status, response.statusText);
          }
        } catch (error) {
          // Lidar com erros de rede ou exceções, se necessário.
          console.error('Erro durante a busca de alunos:', error);
        }
      }
    
      useEffect(() => {
        // Quando o componente é montado, chame a função para buscar os alunos.
        alunosDoPersonal();
      }, []); // O array vazio [] garante que isso seja executado apenas uma vez, semelhante a componentDidMount.

      return (
        <div>
      <h1>Lista de Alunos</h1>
      <ul>
        {alunos.map((aluno) => (
          <li key={aluno.aluno_id}>
            {aluno.nome}
            
            </li>
        ))}
      </ul>
    </div>
     )
}