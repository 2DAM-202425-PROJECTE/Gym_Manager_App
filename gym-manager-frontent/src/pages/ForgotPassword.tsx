import React, { useState, useEffect } from "react";
import { TextFieldNormal } from "../components/textFields/TextFieldNormal";
import apiClient from "../api/prefijo"
import { useTranslation } from "react-i18next";

interface Tarifa {
  id: number;
  name: string;
  price: number;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [plans, setPlans] = useState<Tarifa[]>([]);

  const {t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get("/forgot-password");
      const tarifas = response.data as Tarifa[];
      setPlans(tarifas);
    };
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar solicitud de recuperación de contraseña
    console.log("Recuperar contrasenya para:", email);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blau_fosc to-granate">
      <div className="bg-transparent w-96 p-8 rounded-lg">
        <h1 className="text-white text-center text-2xl font-bold mb-6">{t('registre.title')}</h1>
        <form onSubmit={handleSubmit}>
          <TextFieldNormal value={email} placeholder="Correu electrònic" setValue={setEmail}></TextFieldNormal>
          <button
            type="submit"
            className="w-full text-white text-center py-3 rounded-lg bg-gradient-to-b from-blau_clar to-blau_electric shadow-md hover:shadow-lg transition-shadow mb-4"
          >
            Enviar
          </button>
          <div className="flex flex-col items-center">
            <a href="/login" className="text-blue-400 hover:underline mb-2">{t('registre.login')}</a>
            <a href="/registre" className="text-blue-400 hover:underline mb-2">{t('registre.registre')}</a>
            <a href="http://localhost:5173" className="text-blue-400 hover:underline">{t('registre.home')}</a>
          </div>
        </form>
      </div>
    </div>
  );
}