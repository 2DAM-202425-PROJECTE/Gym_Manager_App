import { useState, useEffect } from "react"
import { Calendar, Clock, User, MapPin, Dumbbell, Bell, LogOut } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Sidebar from "../../components/sidebar/sidebar"
import Footer from "../../components/footer/footer"

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
         <Sidebar></Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
         

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
      <Footer></Footer>
    </div>
  )
}

