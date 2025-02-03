import React, { useState } from "react";
import { TextFieldNormal } from "../components/textFields/TextFieldNormal";
import { login } from "../api/user/auth";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../customHooks/useUser";
import { User } from "../type/user";
import { toast } from "react-toastify";
import axios from "axios";

type LoginResponse = User | { error: string };


export default function Login() {


  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = UseUser()



  const handleClick = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await login({ email: name, password: password }) as LoginResponse;

    if ("error" in response) return;

    setUser(response);

    if(response.role === 'admin') {
      navigate('/admin');
      return;
    }else {
      const user_id = response.id
      
      axios.get("")

      navigate('/')
    
    };

  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-deep_blau to-granate">
      <div className="bg-transparent w-96 p-8 rounded-lg">
        <h1 className="text-white text-center text-2xl font-bold mb-6">Login</h1>
        <form onSubmit={(e) => handleClick(e)}>
          <TextFieldNormal value={name} placeholder="Mail" setValue={setName}></TextFieldNormal>
          <TextFieldNormal value={password} placeholder="Constrasenya" setValue={setPassword} Constrasenya={true}></TextFieldNormal>
          <button
            type="submit"
            className="w-full text-white text-center py-3 rounded-lg bg-gradient-to-b from-blau_clar to-[#4a77d4] shadow-md hover:shadow-lg transition-shadow mb-4"
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