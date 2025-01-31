import React, { useState } from 'react';
import { TextFieldNormal } from "../components/textFields/TextFieldNormal";
import { register } from '../api/user/auth';
import { User } from '../type/user';
import { UseUser } from '../customHooks/useUser';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type RegisterResponse = User | { error: string };


export default function Registre() {
  const [nom, setName] = useState('');
  const [cognom, setCognom] = useState('');
  const [correu, setCorreu] = useState('');
  const [contrasenya, setPassword] = useState('');
  const [confirmContrasenya, setConfirmContrasenya] = useState('');
  const { setUser } = UseUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const  nom_complet = nom + " " + cognom;
    
    const response = await register({ name: nom_complet, email: correu, password: contrasenya, confirmPassword: confirmContrasenya }) as RegisterResponse;

    if ('error' in response) {
      return;
    }

    setUser(response);
    navigate('/');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#092756] to-[#670d10]">
      <div className="bg-transparent w-96 p-8 rounded-lg">
        <h1 className="text-white text-center text-2xl font-bold mb-6">Crea el teu compte</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex gap-4'> 
            <TextFieldNormal value={nom} placeholder="Nom" setValue={setName}></TextFieldNormal>
            <TextFieldNormal value={cognom} placeholder="Cognom" setValue={setCognom}></TextFieldNormal>

          </div>
          <TextFieldNormal value={correu} placeholder="Correu electrònic" setValue={setCorreu}></TextFieldNormal>
          <TextFieldNormal value={contrasenya} placeholder="Contrasenya" setValue={setPassword} Constrasenya={true}></TextFieldNormal>
          <TextFieldNormal value={confirmContrasenya} placeholder="Confirma la contrasenya" setValue={setConfirmContrasenya} Constrasenya={true}></TextFieldNormal>
          <button
            type="submit"
            className="w-full text-white text-center py-3 rounded-lg bg-gradient-to-b from-[#6eb6de] to-[#4a77d4] shadow-md hover:shadow-lg transition-shadow"
          >
            Registra't
          </button>
          <p className="text-white text-center mt-4">
            Ja tens un compte? <a href="/login" className="text-blue-400 hover:underline">Inicia sessió</a>
          </p>
        </form>
      </div>
    </div>
  );
}