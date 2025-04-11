import { Dumbbell } from "lucide-react";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white shadow-md hidden md:block">
      <div className="p-4 flex items-center space-x-2">
        <Dumbbell className="h-8 w-8 text-maroon-600" />
        <h1 className="text-2xl font-bold text-maroon-600">GYM MANAGER</h1>
      </div>
      <nav className="mt-8">
        {[
          { path: "/", label: "Dashboard" },
          { path: "/clases", label: "Clases" },
          { path: "/entrenadors", label: "Entrenadores" },
          { path: "/contacto", label: "Contacto" },
        ].map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`block py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600 ${
              location.pathname === item.path ? "border-l-4 border-maroon-600 text-maroon-600" : ""
            }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}