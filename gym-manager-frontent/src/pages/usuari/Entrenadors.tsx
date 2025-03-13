"use client"

import { useState, useEffect } from "react"
import { Star, Calendar, Dumbbell, Clock, X, Phone, Mail } from "lucide-react"
import { useLocation } from "react-router-dom"
import Sidebar from "../../components/sidebar/sidebar"
import Footer from "../../components/footer/footer"
import apiClient from "../../api/prefijo"
import type { User } from "../type/user"

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<User[]>([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [selectedTrainer, setSelectedTrainer] = useState<User | null>(null)
  const location = useLocation()

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await apiClient.get("/users")
        console.log(response.data)
        setTrainers(response.data.filter((user: User) => user.role == "trainer"))
      } catch (error) {
        console.error("Error fetching trainers:", error)
      }
    }
    fetchTrainers()
  }, [])

  const openTrainerInfo = (trainer: User) => {
    setSelectedTrainer(trainer)
    // Add overflow hidden to body when modal is open
    document.body.style.overflow = "hidden"
  }

  const closeTrainerInfo = () => {
    setSelectedTrainer(null)
    // Restore body overflow when modal is closed
    document.body.style.overflow = "auto"
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar></Sidebar>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Trainers Content */}
          <div className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Nuestros Entrenadores</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trainers.map((trainer) => (
                <div
                  key={trainer.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                >
                  <img
                    src={trainer.profile_photo_url || "/placeholder.svg?height=192&width=384"}
                    alt={`${trainer.name}`}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-maroon-600 mb-2">{trainer.name}</h3>
                    <p className="text-gray-600 mb-4">{trainer.email}</p>

                    <button
                      onClick={() => openTrainerInfo(trainer)}
                      className="w-full py-2 px-4 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors"
                    >
                      Informacio
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Trainer Info Modal */}
      {selectedTrainer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedTrainer.profile_photo_url || "/placeholder.svg?height=300&width=600"}
                alt={`${selectedTrainer.name}`}
                className="w-full h-64 object-cover rounded-t-xl"
              />
              <button
                onClick={closeTrainerInfo}
                className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              >
                <X className="h-6 w-6 text-maroon-600" />
              </button>
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-bold text-maroon-600 mb-2">{selectedTrainer.name}</h2>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">5.0 (24 reseñas)</span>
              </div>

              <div className="space-y-4 mb-6">
                <p className="text-gray-700">
                  {selectedTrainer.bio ||
                    "Entrenador profesional con experiencia en fitness y nutrición. Especializado en entrenamiento personalizado y preparación física."}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Dumbbell className="h-5 w-5 text-maroon-600 mr-2" />
                    <span className="text-gray-700">Especialidad: Fitness funcional</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-maroon-600 mr-2" />
                    <span className="text-gray-700">Experiencia: 5 años</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-maroon-600 mr-2" />
                    <span className="text-gray-700">Disponibilidad: Lun-Vie</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-maroon-600 mr-2" />
                    <span className="text-gray-700">{selectedTrainer.email}</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Certificaciones</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4">
                  <li>Certificado en Entrenamiento Personal</li>
                  <li>Especialista en Nutrición Deportiva</li>
                  <li>Instructor de Fitness Funcional</li>
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Horarios Disponibles</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"].map((day) => (
                    <div key={day} className="bg-gray-100 rounded p-2">
                      <p className="font-medium text-gray-800">{day}</p>
                      <p className="text-sm text-gray-600">8:00 - 20:00</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-2 px-4 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Contactar
                </button>
                <button className="flex-1 py-2 px-4 border border-maroon-600 text-maroon-600 rounded hover:bg-maroon-50 transition-colors flex items-center justify-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Reservar Sesión
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer></Footer>
    </div>
  )
}

