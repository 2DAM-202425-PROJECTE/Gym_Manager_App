import { useEffect, useState } from "react"

interface Usuario {
  id: number
  name: string
  email: string
  email_verified_at: string | null
  current_team_id: number | null
  role: "client" | "admin" | "entrenador"
}

const GestionUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [nuevoUsuario, setNuevoUsuario] = useState<Omit<Usuario, "id">>({
    name: "",
    email: "",
    email_verified_at: null,
    current_team_id: null,
    role: "client",
  })
  const [editingId, setEditingId] = useState<number | null>(null)
  const [showConfirm, setShowConfirm] = useState<number | null>(null)
  const [error, setError] = useState<string>("")
/*
  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get("/usuarios")
      const usuarios = response.data as Usuario[]
      setUsuarios(usuarios)
    }
    fetchData()
  }, [])
*/
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación: Verificar que todos los campos estén llenos
    if (!nuevoUsuario.name || !nuevoUsuario.email) {
      setError("Por favor, completa todos los campos.")
      return
    }

    const newUsuario: Usuario = {
      id: Date.now(),
      ...nuevoUsuario,
      fecha_de_registre: new Date().toISOString().split("T")[0],
    }

    setUsuarios((prev) => [...prev, newUsuario])
    setNuevoUsuario({ name: "", email: "", role: "" })
    setError("") // Limpiar mensaje de error si la validación es exitosa
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  const handleSave = (id: number) => {
    setEditingId(null)
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: number) => {
    const { name, value } = e.target
    setUsuarios(usuarios.map((user) => (user.id === id ? { ...user, [name]: value } : user)))
  }

  const handleDelete = (id: number) => {
    setUsuarios(usuarios.filter((usuario) => usuario.id !== id))
    setShowConfirm(null)
  }

  const userStats = {
    total: usuarios.length,
    clientes: usuarios.filter((u) => u.role === "client").length,
    admin: usuarios.filter((u) => u.role === "admin").length,
    entrenadores: usuarios.filter((u) => u.role === "entrenador").length,
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
            <div className="bg-[#5bc0be] text-white p-4 rounded-lg">
              <p className="text-lg">Entrenadores</p>
              <p className="text-3xl font-bold">{userStats.entrenadores}</p>
            </div>
          </div>

          {/* Mostrar error si algún campo está vacío */}
          {error && <p className="text-red-600 mb-4">{error}</p>}

          <form onSubmit={handleSubmit} className="mb-6">
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
                className="bg-[#092756] text-white px-4 py-2 rounded hover:bg-[#0b132b] col-span-2"
              >
                Añadir Usuario
              </button>
            </div>
          </form>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4 text-[#092756]">Lista de Usuarios</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#1c2541] text-white">
                  <th className="p-2">ID</th>
                  <th className="p-2">Nombre</th>
                  <th className="p-2">Correo</th>
                  <th className="p-2">Rol</th>
                  <th className="p-2">Fecha de Registro</th>
                  <th className="p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="border-b">
                    <td className="p-2">{usuario.id}</td>
                    <td className="p-2">
                      {editingId === usuario.id ? (
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
                      {editingId === usuario.id ? (
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
                      {editingId === usuario.id ? (
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
                    <td className="p-2">{usuario.fecha_de_registre}</td>
                    <td className="p-2">
                      {editingId === usuario.id ? (
                        <button
                          onClick={() => handleSave(usuario.id)}
                          className="bg-green-500 text-white px-4 py-1 rounded mr-2 hover:bg-green-600"
                        >
                          Guardar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(usuario.id)}
                          className="bg-blue-500 text-white px-4 py-1 rounded mr-2 hover:bg-blue-600"
                        >
                          Editar
                        </button>
                      )}
                      <button
                        onClick={() => setShowConfirm(usuario.id)}
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
