import { useEffect, useState } from "react"
import apiClient from "../../api/prefijo"
import { toast } from "react-toastify"
import { getUsers } from "../../api/user/getUsers"
import { GreenButtonAdmin } from "../../components/buttons/GreenButtonAdmin"
import { BlueButtonAdmin } from "../../components/buttons/BlueButtonAdmin"
import { RedButtonAdmin } from "../../components/buttons/RedButtonAdmin"
import { User } from "../type/user"
import { ModalEditarFecha } from "../../components/modals/ModalEditarFecha"

type newUser = {
  name: string
  email: string
  role: string
  password: string
}

const GestionUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([])

  const [nuevoUsuario, setNuevoUsuario] = useState<newUser>({
    name: "",
    email: "",
    role: "client",
    password: "",
  })
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showConfirm, setShowConfirm] = useState<number | null>(null)
  const [userDateEdit, setUserDateEdit] = useState<Date>()
  const [showModal, setShowModal] = useState<boolean>(false)

  
  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsers()
      if (response) setUsuarios(response)
      }
    fetchData()
  }, [])

  const handleEdit = (userToEdit: User) => {
    setEditingUser(userToEdit)
    setUserDateEdit(userToEdit.membresia ? new Date(userToEdit.membresia.fecha_fin) : undefined)
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log(nuevoUsuario)
      const response = await apiClient.post("/users", nuevoUsuario)
      setUsuarios([...usuarios, response.data])
      toast("Usuario añadido")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error al añadir el usuario")
    }
  }

  const handleSave = () => {
    toast("Usuario actualizado")
    try{
      console.log(editingUser)
      apiClient.put(`/users/${editingUser?.id}`, editingUser)
     const userEdited = editingUser
     if (userEdited && userEdited.membresia) {
      userEdited.membresia.fecha_fin = userDateEdit?.toLocaleDateString() || ""
     }

     console.log(userEdited)

    setUsuarios(usuarios.map((usuario) => (usuario.id === userEdited?.id ? userEdited : usuario)))
     
    setEditingUser(null)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    }catch(error){
      toast("Error al actualizar el usuario")
    }
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditingUser((prev) => (prev ? { ...prev, [name]: value } : prev))
  }

  const handleSaveInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNuevoUsuario((prev) => (prev ? { ...prev, [name]: value } : prev))
  }

  const handleDelete = (id: number) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id))
    setShowConfirm(null)
  }

  const handleOpenModal = (user: User) => {
    setEditingUser(user)
    setShowModal(true)
  }
  
  const handleCloseModal = () => {
    
    
    setShowModal(false)
      
    setEditingUser(null)
  }

  const userStats = {
    total: usuarios.length,
    clientes: usuarios.filter((u) => u.role === "client").length,
    admin: usuarios.filter((u) => u.role === "admin").length,
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#092756]">Gestión de Usuarios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-xl font-bold mb-4 text-[#092756]">Estadísticas de Usuarios</h3>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-[#092756] text-white p-4 rounded-lg">
              <p className="text-lg">Total Usuarios</p>
              <p className="text-3xl font-bold">{userStats.total}</p>
            </div>
            <div className="bg-[#1c2541] text-white p-4 rounded-lg">
              <p className="text-lg">Clientes</p>
              <p className="text-3xl font-bold">{userStats.clientes}</p>
            </div>
            <div className="bg-[#3a506b] text-white p-4 rounded-lg">
              <p className="text-lg">Administradores</p>
              <p className="text-3xl font-bold">{userStats.admin}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={nuevoUsuario?.name}
                onChange={handleSaveInputChange}
                placeholder="Nombre"
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="email"
                value={nuevoUsuario?.email}
                onChange={handleSaveInputChange}
                placeholder="Correo"
                className="border p-2 rounded"
              />
              <select name="role" value={nuevoUsuario?.role} onChange={(e) => handleSaveInputChange(e)} className="border p-2 rounded">
                <option value="client">Cliente</option>
                <option value="admin">Admin</option>
              </select>
              <input
                type="password"
                name="password"
                onChange={handleSaveInputChange}
                placeholder="Contraseña"
                className="border p-2 rounded"
              />
              <button
                type="submit"
                className="bg-blau_fosc text-white px-4 py-2 rounded hover:bg-blau_fosc col-span-2"
              >
                Añadir Usuario
              </button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-blau_fosc">Lista de Usuarios</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blau_fosc text-white">
                  <th className="p-2">ID</th>
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Correo</th>
                  <th className="p-2">Rol</th>
                  <th className="p-2">Fecha de fin de matricula</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario : User) => (
                  <tr key={usuario.id} className="border-b">
                    <td className="p-2">{usuario.id}</td>
                    <td className="p-2">
                      {editingUser?.id === usuario.id ? (
                        <input
                          type="text"
                          name="name"
                          value={editingUser.name}
                          onChange={(e) => handleEditInputChange(e)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        usuario.name
                      )}
                    </td>
                    <td className="p-2">
                      {editingUser?.id === usuario.id ? (
                        <input
                          type="email"
                          name="email"
                          value={editingUser.email}
                          onChange={(e) => handleEditInputChange(e)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        usuario.email
                      )}
                    </td>
                    <td className="p-2">
                      {editingUser?.id === usuario.id ? (
                        <select
                          name="role"
                          value={editingUser.role}
                          onChange={(e) => handleEditInputChange(e)}
                          className="border p-1 rounded w-full"
                        >
                          <option value="client">client</option>
                          <option value="admin">admin</option>
                        </select>
                      ) : (
                        usuario.role
                      )}
                    </td>
                    <td className="p-2 text-center">
                      {usuario.membresia ? (
                        <button
                          className="bg-blue-400 font-medium rounded-xl py-1 px-2"
                          onClick={() => handleOpenModal(usuario)}
                        >
                          {usuario.membresia.fecha_fin}
                        </button>
                      ) : (
                        <button onClick={() => handleOpenModal(usuario)}
                        className="bg-blue-400 font-medium rounded-xl p-2 py-1 px-2">
                          "N/D"
                        </button>
                      )}
                    </td>
                    <td className="flex gap-2 p-2">

                      {editingUser?.id === usuario.id ? (
                        <GreenButtonAdmin action={() => handleSave()} text="Guardar" />
                      ) : (
                        <BlueButtonAdmin text="Editar" action={() => handleEdit(usuario)} />
                      )}
                        <RedButtonAdmin text="Eliminar" action={() => setShowConfirm(usuario.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmación de eliminación */}
      {showConfirm !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg">¿Estás seguro de que quieres eliminar este usuario?</p>
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

      {showModal && editingUser && (
        <ModalEditarFecha user={editingUser} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default GestionUsuarios
