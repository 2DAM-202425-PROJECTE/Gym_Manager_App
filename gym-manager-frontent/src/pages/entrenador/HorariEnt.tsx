import { ChevronLeft, ChevronRight } from "lucide-react";

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

interface HorarioEntProps {
  clases: Clase[];
  diasSemana: string[];
  horasDia: string[];
  currentWeek: number;
  selectedDay: string | null;
  setSelectedDay: (day: string | null) => void;
  handlePrevWeek: () => void;
  handleNextWeek: () => void;
}

export default function HorarioEnt({
  clases,
  diasSemana,
  horasDia,
  currentWeek,
  selectedDay,
  setSelectedDay,
  handlePrevWeek,
  handleNextWeek,
}: HorarioEntProps) {
  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevWeek}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h3 className="text-xl font-semibold">
            {currentWeek === 0
              ? "Esta Semana"
              : currentWeek < 0
              ? `Hace ${Math.abs(currentWeek)} ${
                  Math.abs(currentWeek) === 1 ? "semana" : "semanas"
                }`
              : `En ${currentWeek} ${
                  currentWeek === 1 ? "semana" : "semanas"
                }`}
          </h3>
          <button
            onClick={handleNextWeek}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-max">
            <thead>
              <tr>
                <th className="p-2 border-b"></th>
                {diasSemana.map((dia) => (
                  <th key={dia} className="p-2 border-b text-center">
                    <button
                      className={`px-3 py-1 rounded-full ${
                        selectedDay === dia
                          ? "bg-maroon-600 text-white"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() =>
                        setSelectedDay(selectedDay === dia ? null : dia)
                      }
                    >
                      {dia}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {horasDia.map((hora) => (
                <tr key={hora} className="border-b last:border-b-0">
                  <td className="p-2 text-center font-medium text-gray-500">
                    {hora}
                  </td>
                  {diasSemana.map((dia) => {
                    const clasesEnHora = clases.filter(
                      (c) => c.dia === dia && c.hora === hora
                    );
                    return (
                      <td key={`${dia}-${hora}`} className="p-2 border-l">
                        {clasesEnHora.length > 0 ? (
                          <div className="bg-maroon-100 text-maroon-800 p-2 rounded cursor-pointer hover:bg-maroon-200 transition-colors">
                            <div className="font-medium">
                              {clasesEnHora[0].nombre}
                            </div>
                            <div className="text-xs">{clasesEnHora[0].sala}</div>
                            <div className="text-xs mt-1">
                              {clasesEnHora[0].inscritos}/
                              {clasesEnHora[0].capacidad} alumnos
                            </div>
                          </div>
                        ) : (
                          <div className="h-full w-full min-h-[60px] flex items-center justify-center text-gray-400 text-sm">
                            -
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}