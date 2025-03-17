import { LogOut } from "lucide-react";
import type React from "react"
import { useState } from "react"
import { Link } from "react-router-dom";


interface SidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const menuItems = [
    {
      name: "Dashboard",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
      section: "dashboard",
    },
    {
      name: "Tarifas",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
      section: "tarifas",
    },
    {
      name: "Usuarios",
      icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
      section: "usuarios",
    },
    {
      name: "Clases",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
      section: "clases",
    },
    {
      name: "Espacios",
      icon: "M4 6v12h16V6H4zm0-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
      section: "espacios",
    },
  ]

  return (
    <div
      className={`bg-[#1c2541] text-white h-screen p-4 transition-all duration-300 ${isExpanded ? "w-64" : "w-20"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex items-center justify-center mb-8">

        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        {isExpanded && <span className="ml-2 text-xl font-bold">GymManager Admin</span>}
      </div>
      <nav >
        {menuItems.map((item) => (
          <button
            key={item.section}
            onClick={() => setActiveSection(item.section)}
            className={`flex items-center w-full p-2 rounded-md mb-4 ${
              activeSection === item.section ? "bg-blau_fosc" : "hover:bg-blau_fosc"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {isExpanded && <span className="ml-4">{item.name}</span>}
          </button>
        ))}
      </nav>
      <div className="mt-auto">
      <Link
          to={"/login"}
          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-blau_fosc"
        >
          <LogOut className="inline-block w-5 h-5 mr-2" />
          {isExpanded && "Cerrar sesión"}
        </Link>
      </div>
    </div>
  )
}

export default Sidebar

