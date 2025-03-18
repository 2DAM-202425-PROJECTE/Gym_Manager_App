"use client"

import { useState, useEffect, useRef } from "react"
import { Calendar, Clock, Users, MessageSquare, Settings, ChevronLeft, ChevronRight, Bell, User, LogOut, Dumbbell, BarChart2, Star, Plus, CheckCircle } from 'lucide-react'
import Sidebar from "../../components/sidebar/sidebar"
import SidebarEntrenador from "./sidebarentrenadors"
import ClasesEnt from "./ClasesEnt"
import HorarioEnt from "./HorariEnt"
import ResenasEnt from "./ResenaEnt"
import StatsEntrenador from "../../components/cards/StatsEntrenador"
import AjustesEntrenador from "./AjustesEnt"

// Tipos simplificados
type Clase = {
  id: number
  nombre: string
  dia: string
  hora: string
  duracion: number
  capacidad: number
  inscritos: number
  sala: string
}

type Mensaje = {
  id: number
  remitente: string
  contenido: string
  fecha: Date
  leido: boolean
  avatar: string
}

type Resena = {
  id: number
  usuario: string
  puntuacion: number
  comentario: string
  fecha: Date
  avatar: string
}

export default function VistaEntrenador() {
  // Estados principales
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentWeek, setCurrentWeek] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  
  // Referencias para cerrar menús al hacer clic fuera
  const notificationRef = useRef<HTMLDivElement>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  
  // Datos estáticos
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  const horasDia = ["09:00", "10:00", "11:00", "17:00", "18:00", "19:00", "20:00"]
  
  // Datos de la aplicación
  const [clases, setClases] = useState<Clase[]>([])
  const [resenas, setResenas] = useState<Resena[]>([])
  
  useEffect(() => {
    // Datos simplificados
    const clasesData: Clase[] = [
      { id: 1, nombre: "Spinning", dia: "Lunes", hora: "10:00", duracion: 45, capacidad: 20, inscritos: 15, sala: "Sala 1" },
      { id: 2, nombre: "Yoga", dia: "Miércoles", hora: "17:00", duracion: 60, capacidad: 15, inscritos: 12, sala: "Sala 2" },
      { id: 3, nombre: "CrossFit", dia: "Martes", hora: "10:00", duracion: 45, capacidad: 12, inscritos: 10, sala: "Sala 3" },
      { id: 4, nombre: "Pilates", dia: "Sábado", hora: "18:00", duracion: 60, capacidad: 15, inscritos: 8, sala: "Sala 2" },
      { id: 5, nombre: "Zumba", dia: "Jueves", hora: "19:00", duracion: 45, capacidad: 25, inscritos: 22, sala: "Sala 1" },
    ]
    
    
    const resenasData: Resena[] = [
      { 
        id: 1, 
        usuario: "Elena Ruiz", 
        puntuacion: 5, 
        comentario: "Excelente entrenador, muy motivador y atento a los detalles.", 
        fecha: new Date("2023-06-05"), 
        avatar: "/placeholder.svg?height=40&width=40"
      },
      { 
        id: 2, 
        usuario: "Roberto Fernández", 
        puntuacion: 4, 
        comentario: "Buenas clases, aunque a veces van un poco rápido para principiantes.", 
        fecha: new Date("2023-05-28"), 
        avatar: "/placeholder.svg?height=40&width=40"
      },
    ]
    
    setClases(clasesData)
    setResenas(resenasData)
  }, [])
  
  // Efecto para cerrar menús al hacer clic fuera
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
  }, [])
  
  // Funciones auxiliares optimizadas
  const handlePrevWeek = () => setCurrentWeek(prev => prev - 1)
  const handleNextWeek = () => setCurrentWeek(prev => prev + 1)
  const handleLogout = () => console.log("Cerrar sesión")
  
  
  
  const getClasesPorDia = (dia: string) => clases.filter(clase => clase.dia === dia)
  const getTotalInscritos = () => clases.reduce((total, clase) => total + clase.inscritos, 0)
  
  const getPorcentajeOcupacion = () => {
    const capacidadTotal = clases.reduce((total, clase) => total + clase.capacidad, 0)
    const inscritosTotal = getTotalInscritos()
    return capacidadTotal > 0 ? Math.round((inscritosTotal / capacidadTotal) * 100) : 0
  }
  
  const getClasesPopulares = () => {
    return [...clases]
      .sort((a, b) => (b.inscritos / b.capacidad) - (a.inscritos / a.capacidad))
      .slice(0, 3)
  }
  
 
  
  const renderStars = (puntuacion: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < puntuacion ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} 
      />
    ))
  }
  
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      
      <SidebarEntrenador activeTab={activeTab} setActiveTab={setActiveTab} mensajesNoLeidos={0}  />


      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "horario" && "Mi Horario"}
            {activeTab === "clases" && "Mis Clases"}
            {activeTab === "resenas" && "Reseñas"}
            {activeTab === "ajustes" && "Ajustes"}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors relative"
              >
                <Bell className="h-5 w-5 text-gray-600" />
              
    
              </button>
              {showNotifications && (
                <div ref={notificationRef} className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
                  <div className="py-2 px-4 bg-gray-100 text-gray-800 font-semibold rounded-t-md">
                    Notificaciones
                  </div>
                  <div className="py-2 max-h-64 overflow-y-auto">
                   
                       
                      
                    
                  </div>
                  <div className="py-2 px-4 bg-gray-100 text-center rounded-b-md">
                    <button 
                      className="text-sm text-blue-600 hover:text-blue-800"
                      onClick={() => setActiveTab("mensajes")}
                    >
                      Ver todos los mensajes
                    </button>
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
                  src="/placeholder.svg?height=40&width=40"
                  alt="Perfil"
                  className="w-full h-full object-cover"
                />
              </button>
              {showProfileMenu && (
                <div ref={profileMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-2 px-4 bg-gray-100 text-gray-800 font-semibold rounded-t-md">
                    Perfil de Entrenador
                  </div>
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="inline-block w-4 h-4 mr-2" />
                      Ver perfil
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="inline-block w-4 h-4 mr-2" />
                      Configuración
                    </a>
                    <button
                      onClick={handleLogout}
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
        </header>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>

            {/* Stats Cards */}
            <StatsEntrenador
              clases={clases}
              getTotalInscritos={getTotalInscritos}
              getPorcentajeOcupacion={getPorcentajeOcupacion}
            />

            {/* Clases Populares */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Clases Más Populares</h3>
              <div className="space-y-4">
                {getClasesPopulares().map((clase) => (
                  <div key={clase.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center">
                      <Dumbbell className="h-5 w-5 text-maroon-600 mr-3" />
                      <div>
                        <p className="font-medium">{clase.nombre}</p>
                        <p className="text-sm text-gray-500">{clase.dia} a las {clase.hora}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{clase.inscritos}/{clase.capacidad}</p>
                      <p className="text-sm text-gray-500">{Math.round((clase.inscritos / clase.capacidad) * 100)}% ocupación</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Últimas Reseñas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Últimas Reseñas</h3>
              <div className="space-y-4">
                {resenas.map((resena) => (
                  <div key={resena.id} className="py-2 border-b last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 overflow-hidden">
                        <img 
                          src={resena.avatar || "/placeholder.svg"} 
                          alt={resena.usuario} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{resena.usuario}</p>
                        <div className="flex">
                          {renderStars(resena.puntuacion)}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 ml-auto">{resena.fecha.toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-gray-700">{resena.comentario}</p>
                  </div>
                ))}
              </div>
              <button 
                className="w-full mt-4 py-2 px-4 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors"
                onClick={() => setActiveTab("resenas")}
              >
                Ver todas las reseñas
              </button>
            </div>
          </div>
        )}

      
        {/* Horario */}
        {activeTab === "horario" && (
          <HorarioEnt
            clases={clases}
            diasSemana={diasSemana}
            horasDia={horasDia}
            currentWeek={currentWeek}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            handlePrevWeek={handlePrevWeek}
            handleNextWeek={handleNextWeek}
          />
        )}

        {/* Clases */}
        {activeTab === "clases" && (
          <ClasesEnt
            clases={clases}
            diasSemana={diasSemana}
            getClasesPorDia={getClasesPorDia}
          />
        )}



        {/* Reseñas */}
        {activeTab === "resenas" && (
          <ResenasEnt
            resenas={resenas}
            renderStars={renderStars}
          />
        )}

        {/* Ajustes */}
        {activeTab === "ajustes" && (
            <AjustesEntrenador />
        )}
        </main>
        </div>
        )
        }


                
        