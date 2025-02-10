import type React from "react"
import { useState } from "react"
import { Bar } from "react-chartjs-2"

interface Clase {
  id_clase: number
  id_entrenador: number
  nombre_clase: string
  descripcion: string
  hora_inicio: string
  hora_fin: string
  dias: string
  maximo_participantes: number
}

const GestionClases: React.FC = () => {
  const [clases, setClases] = useState<Clase[]>([
    {
      id_clase: 1,
      id_entrenador: 1,
      nombre_clase: "Yoga",
      descripcion: "Clase de yoga para principiantes",
      hora_inicio: "10:00",
      hora_fin: "11:00",
      dias: "L,X,V",
      maximo_participantes: 20,
    },
    {
      id_clase: 2,
      id_entrenador: 2,
      nombre_clase: "Spinning",
      descripcion: "Clase de spinning intensiva",
      hora_inicio: "18:00",
      hora_fin: "19:00",
      dias: "M,J",
      maximo_participantes: 15,
    },
    {
      id_clase: 3,
      id_entrenador: 3,
      nombre_clase: "Pilates",
      descripcion: "Clase de pilates para todos los niveles",
      hora_inicio: "11:00",
      hora_fin: "12:00",
      dias: "M,J,S",
      maximo_participantes: 12,
    },
  ])
  const [nuevaClase, setNuevaClase] = useState<Omit<Clase, "id_clase">>({
    id_entrenador: 0,
    nombre_clase: "",
    descripcion: "",
    hora_inicio: "",
    hora_fin: "",
    dias: "",
    maximo_participantes: 0,
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showConfirm, setShowConfirm] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNuevaClase((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validación: verificar si todos los campos están completos
    if (
      !nuevaClase.nombre_clase ||
      !nuevaClase.descripcion ||
      !nuevaClase.hora_inicio ||
      !nuevaClase.hora_fin ||
      !nuevaClase.dias ||
      nuevaClase.maximo_participantes <= 0
    ) {
      alert("Por favor, completa todos los campos correctamente.")
      return
    }

    const newClase: Clase = {
      id_clase: Date.now(),
      ...nuevaClase,
    }
    setClases((prev) => [...prev, newClase])
    setNuevaClase({
      id_entrenador: 0,
      nombre_clase: "",
      descripcion: "",
      hora_inicio: "",
      hora_fin: "",
      dias: "",
      maximo_participantes: 0,
    })
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  const handleSave = (id: number) => {
    setEditingId(null)
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id: number) => {
    const { name, value } = e.target
    setClases(clases.map((clase) => (clase.id_clase === id ? { ...clase, [name]: value } : clase)))
  }

  const handleDelete = (id: number) => {
    setClases(clases.filter((clase) => clase.id_clase !== id))
    setShowConfirm(null)
  }

  const chartData = {
    labels: clases.map((c) => c.nombre_clase),
    datasets: [
      {
        label: "Máximo de participantes",
        data: clases.map((c) => c.maximo_participantes),
        backgroundColor: "#092756",
      },
    ],
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#092756]">Gestión de Clases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                name="id_entrenador"
                value={nuevaClase.id_entrenador}
                onChange={handleInputChange}
                placeholder="ID Entrenador"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="nombre_clase"
                value={nuevaClase.nombre_clase}
                onChange={handleInputChange}
                placeholder="Nombre de la clase"
                className="border p-2 rounded"
              />
              <textarea
                name="descripcion"
                value={nuevaClase.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción"
                className="border p-2 rounded col-span-2"
              />
              <input
                type="time"
                name="hora_inicio"
                value={nuevaClase.hora_inicio}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="time"
                name="hora_fin"
                value={nuevaClase.hora_fin}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="dias"
                value={nuevaClase.dias}
                onChange={handleInputChange}
                placeholder="Días (ej: L,M,X,J,V)"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="maximo_participantes"
                value={nuevaClase.maximo_participantes}
                onChange={handleInputChange}
                placeholder="Máximo participantes"
                className="border p-2 rounded"
              />
              <button type="submit" className="bg-[#092756] text-white px-4 py-2 rounded hover:bg-[#0b132b] col-span-2">
                Añadir Clase
              </button>
            </div>
          </form>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#092756]">Capacidad de Clases</h3>
          <Bar data={chartData} />
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4 text-[#092756]">Lista de Clases</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#1c2541] text-white">
                <th className="p-2">ID</th>
                <th className="p-2">Nombre</th>
                <th className="p-2">Entrenador ID</th>
                <th className="p-2">Horario</th>
                <th className="p-2">Días</th>
                <th className="p-2">Máx. Participantes</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clases.map((clase) => (
                <tr key={clase.id_clase} className="border-b">
                  <td className="p-2">{clase.id_clase}</td>
                  <td className="p-2">
                    {editingId === clase.id_clase ? (
                      <input
                        type="text"
                        name="nombre_clase"
                        value={clase.nombre_clase}
                        onChange={(e) => handleEditInputChange(e, clase.id_clase)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      clase.nombre_clase
                    )}
                  </td>
                  <td className="p-2">
                    {editingId === clase.id_clase ? (
                      <input
                        type="number"
                        name="id_entrenador"
                        value={clase.id_entrenador}
                        onChange={(e) => handleEditInputChange(e, clase.id_clase)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      clase.id_entrenador
                    )}
                  </td>
                  <td className="p-2">
                    {editingId === clase.id_clase ? (
                      <>
                        <input
                          type="time"
                          name="hora_inicio"
                          value={clase.hora_inicio}
                          onChange={(e) => handleEditInputChange(e, clase.id_clase)}
                          className="border p-1 rounded w-full mb-1"
                        />
                                                <input
                          type="time"
                          name="hora_fin"
                          value={clase.hora_fin}
                          onChange={(e) => handleEditInputChange(e, clase.id_clase)}
                          className="border p-1 rounded w-full"
                        />
                      </>
                    ) : (
                      `${clase.hora_inicio} - ${clase.hora_fin}`
                    )}
                  </td>
                  <td className="p-2">
                    {editingId === clase.id_clase ? (
                      <input
                        type="text"
                        name="dias"
                        value={clase.dias}
                        onChange={(e) => handleEditInputChange(e, clase.id_clase)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      clase.dias
                    )}
                  </td>
                  <td className="p-2">
                    {editingId === clase.id_clase ? (
                      <input
                        type="number"
                        name="maximo_participantes"
                        value={clase.maximo_participantes}
                        onChange={(e) => handleEditInputChange(e, clase.id_clase)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      clase.maximo_participantes
                    )}
                  </td>
                  <td className="p-2">
                    {editingId === clase.id_clase ? (
                      <button
                        onClick={() => handleSave(clase.id_clase)}
                        className="text-green-600 hover:text-green-800"
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(clase.id_clase)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Editar
                      </button>
                    )}
                    {/* Eliminar clase */}
                    <button
                      onClick={() => setShowConfirm(clase.id_clase)}
                      className="text-red-600 hover:text-red-800 ml-4"
                    >
                      Eliminar
                    </button>

                    {/* Confirmación de eliminación */}
                    {showConfirm === clase.id_clase && (
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded shadow-lg">
                          <p>¿Estás seguro de que deseas eliminar esta clase?</p>
                          <div className="mt-4 flex justify-between">
                            <button
                              onClick={() => handleDelete(clase.id_clase)}
                              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                              Sí, Eliminar
                            </button>
                            <button
                              onClick={() => setShowConfirm(null)}
                              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default GestionClases

