"use client"

import { useState, useEffect } from "react"
import { Dumbbell, Menu, X } from "lucide-react"
import { useLocation } from "react-router-dom"

export default function Sidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)

  // Cerrar el sidebar cuando cambia la ruta en móvil
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  // Cerrar el sidebar cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar")
      const toggleButton = document.getElementById("sidebar-toggle")

      if (
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        toggleButton &&
        !toggleButton.contains(event.target as Node) &&
        isOpen
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <>
      {/* Botón para mostrar/ocultar el sidebar en móvil */}
      <button
        id="sidebar-toggle"
        className="fixed top-4 left-4 z-50 p-2 rounded-xl bg-white shadow-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6 text-maroon-600" /> : <Menu className="h-6 w-6 text-maroon-600" />}
      </button>

      {/* Overlay oscuro cuando el sidebar está abierto en móvil */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`
          fixed top-0 left-0 h-screen z-40 w-64 bg-white shadow-md transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:block md:h-screen
        `}
      >
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
    </>
  )
}
