import React, { useState } from "react";
import { TextFieldNormal } from "../components/textFields/TextFieldNormal";
import { login } from "../api/user/auth";
import { useNavigate } from "react-router-dom";
import { User } from "../type/user";
import { useTranslation } from "react-i18next";
import { DefaultButton } from "../components/buttons/ButtonDefault";
import { SelectLanguage } from "../components/buttons/SelectLanguage";
import { toast } from "react-toastify";

type LoginResponse = {
  user: User;
  permisos: string[]; // Ajusta el tipo de permisos según tu estructura real
  error?: string; // Opcional, si hay un error
};

export default function Login() {



  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { t } = useTranslation();


  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const {user, permisos} = await login({ email: name, password: password }) as LoginResponse;

    if ("error" in user) {
      toast.error("error");
      return
    }

    if (permisos.includes("trainer")) {
      navigate("/dashboardentrenador");
      return;
    }

    if(user.role === 'admin') {
      navigate('/admin');
      return;
      
    }else {

        if (user.membresia?.fecha_fin) {
          const fechaFin = new Date(user.membresia.fecha_fin);
          const fechaActual = new Date(); 

          console.log(localStorage.getItem("token"));

          if (fechaFin > fechaActual) {
            setTimeout(() => navigate('/'), 100);
          } else {
            setTimeout(() => navigate('/tarifas'), 100);
          }
        } else {
          setTimeout(() => navigate('/tarifas'), 100);
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