"use client"

import { useState, useEffect, useRef } from "react"
import {  Settings, Bell, User, LogOut, Dumbbell, Star } from 'lucide-react'
import SidebarEntrenador from "./sidebarentrenadors"

import StatsEntrenador from "../../components/cards/StatsEntrenador"
import AjustesEntrenador from "./AjustesEnt"
import apiClient from "../../api/prefijo"
import { Entrenador } from "../../type/entrenadors"

export default function VistaEntrenador() {
  // Estados principales
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)  
  // Referencias para cerrar menús al hacer clic fuera
  const notificationRef = useRef<HTMLDivElement>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  


  const [ entrenador, setEntrenador] = useState<Entrenador>()

  useEffect(() => {

    async function fetchUser(){
      const response = await apiClient.get("/trainer_info")
      console.log(response.data)
      setEntrenador(response.data.trainer)
      
    }

    fetchUser()
    
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
  
  
  const getClasesPopulares = () => {
    return [...entrenador?.clases || []]
      .sort((a, b) => (b.total_participantes / b.maximo_participantes) - (a.total_participantes / a.maximo_participantes))
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
                    <a
                      href="/login"
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <LogOut className="inline-block w-4 h-4 mr-2" />
                      Cerrar sesión
                    </a>
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
              clases={entrenador?.clases || []}
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
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{clase.total_participantes}/{clase.maximo_participantes}</p>
                      <p className="text-sm text-gray-500">{Math.round((clase.total_participantes / clase.maximo_participantes) * 100)}% ocupación</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Últimas Reseñas */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Valoracion media</h3>
              <div className="space-y-4">
                  <div className="py-2 border-b last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div>
                        <p className="font-medium">{entrenador?.valoracion_media}/5</p>
                        <div className="flex">
                          {renderStars(entrenador?.valoracion_media || 0)}
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        )}

        {/* Ajustes */}
        {activeTab === "ajustes" && (
            <AjustesEntrenador />
        )}
        </main>
        </div>
        )
        }


                
        