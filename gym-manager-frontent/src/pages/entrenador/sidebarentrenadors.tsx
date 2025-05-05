import { BarChart2, Calendar, Dumbbell, Users, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import apiClient from "../../api/prefijo";
import { Entrenador } from "../../type/entrenadors";


interface SidebarEntrenadorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mensajesNoLeidos: number;
}

export default function SidebarEntrenador({ activeTab, setActiveTab }: SidebarEntrenadorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [entrenador, setEntrenador] = useState<Entrenador>();
  useEffect(() => {

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    async function fetchTrainer () {

    const response = await apiClient.get("/trainer_info")
    console.log(response.data)
    setEntrenador(response.data.trainer)
    }
    fetchTrainer()
  }, [])

  return (
    <>
      {/* Botón de menú hamburguesa para móviles */}
      {!isOpen && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button onClick={() => setIsOpen(true)} className="text-maroon-600 p-2 bg-white rounded-full shadow-md">
            <Menu className="h-6 w-6" />
          </button>
        </div>
      )}
      
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-60 bg-white shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 transition-transform duration-300 ease-in-out md:relative md:block z-40`}>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-maroon-600" />
            <h1 className="text-xl font-bold text-maroon-600">POWER GYM</h1>
          </div>
          <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-600 p-2">
            ✕
          </button>
        </div>
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-maroon-100 flex items-center justify-center overflow-hidden">
              <img src="/src/assets/user.png" alt="Entrenador" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800 text-sm">{entrenador?.user.name}</h2>
              <p className="text-xs text-gray-500">{entrenador?.user.email}</p>
            </div>
          </div>
        </div>
        <nav className="mt-2">
          {[
            { tab: "dashboard", label: "Dashboard", icon: <BarChart2 className="h-5 w-5 mr-3" /> },
            { tab: "horario", label: "Horario", icon: <Calendar className="h-5 w-5 mr-3" /> },
            { tab: "clases", label: "Mis Clases", icon: <Users className="h-5 w-5 mr-3" /> },
          ].map(({ tab, label, icon }) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsOpen(false);
              }}
              className={`w-full flex items-center py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600 ${
                activeTab === tab ? "bg-maroon-100 text-maroon-600 border-l-4 border-maroon-600" : ""
              }`}
            >
              {icon} {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Fondo para cerrar el menú en móvil */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-40 md:hidden" onClick={() => setIsOpen(false)}></div>}
    </>
  );
}
