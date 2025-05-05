"use client"

import { useState } from "react"

type Horario = {
  id: number
  clase_id: number
  dia: string
  hora_inicio: string
  hora_fin: string
  created_at: string
  updated_at: string
}

type Clase = {
  id: number
  nombre: string
  descripcion: string
  id_entrenador: number
  maximo_participantes: number
  created_at: string
  updated_at: string
  total_participantes: number
  horarios: Horario[]
}

type Props = {
  clases: Clase[]
}

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sabado", "Domingo"]
const horas = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00"
]

function normalizarHora(hora: string) {
  if (hora.length === 4 && !hora.includes(':')) {
    return `${hora.slice(0, 2)}:${hora.slice(2)}`
  }
  return hora
}

function compararHoras(h1: string, h2: string) {
  const hora1 = normalizarHora(h1)
  const hora2 = normalizarHora(h2)
  return hora1.localeCompare(hora2)
}

function esHoraDentroDeRango(hora: string, inicio: string, fin: string) {
  const h = normalizarHora(hora)
  const i = normalizarHora(inicio)
  const f = normalizarHora(fin)
  return compararHoras(h, i) >= 0 && compararHoras(h, f) < 0
}

function contarHoras(horaInicio: string, horaFin: string) {
  const inicio = normalizarHora(horaInicio)
  const fin = normalizarHora(horaFin)
  
  const [h1] = inicio.split(":").map(Number)
  const [h2] = fin.split(":").map(Number)
  return h2 - h1
}

export default function HorarioRectangular({ clases }: Props) {
  const [selectedClase, setSelectedClase] = useState<Clase | null>(null)
  const [selectedHorario, setSelectedHorario] = useState<Horario | null>(null)

  const abrirPopup = (clase: Clase, horario: Horario) => {
    setSelectedClase(clase)
    setSelectedHorario(horario)
  }

  const cerrarPopup = () => {
    setSelectedClase(null)
    setSelectedHorario(null)
  }

  // Crear una estructura para almacenar la información
  const mapa: Record<string, Record<string, { clase: Clase; horario: Horario }[]>> = {}
  const horariosRenderizados = new Set<string>()

  // Inicializar mapa para cada día y cada hora
  diasSemana.forEach((dia) => {
    mapa[dia] = {}
    horas.forEach((hora) => {
      mapa[dia][hora] = []
    })
  })

  // Asignar las clases a sus respectivos días y horas
  clases.forEach((clase) => {
    clase.horarios.forEach((horario) => {
      if (!diasSemana.includes(horario.dia)) return
      
      horas.forEach((hora) => {
        if (esHoraDentroDeRango(hora, horario.hora_inicio, horario.hora_fin)) {
          mapa[horario.dia][hora].push({ clase, horario })
        }
      })
    })
  })

  // Función para generar un ID único para cada horario
  const getHorarioId = (dia: string, horaInicio: string) => {
    return `${dia}-${normalizarHora(horaInicio)}`
  }

  return (
    <div className="overflow-auto p-4">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            <th className="bg-zinc-100 text-zinc-700 px-3 py-2 text-left w-20">Hora</th>
            {diasSemana.map((dia) => (
              <th key={dia} className="bg-zinc-100 text-center px-3 py-2 text-zinc-700">{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horas.map((hora) => (
            <tr key={hora}>
              <td className="bg-zinc-50 text-center border px-2 py-2">{hora}</td>
              {diasSemana.map((dia) => {
                const slots = mapa[dia][hora]
                
                // Si no hay clases en este slot, retornar celda vacía
                if (slots.length === 0) {
                  return <td key={`${dia}-${hora}`} className="border h-16 text-center" />
                }

                // Buscar el primer slot que no haya sido renderizado aún
                const slot = slots.find(s => {
                  const horarioId = getHorarioId(dia, s.horario.hora_inicio)
                  return !horariosRenderizados.has(horarioId)
                })

                if (!slot) {
                  return <td key={`${dia}-${hora}`} className="border h-16 text-center" />
                }

                const duracion = contarHoras(slot.horario.hora_inicio, slot.horario.hora_fin)
                const horarioId = getHorarioId(dia, slot.horario.hora_inicio)
                horariosRenderizados.add(horarioId)

                return (
                  <td
                    key={`${dia}-${hora}-${horarioId}`}
                    rowSpan={duracion}
                    className="border relative p-0"
                  >
                    <div
                      onClick={() => abrirPopup(slot.clase, slot.horario)}
                      className="absolute inset-0 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs p-2 cursor-pointer shadow-md transition-all flex flex-col justify-center items-center"
                    >
                      <strong className="text-sm">{slot.clase.nombre}</strong>
                      <span>
                        {normalizarHora(slot.horario.hora_inicio)} - {normalizarHora(slot.horario.hora_fin)}
                      </span>
                    </div>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup */}
      {selectedClase && selectedHorario && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-sm w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
              onClick={cerrarPopup}
            >
              ✕
            </button>
            <h2 className="text-lg font-semibold mb-1">{selectedClase.nombre}</h2>
            <p className="text-sm text-gray-700 mb-2">{selectedClase.descripcion}</p>
            <p className="text-sm"><strong>Día:</strong> {selectedHorario.dia}</p>
            <p className="text-sm"><strong>Hora:</strong> {normalizarHora(selectedHorario.hora_inicio)} - {normalizarHora(selectedHorario.hora_fin)}</p>
            <p className="text-sm"><strong>Participantes:</strong> {selectedClase.total_participantes}/{selectedClase.maximo_participantes}</p>
          </div>
        </div>
      )}
    </div>
  )
}