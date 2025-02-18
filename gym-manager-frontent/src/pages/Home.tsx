
import { useState, useEffect } from "react"
import { CalendarDays, Clock, Phone, CreditCard, LogIn, LogOut, User, Mail, Menu } from "lucide-react"

type Membresia = {
  id: number
  user_id: number
  fecha_fin: Date
  qr_data: string
  created_at: Date
  updated_at: Date
}

type User = {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  current_team_id: number | null
  profile_photo_path: string | null
  created_at: string
  updated_at: string
  two_factor_confirmed_at: string | null
  role: string
  profile_photo_url: string
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null)
  const [membresia, setMembresia] = useState<Membresia | null>(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // Simular la carga de datos del usuario y membresía
    const fetchData = async () => {
      // Aquí deberías hacer una llamada a tu API real
      const userData: User = {
        id: 1,
        name: "Juan Pérez",
        email: "juan@example.com",
        profile_photo_url: "/placeholder.svg?height=40&width=40",
        email_verified_at: null,
        current_team_id: null,
        profile_photo_path: null,
        created_at: "",
        updated_at: "",
        two_factor_confirmed_at: null,
        role: ""
      }
      const membresiaData: Membresia = {
        id: 1,
        user_id: 1,
        fecha_fin: new Date("2023-12-31"),
        qr_data: "qr-data",
        created_at: new Date(),
        updated_at: new Date(),
      }
      setUser(userData)
      setMembresia(membresiaData)
    }
    fetchData()
  }, [])

  const handleLogout = () => {
    setUser(null)
    setMembresia(null)
  }

  const calculateRemainingDays = (endDate: Date) => {
    const today = new Date()
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - today.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src="/placeholder.svg?height=32&width=32" alt="Gym Logo" />
                <span className="ml-2 text-xl font-bold text-gray-800">Mi Gimnasio</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              {user ? (
                <div className="ml-3 relative flex items-center">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.profile_photo_url || "/placeholder.svg"}
                    alt={user.name}
                  />
                  <span className="ml-2 text-gray-700">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:text-gray-900 focus:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:text-gray-900 focus:bg-gray-100">
                  <LogIn className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3">
              {user ? (
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.profile_photo_url || "/placeholder.svg"}
                      alt={user.name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.email}</div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="ml-auto flex-shrink-0 bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <LogOut className="h-6 w-6" />
                  </button>
                </div>
              ) : (
                <div className="mt-3 px-2 space-y-1">
                  <button className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out">
                    Iniciar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {user && membresia && (
          <div className="bg-white overflow-hidden shadow-xl rounded-lg mb-8">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Tu membresía</h2>
              <div className="mt-3 flex items-center">
                <div className="text-5xl font-extrabold text-indigo-600">
                  {calculateRemainingDays(membresia.fecha_fin)}
                </div>
                <div className="ml-3 text-xl text-gray-500">días restantes</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <CalendarDays className="h-8 w-8 text-indigo-600" />
                <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900">Horarios</h3>
              </div>
              <div className="mt-5 text-gray-500">
                <p className="group flex items-center">
                  <span className="w-20 font-medium">Lun - Vie:</span>
                  <span>6:00 AM - 10:00 PM</span>
                </p>
                <p className="group flex items-center mt-2">
                  <span className="w-20 font-medium">Sáb - Dom:</span>
                  <span>8:00 AM - 8:00 PM</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-indigo-600" />
                <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900">Clases</h3>
              </div>
              <div className="mt-5 space-y-2">
                <p className="flex items-center text-sm text-gray-500">
                  <span className="w-24 font-medium">Yoga:</span>
                  <span>Lun, Mié 7:00 PM</span>
                </p>
                <p className="flex items-center text-sm text-gray-500">
                  <span className="w-24 font-medium">Spinning:</span>
                  <span>Mar, Jue 6:00 PM</span>
                </p>
                <p className="flex items-center text-sm text-gray-500">
                  <span className="w-24 font-medium">Zumba:</span>
                  <span>Vie 7:00 PM</span>
                </p>
                <p className="flex items-center text-sm text-gray-500">
                  <span className="w-24 font-medium">CrossFit:</span>
                  <span>Sáb 10:00 AM</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <Phone className="h-8 w-8 text-indigo-600" />
                <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900">Contacto</h3>
              </div>
              <div className="mt-5 space-y-2">
                <p className="flex items-center text-sm text-gray-500">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>(123) 456-7890</span>
                </p>
                <p className="flex items-center text-sm text-gray-500">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>info@migimnasio.com</span>
                </p>
                <p className="flex items-center text-sm text-gray-500">
                  <User className="h-5 w-5 mr-2" />
                  <span>Calle Principal 123, Ciudad</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {user && (
          <div className="mt-8 bg-white overflow-hidden shadow-lg rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-indigo-600" />
                <h3 className="ml-3 text-lg leading-6 font-medium text-gray-900" >Actualizar Plan</h3>
              </div>
              <div className="mt-5">
                <p className="text-sm text-gray-500 mb-4">
                  Extiende tu membresía y disfruta de nuestras instalaciones por más tiempo.
                </p>
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Actualizar mi plan
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
