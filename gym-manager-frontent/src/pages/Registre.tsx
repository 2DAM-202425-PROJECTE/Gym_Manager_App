import React, { useState } from 'react';
import { TextFieldNormal } from "../components/textFields/TextFieldNormal";
import { register } from '../api/user/auth';
import { User } from '../type/user';
import { UseUser } from '../customHooks/useUser';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DefaultButton } from '../components/buttons/ButtonDefault';
import { SelectLanguage } from '../components/buttons/SelectLanguage';
import { toast } from 'react-toastify';

type RegisterData = {
  user: User;
  message: string;
  token: string;
}

type RegisterResponse = RegisterData | { error: string };


export default function Registre() {
  const [nom, setName] = useState('');
  const [cognom, setCognom] = useState('');
  const [correu, setCorreu] = useState('');
  const [contrasenya, setPassword] = useState('');
  const [confirmContrasenya, setConfirmContrasenya] = useState('');
  const { setUser } = UseUser();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (contrasenya !== confirmContrasenya) {
      toast.error(t('registre.passwords_not_match'));
      return;
    }
      
    const  nom_complet = nom + " " + cognom;
    
    const response = await register({ name: nom_complet, email: correu, password: contrasenya, confirmPassword: confirmContrasenya }) as unknown as RegisterResponse;

    if ('error' in response) {
      toast.error('Error al registrar el usuario');
      return;
    }

    localStorage.setItem('token', response.token);

    console.log('👤 User registered:', response);

    setUser(response.user);
    navigate('/tarifas');
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blau_fosc to-granate">
      <div className="bg-transparent w-96 p-8 rounded-lg">
        <h1 className="text-white text-center text-2xl font-bold mb-6">{t('registre.title')}</h1>
        <form>
          <div className='flex gap-4'> 
            <TextFieldNormal value={nom} placeholder={t('registre.name')} setValue={setName}></TextFieldNormal>
            <TextFieldNormal value={cognom} placeholder={t('registre.surname')} setValue={setCognom}></TextFieldNormal>
          </div>
          <TextFieldNormal value={correu} placeholder={t('registre.email')} setValue={setCorreu}></TextFieldNormal>
          <TextFieldNormal value={contrasenya} placeholder={t('registre.password')} setValue={setPassword} Constrasenya={true}></TextFieldNormal>
          <TextFieldNormal value={confirmContrasenya} placeholder={t('registre.confirm_password')} setValue={setConfirmContrasenya} Constrasenya={true}></TextFieldNormal>
          <DefaultButton text= {t('registre.submit')} action={handleSubmit}></DefaultButton>
          <p className="text-white text-center mt-4">
            {t('registre.already_have_account')} <a href="/login" className="text-blue-400 hover:underline">{t('registre.login')}</a>
          </p>
        </form>
      </div>
      <SelectLanguage></SelectLanguage>

    </div>
  );
}