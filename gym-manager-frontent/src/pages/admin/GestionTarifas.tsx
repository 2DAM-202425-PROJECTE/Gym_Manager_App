import type React from "react"
import { useState } from "react"
import { Doughnut } from "react-chartjs-2"

interface Tarifa {
  id_tarifa: number
  preu_tarifa: number
  cantidad_meses: number
}

const GestionTarifas: React.FC = () => {
  const [tarifas, setTarifas] = useState<Tarifa[]>([
    { id_tarifa: 1, preu_tarifa: 30, cantidad_meses: 1 },
    { id_tarifa: 2, preu_tarifa: 80, cantidad_meses: 3 },
    { id_tarifa: 3, preu_tarifa: 150, cantidad_meses: 6 },
    { id_tarifa: 4, preu_tarifa: 280, cantidad_meses: 12 },
  ])
  const [nuevaTarifa, setNuevaTarifa] = useState<Omit<Tarifa, "id_tarifa">>({
    preu_tarifa: 0,
    cantidad_meses: 1,
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNuevaTarifa((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newTarifa: Tarifa = {
      id_tarifa: Date.now(),
      ...nuevaTarifa,
    }
    setTarifas((prev) => [...prev, newTarifa])
    setNuevaTarifa({ preu_tarifa: 0, cantidad_meses: 1 })
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  const handleSave = (id: number) => {
    setEditingId(null)
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value } = e.target
    setTarifas(tarifas.map((tarifa) => (tarifa.id_tarifa === id ? { ...tarifa, [name]: Number(value) } : tarifa)))
  }

  const chartData = {
    labels: tarifas.map((t) => `${t.cantidad_meses} meses`),
    datasets: [
      {
        data: tarifas.map((t) => t.preu_tarifa),
        backgroundColor: ["#092756", "#1c2541", "#3a506b", "#5bc0be"],
      },
    ],
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#092756]">Gestión de Tarifas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col space-y-4">
              <input
                type="number"
                name="preu_tarifa"
                value={nuevaTarifa.preu_tarifa}
                onChange={handleInputChange}
                placeholder="Precio"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="cantidad_meses"
                value={nuevaTarifa.cantidad_meses}
                onChange={handleInputChange}
                placeholder="Meses"
                className="border p-2 rounded"
              />
              <button type="submit" className="bg-[#092756] text-white px-4 py-2 rounded hover:bg-[#0b132b]">
                Añadir Tarifa
              </button>
            </div>
          </form>
          <table className="w-full">
            <thead>
              <tr className="bg-[#1c2541] text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Precio</th>
                <th className="p-2">Meses</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {tarifas.map((tarifa) => (
                <tr key={tarifa.id_tarifa} className="border-b">
                  <td className="p-2">{tarifa.id_tarifa}</td>
                  <td className="p-2">
                    {editingId === tarifa.id_tarifa ? (
                      <input
                        type="number"
                        name="preu_tarifa"
                        value={tarifa.preu_tarifa}
                        onChange={(e) => handleEditInputChange(e, tarifa.id_tarifa)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      `${tarifa.preu_tarifa}€`
                    )}
                  </td>
                  <td className="p-2">
                    {editingId === tarifa.id_tarifa ? (
                      <input
                        type="number"
                        name="cantidad_meses"
                        value={tarifa.cantidad_meses}
                        onChange={(e) => handleEditInputChange(e, tarifa.id_tarifa)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      tarifa.cantidad_meses
                    )}
                  </td>
                  <td className="p-2">
                    {editingId === tarifa.id_tarifa ? (
                      <button
                        onClick={() => handleSave(tarifa.id_tarifa)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(tarifa.id_tarifa)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Editar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#092756]">Distribución de Tarifas</h3>
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  )
}

export default GestionTarifas

