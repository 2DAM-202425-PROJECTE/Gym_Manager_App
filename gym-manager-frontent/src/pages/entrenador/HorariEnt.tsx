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

function compararHoras(h1: string, h2: string) {
  return h1.localeCompare(h2)
}

function esHoraDentroDeRango(hora: string, inicio: string, fin: string) {
  return compararHoras(hora, inicio) >= 0 && compararHoras(hora, fin) < 0
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

  const mapa: Record<string, Record<string, { clase: Clase; horario: Horario } | null>> = {}

  diasSemana.forEach((dia) => {
    mapa[dia] = {}
    horas.forEach((hora) => {
      mapa[dia][hora] = null
    })
  })

  clases.forEach((clase) => {
    clase.horarios.forEach((horario) => {
      if (!diasSemana.includes(horario.dia)) return
      horas.forEach((hora) => {
        if (esHoraDentroDeRango(hora, horario.hora_inicio, horario.hora_fin)) {
          mapa[horario.dia][hora] = { clase, horario }
        }
      })
    })
  })

  return (
    <div className="overflow-auto p-4">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-200 w-24">Hora</th>
            {diasSemana.map((dia) => (
              <th key={dia} className="border px-4 py-2 bg-gray-200 text-center">{dia}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {horas.map((hora) => (
            <tr key={hora}>
              <td className="border px-2 py-2 text-sm bg-gray-100 text-center">{hora}</td>
              {diasSemana.map((dia) => {
                const slot = mapa[dia][hora]
                return (
                  <td key={dia + hora} className="border h-16 text-center align-middle">
                    {slot ? (
                      <div
                        onClick={() => abrirPopup(slot.clase, slot.horario)}
                        className="bg-blue-500 text-white rounded p-1 text-xs cursor-pointer hover:bg-blue-600 transition"
                      >
                        <strong>{slot.clase.nombre}</strong><br />
                        {slot.horario.hora_inicio} - {slot.horario.hora_fin}
                      </div>
                    ) : null}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup */}
      {selectedClase && selectedHorario && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={cerrarPopup}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-2">{selectedClase.nombre}</h2>
            <p className="text-sm text-gray-700 mb-2">{selectedClase.descripcion}</p>
            <p className="text-sm mb-1"><strong>Día:</strong> {selectedHorario.dia}</p>
            <p className="text-sm mb-1"><strong>Hora:</strong> {selectedHorario.hora_inicio} - {selectedHorario.hora_fin}</p>
            <p className="text-sm mb-1"><strong>Participantes:</strong> {selectedClase.total_participantes}/{selectedClase.maximo_participantes}</p>
            <p className="text-xs text-gray-500 mt-4">Clase ID: {selectedClase.id}</p>
          </div>
        </div>
      )}
    </div>
  )
}
