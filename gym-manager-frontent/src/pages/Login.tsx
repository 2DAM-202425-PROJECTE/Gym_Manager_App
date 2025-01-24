import React, { useState } from "react";
import { TextFieldNormal } from "../components/textFields/TextFieldNormal";

export default function Login(){

  const [ name, setName ] = useState("");
  const [ password, setPassword ] = useState("");
  
  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#092756] to-[#670d10]">
      <div className="bg-transparent w-96 p-8 rounded-lg ">
        <h1 className="text-white text-center text-2xl font-bold mb-6">Login</h1>
        <form>
          <TextFieldNormal value={name} placeholder="Nom" setValue={setName}></TextFieldNormal>
          <TextFieldNormal value={password} placeholder="Constrasenya" setValue={setPassword} Constrasenya = {true}></TextFieldNormal>
          <button
            type="submit"
            className="w-full text-white text-center py-3 rounded-lg bg-gradient-to-b from-[#6eb6de] to-[#4a77d4] shadow-md hover:shadow-lg transition-shadow"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

