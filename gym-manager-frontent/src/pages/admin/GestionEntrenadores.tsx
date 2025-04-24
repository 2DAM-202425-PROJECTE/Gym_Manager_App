"use client"

import type React from "react"

import { useEffect, useState } from "react"
import apiClient from "../../api/prefijo"
import { toast } from "react-toastify"
import { GreenButtonAdmin } from "../../components/buttons/GreenButtonAdmin"
import { BlueButtonAdmin } from "../../components/buttons/BlueButtonAdmin"
import { RedButtonAdmin } from "../../components/buttons/RedButtonAdmin"
import type { Entrenador } from "../../type/entrenadors"

type newTrainer = {
  name: string
  email: string
  phone_number: string
  especialidad: string
  experiencia: string
  disponibilidad: string[]
  certificaciones: string
  descripcion: string
  password: string
}

const GestionEntrenadores: React.FC = () => {
  const [entrenadores, setEntrenadores] = useState<Entrenador[]>([])

  const [nuevoEntrenador, setNuevoEntrenador] = useState<newTrainer>({
    name: "",
    email: "",
    phone_number: "",
    especialidad: "",
    experiencia: "",
    disponibilidad: [],
    certificaciones: "",
    descripcion: "",
    password: "",
  })
  const [editingTrainer, setEditingTrainer] = useState<Entrenador | null>(null)
  const [showConfirm, setShowConfirm] = useState<number | null>(null)

  const getTrainers = async (): Promise<Entrenador[]> => {
    try {
      const response = await apiClient.get("/entrenadors")
      return response.data
    } catch (error) {
      console.error("Error fetching trainers:", error)
      return []
    }
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await getTrainers()
      if (response) setEntrenadores(response)
    }
    fetchData()
  }, [])

  const handleEdit = (trainerToEdit: Entrenador) => {
    setEditingTrainer(trainerToEdit)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {

      const response = await apiClient.post("/entrenadors", nuevoEntrenador)
      setEntrenadores([...entrenadores, response.data])
      toast("Entrenador añadido")
    
      setNuevoEntrenador(
        {
          name: "",
          email: "",
          phone_number: "",
          especialidad: "",
          experiencia: "",
          disponibilidad: [],
          certificaciones: "",
          descripcion: "",
          password: "",
        }
      )

      const fieldPassword = document.getElementById("password") as HTMLFormElement
      fieldPassword.value = ""

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    
    } catch (error) {
      toast.error("Error al añadir el entrenador")
    }

  }

  const handleSave = () => {
    toast("Entrenador actualizado")
    try {
      console.log(editingTrainer)
      const dataToSend = {
        name: editingTrainer?.user.name,
        especialidad: editingTrainer?.especialidad,
        experiencia: editingTrainer?.experiencia,
        disponibilidad: editingTrainer?.disponibilidad,
        phone_number: editingTrainer?.phone_number,
        certificaciones: editingTrainer?.certificaciones,
        descripcion: editingTrainer?.descripcion
      } 
      const response =  apiClient.put(`/entrenadors/${editingTrainer?.id}`, dataToSend)
      console.log(response)
      const trainerEdited = editingTrainer

      setEntrenadores(
        entrenadores.map((entrenador) =>
          entrenador.entrenador_id === trainerEdited?.entrenador_id ? trainerEdited : entrenador,
        ),
      )

      setEditingTrainer(null)

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast("Error al actualizar el entrenador")
    }
  }

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
  
    // Crear una copia del objeto editingTrainer
    const updatedTrainer = {
      ...editingTrainer,
      id: editingTrainer?.id || 0, // Ensure 'id' is defined
      user: {
        ...editingTrainer?.user,
        name: value,
      },
    };
    setEditingTrainer(updatedTrainer);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditingTrainer((prev) => (prev ? { ...prev, [name]: value } : prev))
  }

  const handleSaveInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNuevoEntrenador((prev) => (prev ? { ...prev, [name]: value } : prev))
  }

  const toggleDaySelection = (day: string) => {
    setNuevoEntrenador((prev) => ({
      ...prev,
      disponibilidad: prev.disponibilidad.includes(day)
        ? prev.disponibilidad.filter((d) => d !== day)
        : [...prev.disponibilidad, day],
    }))
  }

  const handleDelete = (id: number) => {
try{
  console.log(id)
  const response = apiClient.delete(`/borrarEntrenador/${id}`)
  console.log(response)

  setEntrenadores(entrenadores.filter((entrenador) => entrenador.entrenador_id !== id))
  setShowConfirm(null)
}catch{
  toast.error("Error al borrar")
}
  }

  const trainerStats = {
    total: entrenadores.length,
    especialidades: [...new Set(entrenadores.map((e) => e.especialidad))].length,
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#092756]">Gestión de Entrenadores</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#092756]">Estadísticas de Entrenadores</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#092756] text-white p-4 rounded-lg">
              <p className="text-lg">Total Entrenadores</p>
              <p className="text-3xl font-bold">{trainerStats.total}</p>
            </div>
            <div className="bg-[#1c2541] text-white p-4 rounded-lg">
              <p className="text-lg">Especialidades</p>
              <p className="text-3xl font-bold">{trainerStats.especialidades}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={nuevoEntrenador?.name}
                onChange={handleSaveInputChange}
                placeholder="Nombre"
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={nuevoEntrenador?.email}
                onChange={handleSaveInputChange}
                placeholder="Correo"
                className="border p-2 rounded"
              />
              <input
                type="tel"
                name="phone_number"
                value={nuevoEntrenador?.phone_number}
                onChange={handleSaveInputChange}
                placeholder="Teléfono"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="especialidad"
                value={nuevoEntrenador?.especialidad}
                onChange={handleSaveInputChange}
                placeholder="Especialidad"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="experiencia"
                value={nuevoEntrenador?.experiencia}
                onChange={handleSaveInputChange}
                placeholder="Experiencia (años)"
                className="border p-2 rounded"
              />
              <div className="col-span-2">
                <p className="font-medium mb-2">Disponibilidad</p>
                <div className="flex gap-2 flex-wrap">
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDaySelection(day)}
                      className={`px-4 py-2 rounded ${
                        nuevoEntrenador.disponibilidad.includes(day)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      } hover:bg-blue-400 hover:text-white transition`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
              <input
                type="text"
                name="certificaciones"
                value={nuevoEntrenador?.certificaciones}
                onChange={handleSaveInputChange}
                placeholder="Certificaciones"
                className="border p-2 rounded"
              />
              <textarea
                name="descripcion"
                value={nuevoEntrenador?.descripcion}
                onChange={handleSaveInputChange}
                placeholder="Descripción"
                className="border p-2 rounded col-span-2"
                rows={3}
              />
              <input
                id="password"
                type="password"
                name="password"
                onChange={handleSaveInputChange}
                placeholder="Contraseña"
                className="border p-2 rounded"
              />
              <button type="submit" className="bg-blau_fosc text-white px-4 py-2 rounded hover:bg-blau_fosc col-span-2">
                Añadir Entrenador
              </button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-blau_fosc">Lista de Entrenadores</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blau_fosc text-white">
                  <th className="p-2">ID</th>
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Especialidad</th>
                  <th className="p-2">Teléfono</th>
                  <th className="p-2">Experiencia</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {entrenadores.map((entrenador: Entrenador) => (
                  <tr key={entrenador.entrenador_id} className="border-b">
                    <td className="p-2">{entrenador.entrenador_id}</td>
                    <td className="p-2">
                      {editingTrainer?.entrenador_id === entrenador.entrenador_id ? (
                        <input
                          type="text"
                          name="name"
                          value={editingTrainer.user.name}
                          onChange={(e) => handleEditInputChange(e)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        entrenador.user.name
                      )}
                    </td>
                    <td className="p-2">
                      {editingTrainer?.entrenador_id === entrenador.entrenador_id ? (
                        <input
                          type="text"
                          name="especialidad"
                          value={editingTrainer.especialidad}
                          onChange={(e) => handleEditInputChange(e)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        entrenador.especialidad
                      )}
                    </td>
                    <td className="p-2">
                      {editingTrainer?.entrenador_id === entrenador.entrenador_id ? (
                        <input
                          type="tel"
                          name="phone_number"
                          value={editingTrainer.phone_number}
                          onChange={(e) => handleEditInputChange(e)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        entrenador.phone_number
                      )}
                    </td>
                    <td className="p-2">
                      {editingTrainer?.entrenador_id === entrenador.entrenador_id ? (
                        <input
                          type="text"
                          name="experiencia"
                          value={editingTrainer.experiencia}
                          onChange={(e) => handleEditInputChange(e)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        entrenador.experiencia
                      )}
                    </td>
                    <td className="flex gap-2 p-2">
                      {editingTrainer?.entrenador_id === entrenador.entrenador_id ? (
                        <GreenButtonAdmin action={() => handleSave()} text="Guardar" />
                      ) : (
                        <BlueButtonAdmin text="Editar" action={() => handleEdit(entrenador)} />
                      )}
                      <RedButtonAdmin text="Eliminar" action={() => setShowConfirm(entrenador.entrenador_id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingTrainer && editingTrainer.entrenador_id && !showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4 text-[#092756]">Editar Entrenador</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={editingTrainer.user.name}
                  onChange={(e) => handleChangeName(e)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingTrainer.user.email}
                  onChange={(e) => handleEditInputChange(e)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Teléfono</label>
                <input
                  type="tel"
                  name="phone_number"
                  value={editingTrainer.phone_number}
                  onChange={(e) => handleEditInputChange(e)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Especialidad</label>
                <input
                  type="text"
                  name="especialidad"
                  value={editingTrainer.especialidad}
                  onChange={(e) => handleEditInputChange(e)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Experiencia</label>
                <input
                  type="number"
                  name="experiencia"
                  value={editingTrainer.experiencia}
                  onChange={(e) => handleEditInputChange(e)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Disponibilidad</label>
                {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => toggleDaySelection(day)}
                      className={`px-4 py-2 m-1 rounded ${
                        nuevoEntrenador.disponibilidad.includes(day)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      } hover:bg-blue-400 hover:text-white transition`}
                    >
                      {day}
                    </button>
                  ))}
              </div>
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium mb-1">Certificaciones</label>
                <input
                  type="text"
                  name="certificaciones"
                  value={editingTrainer.certificaciones}
                  onChange={(e) => handleEditInputChange(e)}
                  className="border p-2 rounded w-full"
                />
              </div>
              <div className="mb-4 col-span-2">
                <label className="block text-sm font-medium mb-1">Descripción</label>
                <textarea
                  name="descripcion"
                  value={editingTrainer.descripcion}
                  onChange={(e) => handleEditInputChange(e)}
                  className="border p-2 rounded w-full"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => handleSave()}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Guardar
              </button>
              <button
                onClick={() => setEditingTrainer(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmación de eliminación */}
      {showConfirm !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg">¿Estás seguro de que quieres eliminar este entrenador?</p>
            <div>
              <button
                onClick={() => handleDelete(showConfirm)}
                className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowConfirm(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionEntrenadores

