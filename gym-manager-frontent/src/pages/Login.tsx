import React, { useState } from "react";
import { TextFieldNormal } from "../components/textFields/TextFieldNormal";
import { login } from "../api/user/auth";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../customHooks/useUser";
import { User } from "../type/user";
import { toast } from "react-toastify";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = UseUser();

  const handleClick = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = await login({ email: name, password: password }) as User;

    if (user.error) return;
    console.log(user);

    setUser(user);

    if(user.role === 'admin') {
      navigate('/admin');
      return;
    }else navigate('/');

  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#092756] to-[#670d10]">
      <div className="bg-transparent w-96 p-8 rounded-lg">
        <h1 className="text-white text-center text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={(e) => handleClick(e)}>
          <TextFieldNormal value={name} placeholder="Mail" setValue={setName}></TextFieldNormal>
          <TextFieldNormal value={password} placeholder="Constrasenya" setValue={setPassword} Constrasenya={true}></TextFieldNormal>
          <button
            type="submit"
            className="w-full text-white text-center py-3 rounded-lg bg-gradient-to-b from-[#6eb6de] to-[#4a77d4] shadow-md hover:shadow-lg transition-shadow mb-4"
          >
            Login
          </button>
          <div className="flex flex-col items-center">
            <a href="/registre" className="text-blue-400 hover:underline mb-2">Registra't</a>
            <a href="/forgot-password" className="text-blue-400 hover:underline mb-2">Oblidaste la teva contrasenya</a>
            <a href="http://localhost:5173" className="text-blue-400 hover:underline">Tornar a la Home</a>
          </div>
        </form>
      </div>
    </div>
  );
}