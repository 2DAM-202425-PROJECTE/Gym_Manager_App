import type React from "react"
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import apiClient from "../../api/prefijo"
import { Clase, Horario, HorarioToSend } from "../type/clases"
import { toast } from "react-toastify"
import { HandleViewHorario } from "../../components/clases/HandleViewHorario"
import { User } from "../type/user"
import { TextFieldAdmin } from "../../components/textFields/TextFieldAdmin"



const GestionClases: React.FC = () => {
  const [clases, setClases] = useState<Clase[]>([])

  useEffect(() => {
    const obtenerClases = async () => {
      try {
        const response = await apiClient.get("/clases")
        setClases(response.data)
        const responseUsers = await apiClient.get("/users")
        setUsers(responseUsers.data)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setClases([])
      }
    }
    obtenerClases()
  }, [])
  const [horariosSelected, setHorariosSelected] = useState<Horario[] | null>(null);

  const [nuevaClase, setNuevaClase] = useState<Clase>()
  const [editingClass, setEditingClass] = useState<Clase | null>(null)
  const [showConfirm, setShowConfirm] = useState<number | null>(null)
  const [users, setUsers ] = useState<User[]>([])



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNuevaClase((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const claseConHorarios = { ...nuevaClase, horarios }
    console.log(claseConHorarios)

    apiClient.post("/clases", claseConHorarios)
      .then((response) => {
        console.log(response)
        setClases((prev) => [...prev, response.data])
        setNuevaClase(undefined)
        setHorarios([])
        toast.success("Clase añadida correctamente")
      })
      .catch((error) => {
        console.log(error)
        toast.error("Error al añadir la clase")
      })
  }

  const handleEdit = (clase: Clase) => {
    setEditingClass(clase)
    setHorariosSelected(clase.horarios)
  }
  const handelChooseHorario = (clase: Clase) => {
    setHorariosSelected(clase.horarios)
    setEditingClass(clase)

  }

  const handleSave = async () => {
    try{

      await apiClient.put(`/clases/${editingClass?.id}`, editingClass)
      setEditingClass(null)
      setClases((prev) => prev.map((clase) => (clase.id === editingClass?.id ? editingClass : clase)))
      toast.success("Clase editada correctamente")
    }catch(error){
      toast.error("Error al editar la clase")
      console.log(error)
    }
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditingClass((prev) => prev ? ({ ...prev, [name]: value }) : prev)
  }

  const handleDelete = async (id: number) => {
    await apiClient.delete(`/clases/${id}`)
    setClases((prev) => prev.filter((clase) => clase.id !== id))
  }


  const chartData = {
    labels: clases.map((c) => c.nombre),
    datasets: [
      {
        label: "Máximo de participantes",
        data: clases.map((c) => c.maximo_participantes),
        backgroundColor: "#092756",
      },
    ],
  }
  const [horarios, setHorarios] = useState<HorarioToSend[]>([]);

  const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  // Agregar horario
  const agregarHorario = () => {
    setHorarios([...horarios, { dia: "", hora_inicio: "", hora_fin: "" }]);
  };

  const eliminarHorario = (index: number) => {
    setHorarios(horarios.filter((_, i) => i !== index));
  };
  const handleHorarioChange = (index: number, field: keyof HorarioToSend, value: string) => {
      const nuevosHorarios = [...horarios];
      nuevosHorarios[index][field] = value;
      setHorarios(nuevosHorarios);
    };

  

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#092756]">Gestión de Clases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
        <form onSubmit={(e) => handleSubmit(e)} className="mb-6">
      <div className="grid grid-cols-2 gap-4">
      <select
        name="id_entrenador"
        value={nuevaClase?.id_entrenador || ""}
        onChange={(e) => handleInputChange(e)}
        className="border p-2 rounded"
      >
        <option value="">Selecciona un entrenador</option>
        {users
          .filter((user) => user.role === "trainer") // Filtra solo los entrenadores
          .map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
      </select>


        <TextFieldAdmin string={true} name={"nombre"} placeholder={"Nombre de la clase"} value={nuevaClase?.nombre || ""} handleChange={handleInputChange} ></TextFieldAdmin>
        <textarea
          name="descripcion"
          value={nuevaClase?.descripcion || ""}
          onChange={handleInputChange}
          placeholder="Descripción"
          className="border p-2 rounded col-span-2"
        />
          <input
            type="number"
            name="maximo_participantes"
            value={nuevaClase?.maximo_participantes || ""}
            onChange={handleInputChange}
            placeholder="Máximo participantes"
            className="border p-2 rounded"
          />
        </div>

      {/* Horarios */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Horarios:</h3>
        {horarios.map((horario, index) => (
          <div key={index} className="grid grid-cols-4 gap-2 items-center mb-2">
            <select
              value={horario.dia}
              onChange={(e) => handleHorarioChange(index, "dia", e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Selecciona un día</option>
              {diasSemana.map((dia) => (
                <option key={dia} value={dia}>
                  {dia}
                </option>
              ))}
            </select>
            <input
              type="time"
              value={horario.hora_inicio}
              onChange={(e) => handleHorarioChange(index, "hora_inicio", e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="time"
              value={horario.hora_fin}
              onChange={(e) => handleHorarioChange(index, "hora_fin", e.target.value)}
              className="border p-2 rounded"
            />
            <button
              type="button"
              onClick={() => eliminarHorario(index)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={agregarHorario}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
        >
          + Añadir Horario
        </button>
      </div>

      <button type="submit" className="bg-[#092756] text-white px-4 py-2 rounded hover:bg-[#0b132b] mt-4">
        Añadir Clase
      </button>
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
                <th className="p-2">Máx. Participantes</th>
                <th className="p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clases.map((clase) => (
                <tr key={clase.id} className="border-b">
                  <td className="p-2 text-center">{clase.id}</td>
                  <td className="p-2">
                    {editingClass?.id === clase.id ? (
                      <input
                        type="text"
                        name="nombre"
                        value={editingClass.nombre}
                        onChange={(e) => handleEditInputChange(e)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      <p className="text-center">{clase.nombre}</p>
                    )}
                  </td>
                  <td className="p-2">
                    {editingClass?.id === clase.id ? (
                      <input
                        type="number"
                        name="id_entrenador"
                        value={editingClass   .id_entrenador}
                        onChange={(e) => handleEditInputChange(e)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      <p className="text-center">{clase.id_entrenador}</p>
                    )}
                  </td>
                  <td className="flex justify-center">
                    <button onClick={()=> handelChooseHorario(clase)} className="bg-black rounded-xl text-white p-x3 p-2">
                      ver horario
                    </button>
                  </td>
                  <td className="p-2 ">
                    {editingClass?.id === clase.id ? (
                      <input
                        type="number"
                        name="maximo_participantes"
                        value={editingClass   .maximo_participantes}
                        onChange={(e) => handleEditInputChange(e)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      <p className="text-center w-full">{clase.maximo_participantes}</p>
                    )}
                  </td>
     
                  <td className="p-2 flex justify-center">
                    {editingClass?.id === clase.id ? (
                      <button
                        onClick={() => handleSave()}
                        className="text-green-600 hover:text-green-800"
                      >
                        Guardar
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(clase)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Editar
                      </button>
                    )}
                    {/* Eliminar clase */}
                    <button
                      onClick={() => handleDelete(clase.id)}
                      className="text-red-600 hover:text-red-800 ml-4"
                    >
                      Eliminar
                    </button>

                    {/* Confirmación de eliminación */}
                    {showConfirm === clase.id && (
                      <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded shadow-lg">
                          <p>¿Estás seguro de que deseas eliminar esta clase?</p>
                          <div className="mt-4 flex w-full justify-center">
                            <button
                              onClick={() => handleDelete(clase.id)}
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
      <HandleViewHorario horarios={horariosSelected} editingClass={editingClass} setEditingClass={setEditingClass}></HandleViewHorario>
    </div>
  )
}

export default GestionClases

