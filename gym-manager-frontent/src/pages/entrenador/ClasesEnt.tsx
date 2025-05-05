"use client"

import type { Clase } from "../types/clases"

interface ClasesEntProps {
  clases: Clase[]
}

export default function ClasesEnt({ clases }: ClasesEntProps) {
  // Días de la semana para mostrar en la distribución
  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

  // Función para obtener las clases por día
  const getClasesPorDia = (dia: string) => {
    return clases.filter((clase) => clase.horarios.some((horario) => horario.dia.toLowerCase() === dia.toLowerCase()))
  }

  // Función para formatear la hora
  const formatHora = (hora: string) => {
    return hora.substring(0, 5) // Obtiene solo HH:MM
  }

  // Función para calcular la duración en minutos
  const calcularDuracion = (horaInicio: string, horaFin: string) => {
    const inicio = new Date(`2000-01-01T${horaInicio}`)
    const fin = new Date(`2000-01-01T${horaFin}`)
    const duracionMs = fin.getTime() - inicio.getTime()
    return Math.round(duracionMs / 60000) // Convertir a minutos
  }

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Mis Clases</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Clase</th>
                <th className="p-2 text-left">Día</th>
                <th className="p-2 text-left">Hora</th>
                <th className="p-2 text-left">Duración</th>
                <th className="p-2 text-left">Ocupación</th>
              </tr>
            </thead>
            <tbody>
              {clases.flatMap((clase) =>
                clase.horarios.map((horario) => (
                  <tr key={`${clase.id}-${horario.id}`} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-medium">{clase.nombre}</td>
                    <td className="p-2">{horario.dia}</td>
                    <td className="p-2">{formatHora(horario.hora_inicio)}</td>
                    <td className="p-2">{calcularDuracion(horario.hora_inicio, horario.hora_fin)} min</td>
                    <td className="p-2">
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-gray-200 rounded-full mr-2">
                          <div
                            className="h-full bg-maroon-600 rounded-full"
                            style={{ width: `${(clase.total_participantes / clase.maximo_participantes) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm">
                          {clase.total_participantes}/{clase.maximo_participantes}
                        </span>
                      </div>
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">Distribución por Día</h3>
          <div className="space-y-4">
            {diasSemana.map((dia) => {
              const clasesDelDia = getClasesPorDia(dia)
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
              )
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
                      style={{ width: `${(clase.total_participantes / clase.maximo_participantes) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-right text-sm font-medium">
                  {clase.total_participantes}/{clase.maximo_participantes}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
