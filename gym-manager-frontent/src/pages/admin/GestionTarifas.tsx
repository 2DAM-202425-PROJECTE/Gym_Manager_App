import axios from "axios"
import { use } from "i18next"
import type React from "react"
import { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"
import apiClient from "../../api/prefijo"
import { TextFieldAdmin } from "../../components/textFields/TextFieldAdmin"
import { toast } from "react-toastify"

interface Tarifa {
  id: number
  nombre: string
  precio: number
  meses: number
}


const GestionTarifas: React.FC = () => {

  const [tarifas, setTarifas] = useState<Tarifa[]>([]);

  useEffect(() => {
    const obtindreTarifes = async () => {
      try {
        const response = await apiClient.get("/tarifas");
        const tarifasObtingudes = response.data as Tarifa[];
        setTarifas(tarifasObtingudes);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setTarifas([]);
      }
    };
    obtindreTarifes();
  }, []);

  const [nuevaTarifa, setNuevaTarifa] = useState<Omit<Tarifa, "id">>({
    nombre: "",
    precio: 0,
    meses: 1,
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showConfirm, setShowConfirm] = useState<number | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filtro, setFiltro] = useState<{ precio?: number; meses?: number }>({})

  // Filtrar las tarifas según el filtro

  const filteredTarifas = tarifas.filter((tarifa) => {
    const matchesPrecio = filtro.precio ? tarifa.precio <= filtro.precio : true
    const matchesMeses = filtro.meses ? tarifa.meses === filtro.meses : true
    return matchesPrecio && matchesMeses
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNuevaTarifa((prev) => ({ ...prev, [name]: (value) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (nuevaTarifa.precio <= 0 || nuevaTarifa.meses <= 0) {
      toast("El precio y la cantidad de meses deben ser mayores a 0.")
      return
    }

    console.log(nuevaTarifa)

    const response = await apiClient.post("/tarifas", nuevaTarifa)
    
    setTarifas([...tarifas, response.data])
    console.log(response.data)

    toast("Tarifa añadida correctamente.")
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  const handleSave = (id: number) => {
    setEditingId(null)
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value } = e.target
    setTarifas(tarifas.map((tarifa) => (tarifa.id === id ? { ...tarifa, [name]: Number(value) } : tarifa)))
  }

  const handleDelete = async (id: number) => {
    try{
      await apiClient.delete(`/tarifas/${id}`)
      toast("Tarifa eliminada correctamente.")
      setTarifas(tarifas.filter((tarifa) => tarifa.id !== id))
    }catch(error){
      console.log(error)
    }
    setShowConfirm(null)
  }

  const chartData = {
    labels: filteredTarifas.map((t) => `${t.meses} meses`),
    datasets: [
      {
        data: filteredTarifas.map((t) => t.precio),
        backgroundColor: ["#092756", "#1c2541", "#3a506b", "#5bc0be"],
      },
    ], 
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#092756]">Gestión de Tarifas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* Formulario para añadir tarifa */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col space-y-4">
              <div>
              <label className="text-sm text-[#092756] mb-2">Nombre de la tarifa</label>
              <TextFieldAdmin name="nombre" value={nuevaTarifa.nombre} handleChange={handleInputChange} placeholder="Introduce el precio de la tarifa" string ></TextFieldAdmin>
              </div>
              <div>
                <label className="text-sm text-[#092756] mb-2">Precio de la tarifa (€)</label>
                <TextFieldAdmin name="precio" value={nuevaTarifa.precio} handleChange={handleInputChange} placeholder="Introduce el precio de la tarifa" ></TextFieldAdmin>
              </div>
              <div>
                <label className="text-sm text-[#092756] mb-2">Cantidad de meses</label>
                <TextFieldAdmin name="meses" value={nuevaTarifa.meses} handleChange={handleInputChange} placeholder="Introduce la cantidad de meses" ></TextFieldAdmin>
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
              {filteredTarifas.map((tarifa : Tarifa) => (
                <tr key={tarifa.id} className="border-b">
                  <td className="p-3">{tarifa.id}</td>
                  <td className="p-3">
                    {editingId === tarifa.id ? (
                      <input
                        type="number"
                        name="preu_tarifa"
                        value={tarifa.precio}
                        onChange={(e) => handleEditInputChange(e, tarifa.id)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      `${tarifa.precio}€`
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === tarifa.id ? (
                      <input
                        type="number"
                        name="cantidad_meses"
                        value={tarifa.meses}
                        onChange={(e) => handleEditInputChange(e, tarifa.id)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      tarifa.meses
                    )}
                  </td>
                  <td className="p-3">
                    {editingId === tarifa.id ? (
                      <button
                        onClick={() => handleSave(tarifa.id)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Guardar
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(tarifa.id)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setShowConfirm(tarifa.id)}
                          className="text-red-600 hover:text-red-800 ml-4"
                        >
                          Eliminar
                        </button>
                        {showConfirm === tarifa.id && (
                          <div className="absolute bg-white shadow-md p-4 rounded w-[250px] mt-2">
                            <p className="text-sm text-[#092756]">¿Estás seguro de que deseas eliminar esta tarifa?</p>
                            <div className="flex justify-between mt-2">
                              <button
                                onClick={() => handleDelete(tarifa.id)}
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
