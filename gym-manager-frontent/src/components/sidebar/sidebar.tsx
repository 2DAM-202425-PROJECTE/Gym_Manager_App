import { Dumbbell } from "lucide-react";


export default function Sidebar() {

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
    <div className="p-4 flex items-center space-x-2">
      <Dumbbell className="h-8 w-8 text-maroon-600" />
      <h1 className="text-2xl font-bold text-maroon-600">GYM MANAGER</h1>
    </div>
    <nav className="mt-8">
      <a
        href="/"
        className="block py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600 border-l-4 border-maroon-600"
      >
        Dashboard
      </a>
      {/* <a href="/clases" className="block py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600">
        Clases
      </a>
      <a href="/entrenadors" className="block py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600">
        Entrenadores
      </a>
      <a href="/nutricion" className="block py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600">
        Nutrición
      </a>
      <a href="configuracio" className="block py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600">
        Configuración
      </a> */}
    </nav>
  </aside>
  );
}