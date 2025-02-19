import { useState } from "react"
import { User, Lock, Bell, CreditCard, HelpCircle } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")

  const tabs = [
    { id: "profile", label: "Perfil", icon: User },
    { id: "security", label: "Seguridad", icon: Lock },
    { id: "notifications", label: "Notificaciones", icon: Bell },
    { id: "billing", label: "Facturación", icon: CreditCard },
    { id: "help", label: "Ayuda", icon: HelpCircle },
  ]

  return (
    
      <div className="p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Configuración</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`flex items-center px-4 py-2 mr-4 rounded-md transition-colors ${
                  activeTab === tab.id ? "bg-maroon-600 text-white" : "text-gray-600 hover:bg-maroon-100"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-6">
            {activeTab === "profile" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Información del Perfil</h3>
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
                    />
                  </div>
                  <button className="px-4 py-2 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                    Guardar Cambios
                  </button>
                </form>
              </div>
            )}
            {activeTab === "security" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Seguridad de la Cuenta</h3>
                <form>
                  <div className="mb-4">
                    <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      name="current-password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      name="new-password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      id="confirm-password"
                      name="confirm-password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500"
                    />
                  </div>
                  <button className="px-4 py-2 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                    Cambiar Contraseña
                  </button>
                </form>
              </div>
            )}
            {activeTab === "notifications" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Preferencias de Notificaciones</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <input type="checkbox" id="email-notifications" className="mr-2" />
                    <label htmlFor="email-notifications">Recibir notificaciones por correo electrónico</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="push-notifications" className="mr-2" />
                    <label htmlFor="push-notifications">Recibir notificaciones push</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="sms-notifications" className="mr-2" />
                    <label htmlFor="sms-notifications">Recibir notificaciones por SMS</label>
                  </div>
                </div>
                <button className="mt-4 px-4 py-2 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                  Guardar Preferencias
                </button>
              </div>
            )}
            {activeTab === "billing" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Información de Facturación</h3>
                <p className="mb-4">
                  Plan actual: <span className="font-semibold">Premium</span>
                </p>
                <p className="mb-4">
                  Próxima facturación: <span className="font-semibold">15/07/2023</span>
                </p>
                <button className="px-4 py-2 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                  Cambiar Plan
                </button>
              </div>
            )}
            {activeTab === "help" && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Centro de Ayuda</h3>
                <p className="mb-4">Si necesitas ayuda, puedes contactarnos de las siguientes maneras:</p>
                <ul className="list-disc list-inside mb-4">
                  <li>Correo electrónico: soporte@powergym.com</li>
                  <li>Teléfono: +1 234 567 890</li>
                  <li>Chat en vivo: Disponible de lunes a viernes, de 9:00 a 18:00</li>
                </ul>
                <button className="px-4 py-2 bg-maroon-600 text-white rounded hover:bg-maroon-700 transition-colors">
                  Iniciar Chat en Vivo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
  )
}
