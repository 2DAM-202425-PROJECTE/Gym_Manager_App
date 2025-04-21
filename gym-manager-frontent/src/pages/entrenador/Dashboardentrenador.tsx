"use client"

import { useState, useEffect, useRef } from "react"
import {
  Calendar, Clock, Users, MessageSquare, Settings, ChevronLeft, ChevronRight,
  Bell, User, LogOut, Dumbbell, BarChart2, Star, Plus, CheckCircle
} from 'lucide-react'
import SidebarEntrenador from "./sidebarentrenadors"
import ClasesEnt from "./ClasesEnt"
import HorarioEnt from "./HorariEnt"
import ResenasEnt from "./ResenaEnt"
import StatsEntrenador from "../../components/cards/StatsEntrenador"
import AjustesEntrenador from "./AjustesEnt"

// Tipos
type Clase = {
  id: number
  nombre: string
  dia: string
  hora: string
  duracion: number
  capacidad: number
  inscritos: number
  sala: string
  entrenadorId: number
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
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentWeek, setCurrentWeek] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [selectedDay, setSelectedDay] = useState<string | null>(null)

  const notificationRef = useRef<HTMLDivElement>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  const horasDia = ["09:00", "10:00", "11:00", "17:00", "18:00", "19:00", "20:00"]

  const [clases, setClases] = useState<Clase[]>([])
  const [resenas, setResenas] = useState<Resena[]>([])

  const idEntrenadorActual = 101 // <-- Esto deberías obtenerlo de login/contexto

  // Fetch de clases desde backend
  useEffect(() => {
    const fetchClases = async () => {
      try {
        const res = await fetch("/api/clases")
        const data: Clase[] = await res.json()

        const clasesEntrenador = data.filter(clase => clase.entrenadorId === idEntrenadorActual)
        setClases(clasesEntrenador)
      } catch (error) {
        console.error("Error al cargar clases:", error)
      }
    }

    fetchClases()
  }, [])

  // Reseñas falsas mientras no hay backend de reseñas
  useEffect(() => {
    const resenasData: Resena[] = [
      {
        id: 1,
        usuario: "Elena Ruiz",
        puntuacion: 5,
        comentario: "Excelente entrenador, muy motivador.",
        fecha: new Date("2023-06-05"),
        avatar: "/placeholder.svg"
      },
      {
        id: 2,
        usuario: "Roberto Fernández",
        puntuacion: 4,
        comentario: "Muy buenas clases.",
        fecha: new Date("2023-05-28"),
        avatar: "/placeholder.svg"
      },
    ]
    setResenas(resenasData)
  }, [])

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

  const handlePrevWeek = () => setCurrentWeek(prev => prev - 1)
  const handleNextWeek = () => setCurrentWeek(prev => prev + 1)

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
      <Star key={i} className={`h-4 w-4 ${i < puntuacion ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <SidebarEntrenador activeTab={activeTab} setActiveTab={setActiveTab} mensajesNoLeidos={0} />

      <main className="flex-1 p-8 overflow-y-auto">
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
              <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              {showNotifications && (
                <div ref={notificationRef} className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
                  <div className="py-2 px-4 bg-gray-100 font-semibold">Notificaciones</div>
                  <div className="py-2 max-h-64 overflow-y-auto"></div>
                  <div className="py-2 px-4 bg-gray-100 text-center">
                    <button className="text-sm text-blue-600 hover:text-blue-800" onClick={() => setActiveTab("mensajes")}>
                      Ver todos los mensajes
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                <img src="/placeholder.svg" alt="Perfil" className="w-full h-full object-cover" />
              </button>
              {showProfileMenu && (
                <div ref={profileMenuRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-2 px-4 bg-gray-100 font-semibold">Perfil de Entrenador</div>
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100"><User className="w-4 h-4 mr-2 inline-block" />Ver perfil</a>
                    <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-100"><Settings className="w-4 h-4 mr-2 inline-block" />Configuración</a>
                    <a href="/login" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"><LogOut className="w-4 h-4 mr-2 inline-block" />Cerrar sesión</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <StatsEntrenador
              clases={clases}
              getTotalInscritos={getTotalInscritos}
              getPorcentajeOcupacion={getPorcentajeOcupacion}
            />

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Próximas Clases</h3>
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

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Últimas Reseñas</h3>
              <div className="space-y-4">
                {resenas.map((resena) => (
                  <div key={resena.id} className="py-2 border-b last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 overflow-hidden">
                        <img src={resena.avatar} alt={resena.usuario} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{resena.usuario}</p>
                        <div className="flex">{renderStars(resena.puntuacion)}</div>
                      </div>
                      <p className="text-xs text-gray-500 ml-auto">{resena.fecha.toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-gray-700">{resena.comentario}</p>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 px-4 bg-maroon-600 text-white rounded hover:bg-maroon-700" onClick={() => setActiveTab("resenas")}>
                Ver todas las reseñas
              </button>
            </div>
          </div>
        )}

        {/* Otras secciones */}
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
        {activeTab === "clases" && (
          <ClasesEnt clases={clases} diasSemana={diasSemana} getClasesPorDia={getClasesPorDia} />
        )}
        {activeTab === "resenas" && (
          <ResenasEnt resenas={resenas} renderStars={renderStars} />
        )}
        {activeTab === "ajustes" && <AjustesEntrenador />}
      </main>
    </div>
  )
}
