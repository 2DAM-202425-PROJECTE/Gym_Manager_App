import { Plus } from "lucide-react";

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

interface ClasesEntProps {
  clases: Clase[];
  diasSemana: string[];
  getClasesPorDia: (dia: string) => Clase[];
}

export default function ClasesEnt({ clases, diasSemana, getClasesPorDia }: ClasesEntProps) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Mis Clases</h3>
          <button className="bg-maroon-600 text-white py-2 px-4 rounded hover:bg-maroon-700 transition-colors flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Nueva Clase
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Clase</th>
                <th className="p-2 text-left">Día</th>
                <th className="p-2 text-left">Hora</th>
                <th className="p-2 text-left">Duración</th>
                <th className="p-2 text-left">Sala</th>
                <th className="p-2 text-left">Ocupación</th>
              </tr>
            </thead>
            <tbody>
              {clases.map((clase) => (
                <tr key={clase.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-medium">{clase.nombre}</td>
                  <td className="p-2">{clase.dia}</td>
                  <td className="p-2">{clase.hora}</td>
                  <td className="p-2">{clase.duracion} min</td>
                  <td className="p-2">{clase.sala}</td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className="h-full bg-maroon-600 rounded-full"
                          style={{ width: `${(clase.inscritos / clase.capacidad) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{clase.inscritos}/{clase.capacidad}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Distribución por Día</h3>
          <div className="space-y-4">
            {diasSemana.map((dia) => {
              const clasesDelDia = getClasesPorDia(dia);
              return (
                <div key={dia} className="flex items-center">
                  <div className="w-24 text-sm font-medium">{dia}</div>
                  <div className="flex-1">
                    <div className="w-full h-4 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-maroon-600 rounded-full"
                        style={{ width: `${(clasesDelDia.length / clases.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm font-medium">{clasesDelDia.length}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Alumnos por Clase</h3>
          <div className="space-y-4">
            {clases.slice(0, 5).map((clase) => (
              <div key={clase.id} className="flex items-center">
                <div className="w-24 text-sm font-medium truncate">{clase.nombre}</div>
                <div className="flex-1">
                  <div className="w-full h-4 bg-gray-200 rounded-full">
                    <div
                      className="h-full bg-maroon-600 rounded-full"
                      style={{ width: `${(clase.inscritos / clase.capacidad) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-right text-sm font-medium">{clase.inscritos}/{clase.capacidad}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}