import React, { useState } from "react"

import { Calendar, Clock, Dumbbell, User, ShoppingBag, Bell, TrendingUp, Heart, LogIn, MapPin, Phone, Mail, Search, Menu, X,} 

from "lucide-react"


const GymDashboard = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("dashboard");
  
    const currentDate = new Date();
    const currentHour = currentDate.getUTCHours() + 1; // Convert UTC to Madrid time (UTC+1)
    const currentDay = currentDate.getDay();
  
    const scheduleData = [
      { day: "Lunes - Viernes", openHour: 6, closeHour: 22 },
      { day: "Sábado", openHour: 8, closeHour: 20 },
      { day: "Domingo", openHour: 9, closeHour: 18 },
    ];
  
    const isGymOpen = () => {
      const todaySchedule = currentDay === 0 ? scheduleData[2] : currentDay === 6 ? scheduleData[1] : scheduleData[0];
      return currentHour >= todaySchedule.openHour && currentHour < todaySchedule.closeHour;
    };
  
    const classes = [
      { name: "Yoga", time: "10:00", duration: "60 min", instructor: "Ana", spots: 5, color: "bg-green-500" },
      { name: "Spinning", time: "11:30", duration: "45 min", instructor: "Carlos", spots: 3, color: "bg-red-500" },
      { name: "Pilates", time: "17:00", duration: "60 min", instructor: "María", spots: 8, color: "bg-purple-500" },
      { name: "Crossfit", time: "18:30", duration: "60 min", instructor: "Juan", spots: 2, color: "bg-yellow-500" },
    ];
  

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <header className="bg-gray-800 shadow-md py-4 px-8 sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Dumbbell className="text-blue-400 mr-2" size={24} />
            <span className="text-xl font-bold">GyManager</span>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              <li>
                <a
                  href="#"
                  onClick={() => setActiveTab("dashboard")}
                  className={`hover:text-blue-400 transition-colors ${activeTab === "dashboard" ? "text-blue-400" : ""}`}
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setActiveTab("classes")}
                  className={`hover:text-blue-400 transition-colors ${activeTab === "classes" ? "text-blue-400" : ""}`}
                >
                  Clases
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setActiveTab("schedule")}
                  className={`hover:text-blue-400 transition-colors ${activeTab === "schedule" ? "text-blue-400" : ""}`}
                >
                  Horarios
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setActiveTab("contact")}
                  className={`hover:text-blue-400 transition-colors ${activeTab === "contact" ? "text-blue-400" : ""}`}
                >
                  Contacto
                </a>
              </li>
            </ul>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                className="bg-gray-700 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
            <button className="flex items-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors" onClick={() => { window.location.href = "/login" }}>
              <LogIn className="mr-2" size={18} />
              Iniciar Sesión
            </button>
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <nav className="container mx-auto px-8">
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setActiveTab("dashboard")
                    toggleMenu()
                  }}
                  className="block hover:text-blue-400 transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setActiveTab("classes")
                    toggleMenu()
                  }}
                  className="block hover:text-blue-400 transition-colors"
                >
                  Clases
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setActiveTab("schedule")
                    toggleMenu()
                  }}
                  className="block hover:text-blue-400 transition-colors"
                >
                  Horarios
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    setActiveTab("contact")
                    toggleMenu()
                  }}
                  className="block hover:text-blue-400 transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
            <div className="mt-4 space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full bg-gray-700 text-white rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <button className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">
                <LogIn className="mr-2" size={18} />
                Iniciar Sesión
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow p-8">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Bienvenido a GyManager</h1>
              <p className="text-gray-400">Tu camino hacia una vida más saludable comienza aquí</p>
            </div>
            <div className={`px-4 py-2 rounded-full ${isGymOpen() ? "bg-green-500" : "bg-red-500"} flex items-center`}>
              <div
                className={`w-3 h-3 rounded-full ${isGymOpen() ? "bg-green-200" : "bg-red-200"} mr-2 animate-pulse`}
              ></div>
              {isGymOpen() ? "Abierto" : "Cerrado"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Clases Disponibles */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Dumbbell className="mr-2 text-blue-400" /> Clases Disponibles
              </h2>
              <ul className="space-y-3">
                {classes.map((cls, index) => (
                  <li key={index} className="flex justify-between items-center border-b border-gray-700 pb-2">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full ${cls.color} mr-2`}></div>
                      <div>
                        <span className="font-medium">{cls.name}</span>
                        <p className="text-sm text-gray-400">
                          {cls.time} - {cls.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-400">{cls.instructor}</span>
                      <button className="ml-2 bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition-colors">
                        Reservar ({cls.spots})
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Horario */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="mr-2 text-blue-400" /> Horario
              </h2>
              <ul className="space-y-3">
                {scheduleData.map((schedule, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span>{schedule.day}</span>
                    <span className="text-gray-400">{`${schedule.openHour}:00 - ${schedule.closeHour}:00`}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-gray-400 italic">* El horario puede variar en días festivos</p>
            </div>

            {/* Tienda de Suplementos */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <ShoppingBag className="mr-2 text-blue-400" /> Tienda de Suplementos
              </h2>
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span>Proteína en polvo</span>
                  <span className="text-gray-400">Desde 25€</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Creatina</span>
                  <span className="text-gray-400">Desde 15€</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Barras energéticas</span>
                  <span className="text-gray-400">Desde 2€</span>
                </li>
              </ul>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                Ver Catálogo Completo
              </button>
            </div>

            {/* Calendario de Reservas */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Calendar className="mr-2 text-blue-400" /> Calendario de Reservas
              </h2>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
                  <div key={day} className="text-center font-bold">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <div key={day} className="text-center p-2 rounded hover:bg-gray-700 cursor-pointer transition-colors">
                    {day}
                  </div>
                ))}
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
                Ver Mis Reservas
              </button>
            </div>

            {/* Perfil y Progreso */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <User className="mr-2 text-blue-400" /> Mi Perfil y Progreso
              </h2>
              <div className="space-y-4 mb-4">
                <div>
                  <span className="text-gray-400">Nivel actual:</span>
                  <div className="w-full bg-gray-700 rounded-full h-2.5 mt-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "70%" }}></div>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Clases este mes:</span>
                  <div className="text-2xl font-bold">12 / 15</div>
                </div>
                <div>
                  <span className="text-gray-400">Próximo objetivo:</span>
                  <div className="text-lg font-semibold text-blue-400">15 clases</div>
                </div>
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors" onClick={() => { window.location.href = "/profile" }}>
                Ver Detalles
              </button>
            </div>

           
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 shadow-md py-8 px-8">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">GyManager</h3>
            <p className="text-gray-400">Tu gimnasio de confianza para alcanzar tus metas fitness.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center">
                <MapPin className="mr-2 text-blue-400" size={18} />
                Calle Fitness, 123, 08001 Barcelona
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-blue-400" size={18} />
                +34 123 456 789
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-blue-400" size={18} />
                info@GyManager.com
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Facebook
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Instagram
              </a>
              
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; 2023 GyManager. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default GymDashboard

