import type React from "react"
import { useState } from "react"

interface Usuario {
  id_usuari: number
  nombre: string
  correu: string
  rol: "client" | "admin" | "entrenador"
  contrasenya: string
  fecha_de_registre: string
}

const GestionUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id_usuari: 1,
      nombre: "Juan Pérez",
      correu: "juan@example.com",
      rol: "client",
      contrasenya: "****",
      fecha_de_registre: "2023-01-15",
    },
    {
      id_usuari: 2,
      nombre: "María López",
      correu: "maria@example.com",
      rol: "admin",
      contrasenya: "****",
      fecha_de_registre: "2023-02-20",
    },
    {
      id_usuari: 3,
      nombre: "Carlos Ruiz",
      correu: "carlos@example.com",
      rol: "entrenador",
      contrasenya: "****",
      fecha_de_registre: "2023-03-10",
    },
  ])
  const [nuevoUsuario, setNuevoUsuario] = useState<Omit<Usuario, "id_usuari" | "fecha_de_registre">>({
    nombre: "",
    correu: "",
    rol: "client",
    contrasenya: "",
  })
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newUsuario: Usuario = {
      id_usuari: Date.now(),
      ...nuevoUsuario,
      fecha_de_registre: new Date().toISOString().split("T")[0],
    }
    setUsuarios((prev) => [...prev, newUsuario])
    setNuevoUsuario({ nombre: "", correu: "", rol: "client", contrasenya: "" })
  }

  const handleEdit = (id: number) => {
    setEditingId(id)
  }

  const handleSave = (id: number) => {
    setEditingId(null)
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, id: number) => {
    const { name, value } = e.target
    setUsuarios(usuarios.map((user) => (user.id_usuari === id ? { ...user, [name]: value } : user)))
  }

  const userStats = {
    total: usuarios.length,
    clientes: usuarios.filter((u) => u.rol === "client").length,
    admin: usuarios.filter((u) => u.rol === "admin").length,
    entrenadores: usuarios.filter((u) => u.rol === "entrenador").length,
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
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="nombre"
                value={nuevoUsuario.nombre}
                onChange={handleInputChange}
                placeholder="Nombre"
                className="border p-2 rounded"
              />
              <input
                type="email"
                name="correu"
                value={nuevoUsuario.correu}
                onChange={handleInputChange}
                placeholder="Correo"
                className="border p-2 rounded"
              />
              <select name="rol" value={nuevoUsuario.rol} onChange={handleInputChange} className="border p-2 rounded">
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
              <button type="submit" className="bg-[#092756] text-white px-4 py-2 rounded hover:bg-[#0b132b] col-span-2">
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
                  <tr key={usuario.id_usuari} className="border-b">
                    <td className="p-2">{usuario.id_usuari}</td>
                    <td className="p-2">
                      {editingId === usuario.id_usuari ? (
                        <input
                          type="text"
                          name="nombre"
                          value={usuario.nombre}
                          onChange={(e) => handleEditInputChange(e, usuario.id_usuari)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        usuario.nombre
                      )}
                    </td>
                    <td className="p-2">
                      {editingId === usuario.id_usuari ? (
                        <input
                          type="email"
                          name="correu"
                          value={usuario.correu}
                          onChange={(e) => handleEditInputChange(e, usuario.id_usuari)}
                          className="border p-1 rounded w-full"
                        />
                      ) : (
                        usuario.correu
                      )}
                    </td>
                    <td className="p-2">
                      {editingId === usuario.id_usuari ? (
                        <select
                          name="rol"
                          value={usuario.rol}
                          onChange={(e) => handleEditInputChange(e, usuario.id_usuari)}
                          className="border p-1 rounded w-full"
                        >
                          <option value="client">Cliente</option>
                          <option value="admin">Admin</option>
                          <option value="entrenador">Entrenador</option>
                        </select>
                      ) : (
                        usuario.rol
                      )}
                    </td>
                    <td className="p-2">{usuario.fecha_de_registre}</td>
                    <td className="p-2">
                      {editingId === usuario.id_usuari ? (
                        <button
                          onClick={() => handleSave(usuario.id_usuari)}
                          className="text-green-600 hover:text-green-800"
                        >
                          Guardar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(usuario.id_usuari)}
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
        </div>
      </div>
    </div>
  )
}

export default GestionUsuarios

