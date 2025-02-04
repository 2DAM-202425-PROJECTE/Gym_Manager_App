import { changeLanguage } from "i18next";
import { useState } from "react";

export function SelectLanguage(){
    const [selectedLanguage, setSelectedLanguage] = useState('cat');

    const handleLenguage = (lng: string) => {
      changeLanguage(lng);
      setSelectedLanguage(lng);
    };
  
    const getButtonClass = (lng: string) => {
      return `px-4 py-2 text-white border-r-0 ${
        selectedLanguage === lng ? 'bg-blue-700' : 'bg-blue-500'
      }`;
    };
  
    
    return(
    <div className="absolute right-40 bottom-40 flex shadow-md shadow-black">
        <button
        onClick={() => handleLenguage('cat')}
        className={`${getButtonClass('cat')} rounded-l-lg `}
        >
            Català
        </button>
        <button
        onClick={() => handleLenguage('es')}
        className={`${getButtonClass('es')} border-l border-r-0`}
        >
            Español
        </button>
        <button
        onClick={() => handleLenguage('en')}
        className={`${getButtonClass('en')} rounded-r-lg border-l-0`}
        >
            English
        </button>
</div>)}