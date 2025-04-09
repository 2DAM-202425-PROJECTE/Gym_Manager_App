import React from "react"

interface MembershipStatusProps {
  membresia: {
    fecha_fin: Date
  }
  calculateRemainingDays: (endDate: Date) => number
}

export default function MembershipStatus({ membresia, calculateRemainingDays }: MembershipStatusProps) {
  return (
    <div className="mb-8 bg-gradient-to-r from-[#800000] to-[#560000] rounded-xl text-white shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Estado de Membresía</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold">
            {membresia.fecha_fin ? calculateRemainingDays(new Date(membresia.fecha_fin)) : "N/A"}
          </p>
          <p className="text-sm opacity-80">días restantes</p>
        </div>
        <div className="w-1/2">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full"
              style={{ width: `${(calculateRemainingDays(membresia.fecha_fin) / 365) * 100}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 text-right opacity-80">
            Vence: {membresia.fecha_fin.toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}