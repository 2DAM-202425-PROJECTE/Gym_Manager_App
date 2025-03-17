import { Star } from "lucide-react";

type Resena = {
  id: number;
  usuario: string;
  puntuacion: number;
  comentario: string;
  fecha: Date;
  avatar: string;
};

interface ResenasEntProps {
  resenas: Resena[];
  renderStars: (puntuacion: number) => JSX.Element[];
}

export default function ResenasEnt({ resenas, renderStars }: ResenasEntProps) {
    function setActiveTab(arg0: string): void {
        throw new Error("Function not implemented.");
    }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Reseñas de Alumnos</h3>
          <div className="flex items-center bg-gray-100 rounded-full p-1">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star key={num} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
              ))}
              <span className="ml-2 font-medium">4.7</span>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          {resenas.map((resena) => (
            <div key={resena.id} className="py-2 border-b last:border-b-0">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-300 mr-2 overflow-hidden">
                  <img
                    src={resena.avatar || "/placeholder.svg"}
                    alt={resena.usuario}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">{resena.usuario}</p>
                  <div className="flex">{renderStars(resena.puntuacion)}</div>
                </div>
                <p className="text-xs text-gray-500 ml-auto">{resena.fecha.toLocaleDateString()}</p>
              </div>
              <p className="text-sm text-gray-700">{resena.comentario}</p>
            </div>
          ))}
        </div>
        <button
          className="w-full mt-4 py-2 px-4 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors"
          onClick={() => setActiveTab("resenas")}
        >
          Ver todas las reseñas
        </button>
      </div>
    </div>
  );
}