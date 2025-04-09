"use client"

import { useState, useEffect } from "react"
import { Star, Calendar, Dumbbell, Clock, X, Phone, Mail } from "lucide-react"
import Sidebar from "../../components/sidebar/sidebar"
import Footer from "../../components/footer/footer"
import apiClient from "../../api/prefijo"
import type { User } from "../type/user"
import TrainerInfoModal from "../../components/modals/TrainerInfoModal"

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<User[]>([])
  const [selectedTrainer, setSelectedTrainer] = useState<User | null>(null)

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
        <TrainerInfoModal trainer={selectedTrainer} onClose={closeTrainerInfo} />
      )}

      {/* Footer */}
      <Footer></Footer>
    </div>
  )
}

