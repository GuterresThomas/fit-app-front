"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import {useRouter} from 'next/navigation';

export default function Navbar() {
  const [state, setState] = React.useState(false)

  const menus = [
    { title: "Página inicial", path: "/userpage" },
    { title: "Adicionar Aluno", path: "/addaluno" },
    { title: "Sair", path: "/" },
  ] 

  const router = useRouter();

  const handleLogout = () => {
    // Remova o 'userID' do localStorage para deslogar o usuário
    localStorage.removeItem('userID')
    alert('Até mais!')
    router.push("/") // Redirecione o usuário para a página de login ou outra página apropriada após o logout
  }
  return (
    <nav className="bg-orange-400 mb-2 w-full border-b md:border-0 shadow-slate-400 shadow-sm">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/userpage">
            <h1 className="text-3xl font-bold text-zinc-100">Fit App</h1>
          </Link>
          <div className="md:hidden">
            <button
              className="text-zinc-100 outline-none p-2 rounded-md focus:border-zinc-400 focus:border"
              onClick={() => setState(!state)}
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {menus.map((item, idx) => (
              <li key={idx} className="text-zinc-100 hover:text-zinc-100">
                {item.title === "Sair" ? (
                    <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                      {item.title}
                    </a>
                  ) : (
                    <Link href={item.path}>{item.title}</Link>
                  )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}