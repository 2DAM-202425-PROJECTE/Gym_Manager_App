import React, { useState } from "react";
import { TextFieldNormal } from "../components/textFields/TextFieldNormal";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar solicitud de recuperación de contraseña
    console.log("Recuperar contrasenya para:", email);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#092756] to-[#670d10]">
      <div className="bg-transparent w-96 p-8 rounded-lg">
        <h1 className="text-white text-center text-2xl font-bold mb-6">Recuperar Contrasenya</h1>
        <form onSubmit={handleSubmit}>
          <TextFieldNormal value={email} placeholder="Correu electrònic" setValue={setEmail}></TextFieldNormal>
          <button
            type="submit"
            className="w-full text-white text-center py-3 rounded-lg bg-gradient-to-b from-[#6eb6de] to-[#4a77d4] shadow-md hover:shadow-lg transition-shadow mb-4"
          >
            Enviar
          </button>
          <div className="flex flex-col items-center">
            <a href="/login" className="text-blue-400 hover:underline mb-2">Inicia sessió</a>
            <a href="/registre" className="text-blue-400 hover:underline mb-2">Registra't</a>
            <a href="http://localhost:5173" className="text-blue-400 hover:underline">Tornar a la Home</a>
          </div>
        </form>
      </div>
    </div>
  );
}