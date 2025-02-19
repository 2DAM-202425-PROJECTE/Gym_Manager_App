import { useState, useEffect } from "react"
import { Calendar, Clock, User, MapPin, Dumbbell, Bell, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

type Class = {
  id: number
  name: string
  instructor: string
  time: string
  duration: number
  location: string
  capacity: number
  enrolled: number
}

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const location = useLocation()

  const navItems = [
    { to: "/", label: "Dashboard" },
    { to: "/clases", label: "Clases" },
    { to: "/entrenadores", label: "Entrenadores" },
    { to: "/nutricion", label: "Nutrición" },
    { to: "/configuracion", label: "Configuración" },
  ]

  useEffect(() => {
    // Simular la carga de datos de clases
    const fetchClasses = async () => {
      const classesData: Class[] = [
        { id: 1, name: "Yoga", instructor: "Ana García", time: "09:00", duration: 60, location: "Sala 1", capacity: 20, enrolled: 15 },
        { id: 2, name: "Spinning", instructor: "Carlos Rodríguez", time: "10:30", duration: 45, location: "Sala de Spinning", capacity: 15, enrolled: 12 },
        { id: 3, name: "CrossFit", instructor: "Laura Martínez", time: "18:00", duration: 60, location: "Zona Funcional", capacity: 12, enrolled: 10 },
        { id: 4, name: "Pilates", instructor: "María Sánchez", time: "19:30", duration: 55, location: "Sala 2", capacity: 15, enrolled: 8 },
      ]
      setClasses(classesData)
    }
    fetchClasses()
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <div className="p-4 flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-maroon-600" />
            <h1 className="text-2xl font-bold text-maroon-600">POWER GYM</h1>
          </div>
          <nav className="mt-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`block py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600 ${
                  location.pathname === item.to ? 'bg-maroon-100 text-maroon-600 border-l-4 border-maroon-600' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">POWER GYM</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors relative"
              >
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden"
                >
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="inline-block w-4 h-4 mr-2" />
                        Ver perfil
                      </a>
                      <button
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

          {/* Classes Content */}
          <div className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Clases Disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((classItem) => (
                <div key={classItem.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-maroon-600">{classItem.name}</h3>
                    <div className="bg-maroon-100 text-maroon-600 px-3 py-1 rounded-full text-sm">
                      {classItem.enrolled}/{classItem.capacity}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <User className="h-5 w-5 mr-2" />
                      <span>{classItem.instructor}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{classItem.time} - {classItem.duration} min</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{classItem.location}</span>
                    </div>
                  </div>
                  <button className="w-full mt-4 py-2 px-4 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                    Reservar Clase
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2023 POWER GYM. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

