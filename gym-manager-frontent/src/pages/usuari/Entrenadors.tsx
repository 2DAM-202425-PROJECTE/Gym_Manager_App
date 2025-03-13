import { useState, useEffect } from "react"
import { Star, Calendar, Dumbbell, Bell, LogOut, Clock } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import Sidebar from "../../components/sidebar/sidebar"
import Footer from "../../components/footer/footer"
import apiClient from "../../api/prefijo"
import { User } from "../type/user"


export default function TrainersPage() {
  const [trainers, setTrainers] = useState<User[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const location = useLocation()


  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await apiClient.get("/users")
        console.log(response.data)
        
        setTrainers(response.data.filter((user: User) => user.role === "trainer"))
      } catch (error) {
        console.error("Error fetching trainers:", error)
      }
    }
    fetchTrainers()
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar></Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
    

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
                    
                    alt={trainer.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-maroon-600 mb-2">{trainer.name}</h3>
                    <p className="text-gray-600 mb-4">{trainer.email}</p>
                   
                    <div className="flex items-center text-gray-600 mb-4">
                      <Clock className="h-5 w-5 mr-2" />
                      <span>{trainer.email} años de experiencia</span>
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
      <Footer></Footer>
    </div>
  )
}