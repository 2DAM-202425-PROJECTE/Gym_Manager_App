import { User } from "../../type/user"

export function UserPanel({usuarios}: {usuarios: User[]}) {
    
    const userStats = {
        total: usuarios.length,
        clientes: usuarios.filter((u) => u.role === "client").length,
        admin: usuarios.filter((u) => u.role === "admin").length,
        trainers: usuarios.filter((u) => u.role === "trainer").length,
      }

    return (
        <div>
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
              <p className="text-3xl font-bold">{userStats.trainers}</p>
            </div>
          </div>
        </div>
    )
}