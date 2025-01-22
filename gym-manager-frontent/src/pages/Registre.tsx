import React, { useState } from 'react';
import '../index.css'; // Adjust the path based on the actual location of index.css

export default function Registre() {
  const [nom, setNom] = useState('');
  const [correu, setCorreu] = useState('');
  const [contrasenya, setContrasenya] = useState('');
  const [confirmContrasenya, setConfirmContrasenya] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contrasenya !== confirmContrasenya) {
      alert('Les contrasenyes no coincideixen');
      return;
    }
    // Lògica de registre
    console.log({ nom, correu, contrasenya });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0B132B] to-[#1C2541]">
      <div className="w-full max-w-md bg-[#476385] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-[#70FFEA] text-center mb-6">Crea el teu compte</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nom" className="block text-[#70FFEA] font-semibold mb-2">
              Nom d'usuari
            </label>
            <input
              type="text"
              id="nom"
              placeholder="Introdueix el teu nom d'usuari"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1C2541] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5DC0BF]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="correu" className="block text-[#70FFEA] font-semibold mb-2">
              Correu electrònic
            </label>
            <input
              type="email"
              id="correu"
              placeholder="Introdueix el teu correu electrònic"
              value={correu}
              onChange={(e) => setCorreu(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1C2541] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5DC0BF]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contrasenya" className="block text-[#70FFEA] font-semibold mb-2">
              Contrasenya
            </label>
            <input
              type="password"
              id="contrasenya"
              placeholder="Crea una contrasenya"
              value={contrasenya}
              onChange={(e) => setContrasenya(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1C2541] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5DC0BF]"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmContrasenya" className="block text-[#70FFEA] font-semibold mb-2">
              Confirmar Contrasenya
            </label>
            <input
              type="password"
              id="confirmContrasenya"
              placeholder="Confirma la teva contrasenya"
              value={confirmContrasenya}
              onChange={(e) => setConfirmContrasenya(e.target.value)}
              className="w-full p-3 rounded-lg bg-[#1C2541] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5DC0BF]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#5DC0BF] text-[#0B132B] font-bold p-3 rounded-lg hover:bg-[#70FFEA] transition duration-300"
          >
            Registra't
          </button>
        </form>
        <p className="text-center text-[#70FFEA] mt-6">
          Ja tens un compte?{' '}
          <a href="/login" className="font-semibold text-[#5DC0BF] hover:underline">
            Inicia sessió
          </a>
        </p>
      </div>
    </div>
  );
}