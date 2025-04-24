import { useState, useMemo } from "react"
import { format, parse, addMinutes } from "date-fns"
import { Clase } from "../../type/clases"

interface WeeklyClassScheduleProps {
  classes: Clase[]
}

// Map Spanish day names to English for sorting
const dayOrder = {
  lunes: 0,
  martes: 1,
  miércoles: 2,
  jueves: 3,
  viernes: 4,
  sábado: 5,
  domingo: 6,
}

// Time slot interval in minutes
const TIME_SLOT_INTERVAL = 30

export default function HorarioEnt({ classes }: WeeklyClassScheduleProps) {
  const [hoveredClass, setHoveredClass] = useState<Clase | null>(null)

  // Process the data to organize classes by day and time
  const { timeSlots, classesByDayAndTime, days } = useMemo(() => {
    // Extract all unique days from classes
    const uniqueDays = Array.from(
      new Set(
        classes.flatMap((clase) =>
          Array.isArray(clase.horarios) ? clase.horarios.map((h) => h.dia) : []
        )
      )
    ).sort((a, b) => dayOrder[a.toLowerCase()] - dayOrder[b.toLowerCase()])
    
    // Find earliest and latest times across all classes
    let earliestTime = "23:59"
    let latestTime = "00:00"

    classes.forEach((clase) => {
      clase.horarios.forEach((horario) => {
        if (horario.hora_inicio < earliestTime) earliestTime = horario.hora_inicio
        if (horario.hora_fin > latestTime) latestTime = horario.hora_fin
      })
    })

    // Generate time slots from earliest to latest in 30-minute intervals
    const startTime = parse(earliestTime, "HH:mm", new Date())
    const endTime = parse(latestTime, "HH:mm", new Date())

    const slots = []
    let currentTime = startTime

    while (currentTime <= endTime) {
      slots.push(format(currentTime, "HH:mm"))
      currentTime = addMinutes(currentTime, TIME_SLOT_INTERVAL)
    }

    // Organize classes by day and time
    const classesByDayAndTime: Record<string, Record<string, Clase[]>> = {}

    uniqueDays.forEach((day) => {
      classesByDayAndTime[day] = {}
      slots.forEach((slot) => {
        classesByDayAndTime[day][slot] = []
      })
    })

    classes.forEach((clase) => {
      clase.horarios.forEach((horario) => {
        const startTimeStr = horario.hora_inicio
        const endTimeStr = horario.hora_fin

        // Find all slots that this class spans
        const classStartTime = parse(startTimeStr, "HH:mm", new Date())
        const classEndTime = parse(endTimeStr, "HH:mm", new Date())

        slots.forEach((slot) => {
          const slotTime = parse(slot, "HH:mm", new Date())
          if (slotTime >= classStartTime && slotTime < classEndTime) {
            if (!classesByDayAndTime[horario.dia][slot]) {
              classesByDayAndTime[horario.dia][slot] = []
            }

            // Only add the class if it's not already in this slot
            const alreadyAdded = classesByDayAndTime[horario.dia][slot].some((c) => c.id === clase.id)
            if (!alreadyAdded) {
              classesByDayAndTime[horario.dia][slot].push({
                ...clase,
                horarios: [horario], // Include only the relevant horario
              })
            }
          }
        })
      })
    })

    return {
      timeSlots: slots,
      classesByDayAndTime,
      days: uniqueDays,
    }
  }, [classes])

  // Format day name for display
  const formatDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1)
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 min-w-[80px]">Hora</th>
            {days.map((day) => (
              <th key={day} className="border p-2 min-w-[150px]">
                {formatDayName(day)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((timeSlot, index) => (
            <tr key={timeSlot} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border p-2 text-center font-medium">{timeSlot}</td>
              {days.map((day) => {
                const classesInSlot = classesByDayAndTime[day]?.[timeSlot] || []

                return (
                  <td key={`${day}-${timeSlot}`} className="border p-1 relative">
                    {classesInSlot.map((clase) => {
                      // Check if this is the first slot for this class in this day
                      const horario = clase.horarios[0]
                      const isFirstSlot = horario.hora_inicio === timeSlot

                      // Only render the class card on the first slot it appears in
                      if (!isFirstSlot) return null

                      // Calculate how many slots this class spans
                      const startTime = parse(horario.hora_inicio, "HH:mm", new Date())
                      const endTime = parse(horario.hora_fin, "HH:mm", new Date())
                      const durationMinutes = (endTime.getTime() - startTime.getTime()) / (1000 * 60)
                      const rowSpan = Math.ceil(durationMinutes / TIME_SLOT_INTERVAL)

                      return (
                        <div
                          key={clase.id}
                          className={`
                            p-1 rounded text-xs mb-1 cursor-pointer
                            ${hoveredClass?.id === clase.id ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-800"}
                            transition-colors duration-200
                          `}
                          onMouseEnter={() => setHoveredClass(clase)}
                          onMouseLeave={() => setHoveredClass(null)}
                        >
                          <div className="font-bold">{clase.nombre}</div>
                          <div className="text-xs">
                            {horario.hora_inicio} - {horario.hora_fin}
                          </div>
                          <div className="text-xs truncate">{clase.entrenador?.name || "Sin entrenador"}</div>
                          <div className="text-xs">
                            {clase.total_participantes}/{clase.maximo_participantes} participantes
                          </div>
                        </div>
                      )
                    })}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Class details popup when hovering */}
      {hoveredClass && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 max-w-sm border border-gray-200 z-10">
          <h3 className="font-bold text-lg">{hoveredClass.nombre}</h3>
          <p className="text-sm text-gray-600 mt-1">{hoveredClass.descripcion}</p>
          <div className="mt-2">
            <p className="text-sm">
              <span className="font-medium">Entrenador:</span> {hoveredClass.entrenador?.name || "Sin entrenador"}
            </p>
            <p className="text-sm">
              <span className="font-medium">Participantes:</span> {hoveredClass.total_participantes}/
              {hoveredClass.maximo_participantes}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
