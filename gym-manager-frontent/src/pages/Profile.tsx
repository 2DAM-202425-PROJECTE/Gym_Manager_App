import React, { useState } from "react";
import { TextFieldNormal } from "../components/textFields/TextFieldNormal";

export default function Profile() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les contrasenyes no coincideixen");
      return;
    }
    // Lógica para cambiar la contraseña
    console.log("Contrasenya canviada:", password);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#092756] to-[#670d10]">
      <div className="bg-transparent w-96 p-8 rounded-lg">
        <h1 className="text-white text-center text-2xl font-bold mb-6">Perfil del Client</h1>
        <div className="bg-white bg-opacity-20 p-6 rounded-lg mb-6">
          <h2 className="text-white text-xl font-bold mb-4">Informació del Client</h2>
          <p className="text-white mb-2"><strong>Nom:</strong> Joan Pérez</p>
          <p className="text-white mb-2"><strong>DNI:</strong> 12345678X</p>
          <p className="text-white mb-2"><strong>Correu electrònic:</strong> joan.perez@example.com</p>
          <p className="text-white mb-2"><strong>Dies restants de subscripció:</strong> 30</p>
        </div>
        <div className="bg-white bg-opacity-20 p-6 rounded-lg mb-6">
          <h2 className="text-white text-xl font-bold mb-4">Canviar Contrasenya</h2>
          <form onSubmit={handlePasswordChange}>
            <TextFieldNormal value={password} placeholder="Nova Contrasenya" setValue={setPassword} Constrasenya={true}></TextFieldNormal>
            <TextFieldNormal value={confirmPassword} placeholder="Confirma la Nova Contrasenya" setValue={setConfirmPassword} Constrasenya={true}></TextFieldNormal>
            <button
              type="submit"
              className="w-full text-white text-center py-3 rounded-lg bg-gradient-to-b from-[#6eb6de] to-[#4a77d4] shadow-md hover:shadow-lg transition-shadow mb-4"
            >
              Canviar Contrasenya
            </button>
          </form>
        </div>
        <button
          onClick={() => window.location.href = "http://localhost:5173"}
          className="w-full text-white text-center py-3 rounded-lg bg-gradient-to-b from-[#6eb6de] to-[#4a77d4] shadow-md hover:shadow-lg transition-shadow"
        >
          Salir
        </button>
      </div>
    </div>
  );
}