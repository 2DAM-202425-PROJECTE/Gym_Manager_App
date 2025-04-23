import { Calendar, Users } from "lucide-react";
import { Clase } from "../../type/clases";
import { countPersonsClases } from "../../utils/countPersonsClases";


interface StatsEntrenadorProps {
  clases: Clase[];

}

export default function StatsEntrenador({ clases }: StatsEntrenadorProps) {
  console.log(clases);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
      </div>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Total de Alumnos</p>
            <p className="text-3xl font-bold text-gray-700">{countPersonsClases(clases)}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}