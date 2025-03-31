"use client"

import { useState, useEffect, useRef, useContext } from "react"
import { CalendarDays,Clock, CreditCard, LogOut, User, Dumbbell, TrendingUp,  Bell, Volume2,  VolumeX
} from "lucide-react"
import Sidebar from "../components/sidebar/sidebar"
import Footer from "../components/footer/footer"
import { Link } from "react-router"
import HomeButton from "../components/buttons/HomeButton"
import HomeStats from "../components/cards/HomeStats"
import { UserContext } from "../context/userContext"
import { Clase } from "./type/clases"
import { Membresia } from "./type/membresia"

type Workout = {
  id: number
  name: string
  duration: number
  calories: number
  date: Date
}

type Notification = {
  id: number
  message: string
  date: Date
}

export default function Home() {
  const [membresia, setMembresia] = useState<Membresia | null>(null)
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [activeTab, setActiveTab] = useState("today")
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isMuted, setIsMuted] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const notificationRef = useRef<HTMLDivElement>(null)
  const profileMenuRef = useRef<HTMLDivElement>(null)
  const { userContext } = useContext(UserContext)

  const [clases, setClases] = useState<Clase[]>([])
  
  useEffect(() => {

  
    const fetchData = async () => {

      const user = userContext.user
      if (user.clases){
        console.log(user.clases)
        setClases(user.clases)
      } else {
        setClases([])
      }



      const membresiaData: Membresia = {
        id: 1,
        user_id: 1,
        fecha_fin: new Date("2023-12-31"),
        qr_data: "qr-data",
        created_at: new Date(),
        updated_at: new Date(),
      }
      const workoutsData: Workout[] = [
        { id: 1, name: "Cardio", duration: 45, calories: 300, date: new Date("2023-06-01") },
        { id: 2, name: "Fuerza", duration: 60, calories: 250, date: new Date("2023-06-03") },
        { id: 3, name: "Yoga", duration: 75, calories: 180, date: new Date("2023-06-05") },
      ]
      const notificationsData: Notification[] = [
        { id: 1, message: "Nueva clase de Zumba disponible", date: new Date("2023-06-10") },
        { id: 2, message: "Recuerda tu sesión de entrenamiento mañana", date: new Date("2023-06-11") },
        { id: 3, message: "¡Felicidades! Has alcanzado tu meta semanal", date: new Date("2023-06-12") },
      ]
  
      setMembresia(membresiaData)
      setWorkouts(workoutsData)
      setNotifications(notificationsData)
    }
    fetchData()
  }, [userContext.user])

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
  
  console.log(userContext.user)
  if (!userContext.user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
        <p className="text-2xl font-bold text-center text-gray-800">
          Debes iniciar sesión para continuar
        </p>
  
        <Link
          to="/login"
          className="px-6 py-3 text-white text-lg font-semibold rounded-2xl shadow-md transition duration-200"
          style={{ backgroundColor: "#800000" }}
        >
          Iniciar sesión
        </Link>
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
            <h2 className="text-3xl font-semibold text-gray-800">Bienvenido, {userContext?.user.name}</h2>
            {userContext.user && (
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors relative"
                  >
                    <Bell className="h-5 w-5 text-gray-600" />
                    {notifications.length > 0 && (
                      <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        {notifications.length}
                      </span>
                    )}
                  </button>
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
                      <div className="py-2 max-h-64 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div key={notification.id} className="px-4 py-2 hover:bg-gray-100">
                            <p className="text-sm text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.date.toLocaleDateString()}</p>
                          </div>
                        ))}
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
                      src={userContext.user.profile_photo_url || "/placeholder.svg"}
                      alt={userContext.user.name}
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
                          Membresía: {"oro"}
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <CalendarDays className="inline-block w-4 h-4 mr-2" />
                          Miembro desde: {userContext.user.created_at}
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <TrendingUp className="inline-block w-4 h-4 mr-2" />
                          Total de visitas: {"no se"}
                        </a>
                        <Link
                          to={"/login"}
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <LogOut className="inline-block w-4 h-4 mr-2" />
                          Cerrar sesión
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </header>

          {/* Membership Status */}
          { membresia && (
            <div className="mb-8 bg-gradient-to-r from-[#800000]  to-[#560000] rounded-xl text-white shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Estado de Membresía</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">{userContext.user.membresia?.fecha_fin ? calculateRemainingDays(new Date(userContext.user.membresia.fecha_fin)) : "N/A"}</p>
                  <p className="text-sm opacity-80">días restantes</p>
                </div>
                <div className="w-1/2">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full"
                      style={{ width: `${(calculateRemainingDays(membresia.fecha_fin) / 365) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-2 text-right opacity-80">
                    Vence: {membresia.fecha_fin.toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <HomeStats></HomeStats>

          {/* Workout History and Upcoming Classes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Workout History */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Historial de Entrenamientos</h3>
              <div className="space-y-4">
                {workouts.map((workout) => (
                  <div key={workout.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                    <div className="flex items-center">
                      <Dumbbell className="h-5 w-5 text-maroon-600 mr-3" />
                      <div>
                        <p className="font-medium">{workout.name}</p>
                        <p className="text-sm text-gray-500">{workout.date.toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{workout.duration} min</p>
                      <p className="text-sm text-gray-500">{workout.calories} cal</p>
                    </div>
                  </div>
                ))}
              </div>
              <HomeButton text="Ver todo el historial"></HomeButton>
            </div>

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

