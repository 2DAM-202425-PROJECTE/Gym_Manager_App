import { useEffect, useState } from "react"
import apiClient from "../../api/prefijo"
import { User } from "../../type/user"
import { toast } from "react-toastify"
import { getUsers } from "../../api/user/getUsers"



const GestionUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<User[]>([])

  const [nuevoUsuario, setNuevoUsuario] = useState<User>()
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showConfirm, setShowConfirm] = useState<number | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUsers()
      if (response) setUsuarios(response)
      }
    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditingUser((prev) => (prev ? { ...prev, [name]: value } : prev))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
//    setUsuarios((prev) => [...prev, nuevoUsuario])
    setError("")
  }

  const handleEdit = (userToEdit: User) => {
    setEditingUser(userToEdit)
  }

  const handleSave = () => {
    toast("Usuario actualizado aun nope")
    setEditingUser(null)
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditingUser((prev) => (prev ? { ...prev, [name]: value } : prev))
  }

  const handleDelete = (id: number) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id))
    setShowConfirm(null)
  }

  const userStats = {
    total: usuarios.length,
    clientes: usuarios.filter((u) => u.role === "client").length,
    admin: usuarios.filter((u) => u.role === "admin").length,
    entrenadores: usuarios.filter((u) => u.role === "trainer").length,
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
            <div className="bg-cyan text-white p-4 rounded-lg">
              <p className="text-lg">Entrenadores</p>
              <p className="text-3xl font-bold">{userStats.entrenadores}</p>
            </div>
          </div>


        {/*  <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="nombre"
                value={nuevoUsuario.name}
                onChange={handleInputChange}
                placeholder="Nombre"
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="correu"
                value={nuevoUsuario.email}
                onChange={handleInputChange}
                placeholder="Correo"
                className="border p-2 rounded"
              />
              <select name="rol" value={nuevoUsuario.role} onChange={handleInputChange} className="border p-2 rounded">
                <option value="client">Cliente</option>
                <option value="admin">Admin</option>
                <option value="entrenador">Entrenador</option>
              </select>
              <input
                type="password"
                name="contrasenya"
                value={nuevoUsuario.contrasenya}
                onChange={handleInputChange}
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
          </form>*/}
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
                          name="nombre"
                          value={usuario.name}
                          onChange={(e) => handleEditInputChange(e, usuario.id)}
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
                          name="correu"
                          value={usuario.email}
                          onChange={(e) => handleEditInputChange(e, usuario.id)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        usuario.email
                      )}
                    </td>
                    <td className="p-2">
                      {editingUser?.id === usuario.id ? (
                        <select
                          name="rol"
                          value={usuario.role}
                          onChange={(e) => handleEditInputChange(e, usuario.id)}
                          className="border p-1 rounded w-full"
                        >
                          <option value="client">Cliente</option>
                          <option value="admin">Admin</option>
                          <option value="entrenador">Entrenador</option>
                        </select>
                      ) : (
                        usuario.role
                      )}
                    </td>
                    <td className="p-2">{usuario.membresia ? usuario.membresia.fecha_fin : "N/D"}</td>
                    <td className="p-2">
                      {editingUser?.id === usuario.id ? (
                        <button
                          onClick={() => handleSave()}
                          className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
                        >
                          Guardar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(usuario)}
                          className="bg-blue-500 text-white px-4 py-1 rounded mr-2 hover:bg-blue-600"
                        >
                          Editar
                        </button>
                      )}
                      <button
                        onClick={() => setShowConfirm(usuario?.id)}
                        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                      >
                        Eliminar
                      </button>
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
    </div>
  )
}

export default GestionUsuarios
