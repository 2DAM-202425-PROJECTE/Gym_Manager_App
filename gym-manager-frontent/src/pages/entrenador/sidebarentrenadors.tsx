import { BarChart2, Calendar, Dumbbell, MessageSquare, Settings, Star, Users } from "lucide-react";
import { useLocation } from "react-router-dom";

interface SidebarEntrenadorProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  mensajesNoLeidos: number;
}

export default function SidebarEntrenador({ activeTab, setActiveTab, mensajesNoLeidos }: SidebarEntrenadorProps) {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-4 flex items-center space-x-2">
        <Dumbbell className="h-8 w-8 text-maroon-600" />
        <h1 className="text-2xl font-bold text-maroon-600">POWER GYM</h1>
      </div>
      <div className="p-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-maroon-100 flex items-center justify-center overflow-hidden">
            <img
              src="/placeholder.svg?height=48&width=48"
              alt="Entrenador"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">David Torres</h2>
            <p className="text-sm text-gray-500">Entrenador Senior</p>
          </div>
        </div>
      </div>
      <nav className="mt-4">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`w-full flex items-center py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600 ${activeTab === "dashboard" ? "bg-maroon-100 text-maroon-600 border-l-4 border-maroon-600" : ""}`}
        >
          <BarChart2 className="h-5 w-5 mr-3" />
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab("horario")}
          className={`w-full flex items-center py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600 ${activeTab === "horario" ? "bg-maroon-100 text-maroon-600 border-l-4 border-maroon-600" : ""}`}
        >
          <Calendar className="h-5 w-5 mr-3" />
          Horario
        </button>
        <button
          onClick={() => setActiveTab("clases")}
          className={`w-full flex items-center py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600 ${activeTab === "clases" ? "bg-maroon-100 text-maroon-600 border-l-4 border-maroon-600" : ""}`}
        >
          <Users className="h-5 w-5 mr-3" />
          Mis Clases
        </button>
     
        <button
          onClick={() => setActiveTab("resenas")}
          className={`w-full flex items-center py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600 ${activeTab === "resenas" ? "bg-maroon-100 text-maroon-600 border-l-4 border-maroon-600" : ""}`}
        >
          <Star className="h-5 w-5 mr-3" />
          Reseñas
        </button>
        <button
          onClick={() => setActiveTab("ajustes")}
          className={`w-full flex items-center py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600 ${activeTab === "ajustes" ? "bg-maroon-100 text-maroon-600 border-l-4 border-maroon-600" : ""}`}
        >
          <Settings className="h-5 w-5 mr-3" />
          Ajustes
        </button>
      </nav>
    </aside>
  );
}