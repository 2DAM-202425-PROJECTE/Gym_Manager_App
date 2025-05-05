
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

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
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
  const mapa: Record<string, Record<string, { clase: Clase; horario: Horario }>> = {}

  // Inicializar el mapa vacío
  diasSemana.forEach((dia) => {
    mapa[dia] = {}
    horas.forEach((hora) => {
      mapa[dia][hora] = null
    })
  })

  // Llenar el mapa con las clases en su día y hora
  clases.forEach((clase) => {
    clase.horarios.forEach((horario) => {
      diasSemana.forEach((dia) => {
        if (horario.dia === dia) {
          horas.forEach((hora) => {
            if (esHoraDentroDeRango(hora, horario.hora_inicio, horario.hora_fin)) {
              mapa[horario.dia][hora] = { clase, horario }
            }
          })
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
                      <div className="bg-blue-500 text-white rounded p-1 text-xs">
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
    </div>
  )
}