"use client"

import { useState, useEffect, useRef } from "react"
import { CalendarDays,Clock, CreditCard, LogOut, User, Volume2,  VolumeX
} from "lucide-react"
import Sidebar from "../components/sidebar/sidebar"
import Footer from "../components/footer/footer"
import { Link } from "react-router"
import HomeButton from "../components/buttons/HomeButton"
import HomeStats from "../components/cards/HomeStats"
import { Clase } from "../type/clases"
import { Membresia } from "../type/membresia"
import { User as UserType } from "../type/user"
import apiClient from "../api/prefijo"
import { logout } from "../api/user/auth"
import { useNavigate } from "react-router-dom";
import CardBestTrainers from "../components/cards/CardBestTrainers"
import { formatDate } from "../utils/splitDate"
import MembershipStatus from "../components/cards/MembershipStatus"




export default function Home() {
  const [membresia, setMembresia] = useState<Membresia | null>(null)
  const [activeTab, setActiveTab] = useState("today")
  const [showNotifications, setShowNotifications] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [ user, setUser ] = useState<UserType | null>(null)

  const notificationRef = useRef<HTMLDivElement>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  const [clases, setClases] = useState<Clase[]>([])
  
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await apiClient.get("/my_info");
        if (!response.data.membresia || new Date(response.data.membresia.fecha_fin) < new Date()) {
          navigate('/tarifas'); // Redirigir a tarifas si no hay membresía o si la membresía ha expirado
          return;
        }
        setUser(response.data);
        setMembresia(response.data.membresia || null);
        setClases(response.data.clases);
      } catch (error) {
        console.log(error);
        navigate('/login'); // Redirigir al login si hay un error
      }
    };

    fetchData();
  }, []);

    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
          setShowNotifications(false)
        }
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
          setShowProfileMenu(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, []
  )


  const calculateRemainingDays = (endDate: Date) => {
    const today = new Date()
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - today.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }
    if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
        <p className="text-2xl font-bold text-center text-gray-800">
          cargando...
        </p>
      </div>
    );
  } 

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar></Sidebar>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <header className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Bienvenido, {user?.name}</h2>
            {user && (
              <div className="flex items-center space-x-4">
                <div className="relative">
            
                  {showNotifications && (
                    <div
                      ref={notificationRef}
                      className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10"
                    >
                      <div className="py-2 px-4 bg-gray-100 text-gray-800 font-semibold rounded-t-md flex justify-between items-center">
                        <span>Notificaciones</span>
                        <button onClick={toggleMute} className="text-gray-600 hover:text-gray-800">
                          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                      </div>
                      <div className="py-2 px-4 bg-gray-100 text-center rounded-b-md">
                        <button className="text-sm text-blue-600 hover:text-blue-800">Ver todas</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      src={user.profile_photo_url || "/placeholder.svg"}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  {showProfileMenu && (
                    <div ref={profileMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <div className="py-2 px-4 bg-gray-100 text-gray-800 font-semibold rounded-t-md">
                        Perfil de Usuario
                      </div>
                      <div className="py-2">
                        <a href="/configuracio" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <User className="inline-block w-4 h-4 mr-2" />
                          Ver perfil
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <CreditCard className="inline-block w-4 h-4 mr-2" />
                          Membresía: {`${user.membresia?.last_tarifa.nombre || "N/A"}`}
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <CalendarDays className="inline-block w-4 h-4 mr-2" />
                          Miembro desde: {formatDate(user.created_at)}
                        </a>
                        <button
                          onClick={() => {logout({navigate})}}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <LogOut className="inline-block w-4 h-4 mr-2" />
                          Cerrar sesión
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </header>

          {membresia && (
            <MembershipStatus
              membresia={{
                fecha_inicio: membresia?.fecha_inicio || new Date(),
                fecha_fin: membresia?.fecha_fin ? new Date(membresia.fecha_fin) : new Date(),
              }}
              calculateRemainingDays={calculateRemainingDays}
            />
          )}

          {/* Quick Stats */}
          <HomeStats user={user} ></HomeStats>

          {/* Workout History and Upcoming Classes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Workout History */}
            <CardBestTrainers>
              
            </CardBestTrainers>

            {/* Upcoming Classes */}
            <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Próximas Clases</h3>
            <div className="flex flex-wrap mb-4 border-b">
              <button
                onClick={() => setActiveTab("Lunes")}
                className={`py-2 px-4 ${activeTab === "Lunes" ? "border-b-2 border-maroon-600 text-maroon-600" : "text-gray-500"}`}
              >
                Lunes
              </button>
              <button
                onClick={() => setActiveTab("Martes")}
                className={`py-2 px-4 ${activeTab === "Martes" ? "border-b-2 border-maroon-600 text-maroon-600" : "text-gray-500"}`}
              >
                Martes
              </button>
              <button
                onClick={() => setActiveTab("Miércoles")}
                className={`py-2 px-4 ${activeTab === "Miércoles" ? "border-b-2 border-maroon-600 text-maroon-600" : "text-gray-500"}`}
              >
                Miércoles
              </button>
              <button
                onClick={() => setActiveTab("Jueves")}
                className={`py-2 px-4 ${activeTab === "Jueves" ? "border-b-2 border-maroon-600 text-maroon-600" : "text-gray-500"}`}
              >
                Jueves
              </button>
              <button
                onClick={() => setActiveTab("Viernes")}
                className={`py-2 px-4 ${activeTab === "Viernes" ? "border-b-2 border-maroon-600 text-maroon-600" : "text-gray-500"}`}
              >
                Viernes
              </button>
              <button
                onClick={() => setActiveTab("Sábado")}
                className={`py-2 px-4 ${activeTab === "Sábado" ? "border-b-2 border-maroon-600 text-maroon-600" : "text-gray-500"}`}
              >
                Sábado
              </button>
              <button
                onClick={() => setActiveTab("Domingo")}
                className={`py-2 px-4 ${activeTab === "Domingo" ? "border-b-2 border-maroon-600 text-maroon-600" : "text-gray-500"}`}
              >
                Domingo
              </button>
            </div>
            {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
              activeTab === day && (
                <div key={day} className="space-y-4">
                  {clases.filter(clase => clase.horarios.some(horario => horario.dia === day)).map((clase) => (
                    clase.horarios.filter(horario => horario.dia === day).map((horario, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b last:border-b-0">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 text-maroon-600 mr-3" />
                          <span>{clase.nombre}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="px-2 py-1 bg-maroon-100 text-maroon-600 rounded text-sm">{`${horario.hora_inicio} - ${horario.hora_fin}`}</span>
                        </div>
                      </div>
                    ))
                  ))}
                </div>
              )
            ))}
            <HomeButton text="Ver todas las clases"></HomeButton>
          </div>
          </div>
          
          
        

          
          {/* Call to Action */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold mb-2">¿Listo para el siguiente nivel?</h3>
            <p className="mb-4">Actualiza tu plan y accede a clases exclusivas y entrenamiento personalizado.</p>
            <Link to={"/tarifas"} className="py-2 px-4 bg-white text-blue-600 rounded hover:bg-gray-100 transition-colors">
              Mejorar mi membresía
            </Link>
          </div>

        
        </main>
      </div>

      {/* Footer */}
     <Footer></Footer>
    </div>
  )
}

