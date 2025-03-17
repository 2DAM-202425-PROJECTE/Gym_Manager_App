import { Calendar, Users, BarChart2 } from "lucide-react";

type Clase = {
  id: number;
  nombre: string;
  dia: string;
  hora: string;
  duracion: number;
  capacidad: number;
  inscritos: number;
  sala: string;
};

interface StatsEntrenadorProps {
  clases: Clase[];
  getTotalInscritos: () => number;
  getPorcentajeOcupacion: () => number;
}

export default function StatsEntrenador({ clases, getTotalInscritos, getPorcentajeOcupacion }: StatsEntrenadorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total de Clases</p>
            <p className="text-3xl font-bold text-gray-700">{clases.length}</p>
          </div>
          <div className="bg-maroon-100 p-3 rounded-full">
            <Calendar className="h-6 w-6 text-maroon-600" />
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">Esta semana</p>
      </div>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total de Alumnos</p>
            <p className="text-3xl font-bold text-gray-700">{getTotalInscritos()}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <p className="text-sm text-blue-600 mt-2">↑ 8% vs. semana pasada</p>
      </div>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Ocupación Media</p>
            <p className="text-3xl font-bold text-gray-700">{getPorcentajeOcupacion()}%</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <BarChart2 className="h-6 w-6 text-green-600" />
          </div>
        </div>
        <p className="text-sm text-green-600 mt-2">↑ 5% vs. mes pasado</p>
      </div>
    </div>
  );
}