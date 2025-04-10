import { X, Star, Dumbbell, Calendar, Clock, Mail, Phone } from "lucide-react"
import { Entrenador } from "../../pages/type/entrenadors"

interface TrainerInfoModalProps {
  trainer: Entrenador
  onClose: () => void
}

export default function TrainerInfoModal({ trainer, onClose }: TrainerInfoModalProps) {
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
                <Star key={star} className="h-5 w-5 fill-current" />
              ))}
            </div>
          {/**  <span className="ml-2 text-gray-600">5.0 (24 reseñas)</span> */}
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
             <p className="text-gray-600">No hay horarios disponibles.</p>
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
  )
}