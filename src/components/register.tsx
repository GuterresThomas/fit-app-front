import { useState, useEffect } from "react";

const Register = () => {
  const [user, setUser] = useState({
    nome: "",
    cpf: "",
    telefone: "",
    email: "",
    idade: "",
    senha: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleRegister = async () => {
    try {
      const response = await fetch("https://fit-app-node.vercel.app/user_create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registro bem-sucedido:", data);
        alert("Registro efetuado com sucesso!");
        setUser({
            nome: "",
            cpf: "",
            telefone: "",
            email: "",
            idade: "",
            senha: "",
          });
      } else {
        const errorData = await response.json();
        console.error("Erro no registro:", errorData);
        alert(JSON.stringify(errorData));
      }
    } catch (error) {
      console.error("Erro durante o registro:", error);
      alert("Erro no registro");
    }
  };

  useEffect(() => {
    
  }, [])

  return (
    <div className="flex flex-col justify-center bg-orange-400 p-2">
      <input
        className="m-2 bg-slate-100 rounded-xl p-1 hover:bg-slate-200"
        type="text"
        placeholder="Nome"
        name="nome"
        value={user.nome}
        onChange={handleInputChange}
      />
      <input
        className="m-2 bg-slate-100 rounded-xl p-1 hover:bg-slate-200"
        type="text"
        placeholder="CPF"
        name="cpf"
        value={user.cpf}
        onChange={handleInputChange}
      />
      <input
        className="m-2 bg-slate-100 rounded-xl p-1 hover:bg-slate-200"
        type="text"
        placeholder="Telefone"
        name="telefone"
        value={user.telefone}
        onChange={handleInputChange}
      />
      <input
        className="m-2 bg-slate-100 rounded-xl p-1 hover:bg-slate-200"
        type="email"
        placeholder="Email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
      />
      <input
        className="m-2 bg-slate-100 rounded-xl p-1 hover:bg-slate-200"
        type="text"
        placeholder="Idade"
        name="idade"
        value={user.idade}
        onChange={handleInputChange}
      />
      <input
        className="m-2 bg-slate-100 rounded-xl p-1 hover:bg-slate-200"
        type="password"
        placeholder="Senha"
        name="senha"
        value={user.senha}
        onChange={handleInputChange}
      />
      <button className=" bg-slate-100 rounded-xl m-2 p-1 hover:bg-slate-200 font-bold uppercase " onClick={handleRegister}>Cadastrar-me</button>
    </div>
  );
};

export default Register;
