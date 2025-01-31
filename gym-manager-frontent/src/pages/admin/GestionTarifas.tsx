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
  const [showConfirm, setShowConfirm] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<{ precio?: number; meses?: number }>({})

  // Filtrar las tarifas según el filtro
  const filteredTarifas = tarifas.filter((tarifa) => {
    const matchesPrecio = filtro.precio ? tarifa.preu_tarifa <= filtro.precio : true
    const matchesMeses = filtro.meses ? tarifa.cantidad_meses === filtro.meses : true
    return matchesPrecio && matchesMeses
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNuevaTarifa((prev) => ({ ...prev, [name]: Number(value) }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nuevaTarifa.preu_tarifa <= 0 || nuevaTarifa.cantidad_meses <= 0) {
      setError("El precio y la cantidad de meses deben ser mayores a 0.")
      return
    }
    const newTarifa: Tarifa = {
      id_tarifa: Date.now(),
      ...nuevaTarifa,
    }
    setTarifas((prev) => [...prev, newTarifa])
    setNuevaTarifa({ preu_tarifa: 0, cantidad_meses: 1 })
    setSuccessMessage("Tarifa añadida correctamente.")
    setError(null)
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  const handleSave = (id: number) => {
    setEditingId(null)
    setSuccessMessage("Tarifa actualizada correctamente.")
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value } = e.target
    setTarifas(tarifas.map((tarifa) => (tarifa.id_tarifa === id ? { ...tarifa, [name]: Number(value) } : tarifa)))
  }

  const handleDelete = (id: number) => {
    setTarifas(tarifas.filter((tarifa) => tarifa.id_tarifa !== id))
    setShowConfirm(null)
    setSuccessMessage("Tarifa eliminada correctamente.")
  }

  const chartData = {
    labels: filteredTarifas.map((t) => `${t.cantidad_meses} meses`),
    datasets: [
      {
        data: filteredTarifas.map((t) => t.preu_tarifa),
        backgroundColor: ["#092756", "#1c2541", "#3a506b", "#5bc0be"],
      },
    ],
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#092756]">Gestión de Tarifas</h2>

   
      {/* Mensajes de éxito y error */}
      {error && <div className="bg-red-100 text-red-800 p-4 rounded mb-6">{error}</div>}
      {successMessage && <div className="bg-green-100 text-green-800 p-4 rounded mb-6">{successMessage}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Formulario para añadir tarifa */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col space-y-4">
              <div>
                <label className="text-sm text-[#092756] mb-2">Precio de la tarifa (€)</label>
                <input
                  type="number"
                  name="preu_tarifa"
                  value={nuevaTarifa.preu_tarifa}
                  onChange={handleInputChange}
                  placeholder="Introduce el precio de la tarifa"
                  className="border p-2 rounded w-full"
                />
              </div>
              <div>
                <label className="text-sm text-[#092756] mb-2">Cantidad de meses</label>
                <input
                  type="number"
                  name="cantidad_meses"
                  value={nuevaTarifa.cantidad_meses}
                  onChange={handleInputChange}
                  placeholder="Introduce la cantidad de meses"
                  className="border p-2 rounded w-full"
                />
              </div>
              <button type="submit" className="bg-[#092756] text-white px-4 py-2 rounded hover:bg-[#0b132b]">
                Añadir Tarifa
              </button>
            </div>
          </form>

          {/* Tabla de tarifas */}
          <table className="w-full">
            <thead>
              <tr className="bg-[#1c2541] text-white">
                <th className="p-3">ID</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Meses</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTarifas.map((tarifa) => (
                <tr key={tarifa.id_tarifa} className="border-b">
                  <td className="p-3">{tarifa.id_tarifa}</td>
                  <td className="p-3">
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
                  <td className="p-3">
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
                  <td className="p-3">
                    {editingId === tarifa.id_tarifa ? (
                      <button
                        onClick={() => handleSave(tarifa.id_tarifa)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Guardar
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(tarifa.id_tarifa)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setShowConfirm(tarifa.id_tarifa)}
                          className="text-red-600 hover:text-red-800 ml-4"
                        >
                          Eliminar
                        </button>
                        {showConfirm === tarifa.id_tarifa && (
                          <div className="absolute bg-white shadow-md p-4 rounded w-[250px] mt-2">
                            <p className="text-sm text-[#092756]">¿Estás seguro de que deseas eliminar esta tarifa?</p>
                            <div className="flex justify-between mt-2">
                              <button
                                onClick={() => handleDelete(tarifa.id_tarifa)}
                                className="text-red-600 hover:text-red-800 text-sm"
                              >
                                Sí
                              </button>
                              <button
                                onClick={() => setShowConfirm(null)}
                                className="text-blue-600 hover:text-blue-800 text-sm"
                              >
                                No
                              </button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gráfico de distribución de tarifas */}
        <div className="md:w-[300px] lg:w-[350px] mx-auto mt-6 md:mt-0">
          <h3 className="text-xl font-bold mb-4 text-[#092756]">Distribución de Tarifas</h3>
          <Doughnut data={chartData} />
        </div>
      </div>
    </div>
  )
}

export default GestionTarifas
