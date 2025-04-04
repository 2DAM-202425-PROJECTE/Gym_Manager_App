import React, { useState } from "react";
import { TextFieldNormal } from "../components/textFields/TextFieldNormal";
import { login } from "../api/user/auth";
import { useNavigate } from "react-router-dom";
import { UseUser } from "../customHooks/useUser";
import { User } from "../type/user";
import { useTranslation } from "react-i18next";
import { DefaultButton } from "../components/buttons/ButtonDefault";
import { SelectLanguage } from "../components/buttons/SelectLanguage";
import { toast } from "react-toastify";

type LoginResponse = User | { error: string };


export default function Login() {



  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUser } = UseUser()

  const { t } = useTranslation();


  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const response = await login({ email: name, password: password }) as LoginResponse;

    if ("error" in response) {
      toast.error("error");
      return
    }

    setUser(response);

    localStorage.setItem('token', response.token);


    if(response.role === 'admin') {
      navigate('/admin');
      return;
    }else {
       


        if (response.membresia?.fecha_fin) {
          const fechaFin = new Date(response.membresia.fecha_fin);
          const fechaActual = new Date(); 
          if (fechaFin > fechaActual) navigate('/');
          else navigate('/tarifas');
        } else {
          navigate('/tarifas');
        }
    
    };

  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blau_fosc to-granate">
      <div className="bg-transparent w-96 p-8 rounded-lg">
        <h1 className="text-white text-center text-2xl font-bold mb-6">{t('login.title')}</h1>
        <form >
          <TextFieldNormal value={name} placeholder={t('login.email')} setValue={setName}></TextFieldNormal>
          <TextFieldNormal value={password} placeholder={t('login.password')} setValue={setPassword} Constrasenya={true}></TextFieldNormal>
          <DefaultButton text={t('login.submit')} action={handleClick}></DefaultButton>
          <div className="flex flex-col items-center">
            <a href="/registre" className="text-blue-400 hover:underline mb-2">{t('login.register')}</a>
            <a href="/forgot-password" className="text-blue-400 hover:underline mb-2">{t('login.forgot')}</a>
          </div>
        </form>
      </div>

     <SelectLanguage>
      
     </SelectLanguage>
    </div>
    )
}