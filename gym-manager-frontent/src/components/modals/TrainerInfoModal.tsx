import { useState } from "react"
import { X, Dumbbell, Calendar, Mail, Star } from "lucide-react"
import { Entrenador } from "../../pages/type/entrenadors"
import apiClient from "../../api/prefijo"
import { toast } from "react-toastify"

interface TrainerInfoModalProps {
  trainer: Entrenador
  onClose: () => void
}

export default function TrainerInfoModal({ trainer, onClose }: TrainerInfoModalProps) {
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [rating, setRating] = useState(0)  // Estado para la valoración

  const handleStarClick = (star: number) => {
    setRating(star)
  }

  const handleSubmitRating = async () => {
    try {
      const response = await apiClient.post("/valorar", {
        entrenador_id: trainer.id,
        puntuacion: rating,
      });
      
      console.log(response);
      toast.success("Valoración enviada");
      
      setShowRatingModal(false);
     
    } catch (error) {
        toast.error(error.response.data.message)
      }
    
  };
  
  const averageRating = Math.floor(trainer.valoracion_media); // Redondear hacia abajo la valoración media

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={"/src/assets/pingu.png"}
            alt={`${trainer.user.name}`}
            className="w-full h-64 object-cover rounded-t-xl"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            <X className="h-6 w-6 text-maroon-600" />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-maroon-600 mb-2">{trainer.user.name}</h2>
          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-5 w-5 ${star <= averageRating ? "fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {trainer.valoracion_media.toFixed(1)} ({trainer.valoracion_media > 0 ? "Valoraciones disponibles" : "Sin valoraciones"})
            </span>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-700">
              {trainer.user.name ||
                "Entrenador profesional con experiencia en fitness y nutrición. Especializado en entrenamiento personalizado y preparación física."}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Dumbbell className="h-5 w-5 text-maroon-600 mr-2" />
                <span className="text-gray-700">{trainer.especialidad || "Especialidad no especificada"}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-maroon-600 mr-2" />
                <span className="text-gray-700">Experiencia: {trainer.experiencia} años</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-maroon-600 mr-2" />
                <span className="text-gray-700">{trainer.user.email}</span>
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
              {trainer.disponibilidad.length > 0 ? (
                trainer.disponibilidad.map((horario, index) => (
                  <p key={index} className="text-gray-600">{horario}</p>
                ))
              ) : (
                <p className="text-gray-600">No hay horarios disponibles.</p>
              )}
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowRatingModal(true)}  // Mostrar modal de valoración
              className="flex-1 py-2 px-4 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors flex items-center justify-center"
            >
              <Star className="h-5 w-5 mr-2" />
                Valorar
            </button>
          </div>
        </div>
      </div>

      {/* Modal de valoración */}
      {showRatingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-1/3 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Selecciona tu valoración</h3>
            <div className="flex text-yellow-400 mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer ${star <= rating ? "fill-current" : "text-gray-300"}`}
                  onClick={() => handleStarClick(star)}  // Maneja el clic en las estrellas
                />
              ))}
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setShowRatingModal(false)}  // Cerrar modal de valoración sin guardar
                className="py-2 px-4 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmitRating}  // Enviar la valoración
                className="py-2 px-4 bg-maroon-600 text-white rounded hover:bg-maroon-700"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
