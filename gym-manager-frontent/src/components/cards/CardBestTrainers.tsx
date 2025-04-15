"use client"

import { useEffect, useState } from "react"
import apiClient from "../../api/prefijo"
import type { Entrenador } from "../../type/entrenadors"
import { getInitials } from "../../utils/getInitials"

export default function CardBestTrainers() {
  const [trainers, setTrainers] = useState<Entrenador[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    apiClient
      .get("/alltrainers")
      .then((response) => {
        const sortedTrainers = response.data
          .sort((a: Entrenador, b: Entrenador) => b.valoracion_media - a.valoracion_media)
          .slice(0, 3)
        setTrainers(sortedTrainers)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching trainers:", error)
        setIsLoading(false)
      })
  }, [])

  // Función para obtener las iniciales del nombre


  // Función para renderizar estrellas según la valoración
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-4 h-4 ${star <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
        <span className="ml-2 font-semibold">{rating.toFixed(1)}</span>
      </div>
    )
  }

  // Función para obtener el icono según la posición
  const getRankIcon = (index: number) => {
    if (index === 0) {
      return (
        <div className="text-yellow-500 font-bold text-lg bg-yellow-100 rounded-full w-8 h-8 flex items-center justify-center">
          1º
        </div>
      )
    } else if (index === 1) {
      return (
        <div className="text-gray-500 font-bold text-lg bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center">
          2º
        </div>
      )
    } else {
      return (
        <div className="text-amber-700 font-bold text-lg bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center">
          3º
        </div>
      )
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="bg-white p-2 rounded-xl w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-8">Nuestros Mejores Entrenadores</h2>

      <div className=" grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainers.map((trainer, index) => (
          <div
            key={trainer.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg 
              border border-gray-200`
            }
          >
            <div className="absolute top-2 right-2">{getRankIcon(index)}</div>

            <div className="p-6">
              <div className="flex flex-col items-center">
                {/* Avatar con iniciales */}
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold border-2 border-blue-500">
                  {getInitials(trainer.user.name)}
                </div>

                <h3 className="mt-3 text-xl font-semibold text-center">{trainer.user.name || "Entrenador"}</h3>
              </div>

              <div className="text-center mt-4">
                <div className="inline-block px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800 mb-3">
                  {trainer.especialidad}
                </div>

                <div className="flex justify-center items-center gap-1 mb-2">
                  {renderStars(trainer.valoracion_media)}
                </div>

                <p className="text-sm text-gray-600 mt-3">{trainer.phone_number}</p>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
