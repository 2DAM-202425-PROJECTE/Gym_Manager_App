import { useState, useEffect } from "react"
import { User, Star, Calendar, Dumbbell, Bell, LogOut } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

type Trainer = {
  id: number
  name: string
  specialty: string
  rating: number
  experience: number
  availability: string[]
  image: string
}

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<Trainer[]>([])
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
    // Simular la carga de datos de entrenadores
    const fetchTrainers = async () => {
      const trainersData: Trainer[] = [
        {
          id: 1,
          name: "Carlos Rodríguez",
          specialty: "Fuerza y Acondicionamiento",
          rating: 4.8,
          experience: 7,
          availability: ["Lun", "Mié", "Vie"],
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 2,
          name: "Ana García",
          specialty: "Yoga y Pilates",
          rating: 4.9,
          experience: 5,
          availability: ["Mar", "Jue", "Sáb"],
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 3,
          name: "Miguel Sánchez",
          specialty: "Nutrición Deportiva",
          rating: 4.7,
          experience: 6,
          availability: ["Lun", "Mié", "Vie"],
          image: "/placeholder.svg?height=200&width=200",
        },
        {
          id: 4,
          name: "Laura Martínez",
          specialty: "Entrenamiento Funcional",
          rating: 4.6,
          experience: 4,
          availability: ["Mar", "Jue", "Sáb"],
          image: "/placeholder.svg?height=200&width=200",
        },
      ]
      setTrainers(trainersData)
    }
    fetchTrainers()
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
                  location.pathname === item.to ? "bg-maroon-100 text-maroon-600 border-l-4 border-maroon-600" : ""
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
                  <img src="/placeholder.svg?height=40&width=40" alt="User" className="w-full h-full object-cover" />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="inline-block w-4 h-4 mr-2" />
                        Ver perfil
                      </a>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <LogOut className="inline-block w-4 h-4 mr-2" />
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Trainers Content */}
          <div className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Nuestros Entrenadores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                >
                  <img
                    src={trainer.image || "/placeholder.svg"}
                    alt={trainer.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-maroon-600 mb-2">{trainer.name}</h3>
                    <p className="text-gray-600 mb-4">{trainer.specialty}</p>
                    <div className="flex items-center mb-4">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="text-gray-700">{trainer.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <User className="h-5 w-5 mr-2" />
                      <span>{trainer.experience} años de experiencia</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>Disponible: {trainer.availability.join(", ")}</span>
                    </div>
                    <button className="w-full py-2 px-4 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                      Reservar Sesión
                    </button>
                  </div>
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