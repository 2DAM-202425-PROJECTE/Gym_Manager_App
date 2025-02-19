import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell, Bell, User, LogOut } from "lucide-react"

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/clases", label: "Clases" },
    { href: "/entrenadores", label: "Entrenadores" },
    { href: "/nutricion", label: "Nutrición" },
    { href: "/configuracion", label: "Configuración" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <div className="p-4 flex items-center space-x-2">
            <Dumbbell className="h-8 w-8 text-maroon-600" />
            <h1 className="text-2xl font-bold text-maroon-600">POWER GYM</h1>
          </div>
          <nav className="mt-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block py-2 px-4 text-gray-700 hover:bg-maroon-100 hover:text-maroon-600 ${
                  pathname === item.href ? "bg-maroon-100 text-maroon-600 border-l-4 border-maroon-600" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Header */}
          <header className="bg-white shadow-md p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">POWER GYM</h2>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors relative"
              >
                <Bell className="h-5 w-5 text-gray-600" />
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden"
                >
                  <img src="/placeholder.svg?height=40&width=40" alt="User" className="w-full h-full object-cover" />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="inline-block w-4 h-4 mr-2" />
                        Ver perfil
                      </a>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        <LogOut className="inline-block w-4 h-4 mr-2" />
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">&copy; 2023 POWER GYM. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
