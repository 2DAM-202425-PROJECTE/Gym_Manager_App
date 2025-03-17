"use client"

import type React from "react"

import { useState } from "react"
import { User, Bell, Lock } from "lucide-react"

export default function AjustesEntrenador() {
    const [trainers, setTrainers] = useState<User[]>([])
  
  // Estados para los toggles
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [classReminders, setClassReminders] = useState(true)

  // Estados para el formulario de perfil
  const [profileForm, setProfileForm] = useState({
    nombre: "David Torres",
    apellidos: "Martínez",
    email: "david.torres@powergym.com",
    telefono: "+34 612 345 678",
    especialidad: "Entrenamiento funcional, Yoga, Spinning",
    biografia:
      "Entrenador certificado con más de 8 años de experiencia en fitness y entrenamiento funcional. Especializado en yoga y spinning.",
  })

  // Estados para el formulario de contraseña
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Manejadores de cambios en formularios
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Manejadores de envío de formularios
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para guardar los cambios del perfil
    alert("Perfil actualizado correctamente")
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para cambiar la contraseña
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("Las contraseñas no coinciden")
      return
    }
    alert("Contraseña actualizada correctamente")
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })
  }

  return (
    <div className="p-8">

      {/* Perfil de Entrenador */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <User className="h-5 w-5 text-maroon-600 mr-2" />
          <h3 className="text-xl font-semibold">Perfil de Entrenador</h3>
        </div>

        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mb-4 overflow-hidden">
                  <img
                    src="/placeholder.svg?height=128&width=128"
                    alt="Perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="bg-maroon-600 text-white py-2 px-4 rounded hover:bg-maroon-700 transition-colors w-full"
                >
                  Cambiar foto
                </button>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500"
                    value={profileForm.nombre}
                    onChange={handleProfileChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
                  <input
                    type="text"
                    name="apellidos"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500"
                    value={profileForm.apellidos}
                    onChange={handleProfileChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500"
                    value={profileForm.telefono}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
                  <input
                    type="text"
                    name="especialidad"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500"
                    value={profileForm.especialidad}
                    onChange={handleProfileChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Biografía</label>
                  <textarea
                    name="biografia"
                    className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500"
                    rows={4}
                    value={profileForm.biografia}
                    onChange={handleProfileChange}
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-maroon-600 text-white py-2 px-4 rounded hover:bg-maroon-700 transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Preferencias */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 text-maroon-600 mr-2" />
          <h3 className="text-xl font-semibold">Preferencias</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificaciones por email</p>
              <p className="text-sm text-gray-500">Recibir notificaciones por email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(!emailNotifications)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-maroon-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notificaciones push</p>
              <p className="text-sm text-gray-500">Recibir notificaciones en el navegador</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={pushNotifications}
                onChange={() => setPushNotifications(!pushNotifications)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-maroon-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Recordatorios de clases</p>
              <p className="text-sm text-gray-500">Recibir recordatorios antes de las clases</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={classReminders}
                onChange={() => setClassReminders(!classReminders)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-maroon-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Seguridad */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Lock className="h-5 w-5 text-maroon-600 mr-2" />
          <h3 className="text-xl font-semibold">Seguridad</h3>
        </div>

        <form onSubmit={handlePasswordSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña actual</label>
              <input
                type="password"
                name="currentPassword"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
              <input
                type="password"
                name="newPassword"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nueva contraseña</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-maroon-500 focus:border-maroon-500"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="bg-maroon-600 text-white py-2 px-4 rounded hover:bg-maroon-700 transition-colors"
              >
                Cambiar contraseña
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

