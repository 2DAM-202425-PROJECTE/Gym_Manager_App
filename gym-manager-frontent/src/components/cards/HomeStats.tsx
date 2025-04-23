import { Trophy, Zap } from "lucide-react";
import { User } from "../../type/user";


export default function HomeStats({user}:{user: User}) {
   
    return (
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Cantidad de clases que participas</p>
          <p className="text-3xl font-bold text-gray-700">{user.clases.length}</p>
        </div>
        <div className="bg-orange-100 p-3 rounded-full">
          <Zap className="h-6 w-6 text-orange-600" />
        </div>
      </div>
      <p className="text-sm text-orange-600 mt-2">Apuntate a la clase que quieras</p>
    </div>
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">Tipo de membresía</p>
          <p className="text-3xl font-bold text-gray-700">{ user.membresia?.last_tarifa?.nombre}</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-full">
          <Trophy className="h-6 w-6 text-yellow-600" />
        </div>
      </div>
      <p className="text-sm text-yellow-600 mt-2">Mejora la membresia en cualquier momento</p>
    </div>
  </div>)
}