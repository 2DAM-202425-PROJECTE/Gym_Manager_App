
interface MembershipStatusProps {
  membresia: {
    fecha_inicio: Date
    fecha_fin: Date
  }
  calculateRemainingDays: (endDate: Date) => number
}

export default function MembershipStatus({ membresia, calculateRemainingDays }: MembershipStatusProps) {
  const hoy = new Date()
  const fechaInicio = new Date(membresia.fecha_inicio)
  const fechaFin = new Date(membresia.fecha_fin)

  // Cálculo de días totales y días restantes
  const totalDias = Math.max(
    Math.floor((fechaFin.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24)),
    1
  )
  const diasRestantes = Math.max(
    Math.floor((fechaFin.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24)),
    0
  )

  // Cálculo del porcentaje restante
  const porcentajeRestante = (diasRestantes / totalDias) * 100

  return (
    <div className="mb-8 bg-gradient-to-r from-[#800000] to-[#560000] rounded-xl text-white shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Estado de Membresía</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold">{diasRestantes}</p>
          <p className="text-sm opacity-80">días restantes</p>
        </div>
        <div className="w-1/2">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-500 transition-all duration-500 rounded-full"
              style={{ width: `${porcentajeRestante}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 text-right opacity-80">
            Vence: {fechaFin.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}