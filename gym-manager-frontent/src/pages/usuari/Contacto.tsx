

import type React from "react"

import { useState } from "react"
import Sidebar from "../../components/sidebar/sidebar"
import Footer from "../../components/footer/footer"
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  User,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "general",
    mensaje: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError(false)

    try {
      // Simulación de envío de formulario
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitSuccess(true)
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: "general",
        mensaje: "",
      })
    } catch (error) {
      setSubmitError(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-2">Contáctanos</h2>
              <p className="text-gray-600">Estamos aquí para ayudarte con cualquier consulta o duda que tengas</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="bg-gradient-to-r from-maroon-600 to-maroon-800 p-6">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Envíanos un mensaje
                    </h3>
                    <p className="text-maroon-100 mt-1">Completa el formulario y te responderemos lo antes posible</p>
                  </div>

                  <div className="p-6">
                    {submitSuccess && (
                      <div className="mb-6 bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded relative">
                        <strong className="font-bold">¡Mensaje enviado! </strong>
                        <span className="block sm:inline">Nos pondremos en contacto contigo pronto.</span>
                      </div>
                    )}

                    {submitError && (
                      <div className="mb-6 bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                        <strong className="font-bold">Error al enviar. </strong>
                        <span className="block sm:inline">Por favor, inténtalo de nuevo más tarde.</span>
                      </div>
                    )}

                        <form
                        action="https://formspree.io/f/mqapwgjl"
                        method="POST"
                        className="space-y-4"
                        >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                                Nombre completo
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                type="text"
                                id="nombre"
                                name="nombre"
                                required
                                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500"
                                placeholder="Tu nombre"
                                />
                            </div>
                            </div>

                            <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Correo electrónico
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500"
                                placeholder="tu@email.com"
                                />
                            </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                            <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                                Teléfono (opcional)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                type="tel"
                                id="telefono"
                                name="telefono"
                                className="w-full pl-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500"
                                placeholder="+34 XXX XXX XXX"
                                />
                            </div>
                            </div>
                            <div>
                            <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                                Asunto
                            </label>
                            <select
                                id="asunto"
                                name="asunto"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500"
                            >
                                <option value="general">Consulta general</option>
                                <option value="membresia">Membresía</option>
                                <option value="clases">Clases y horarios</option>
                                <option value="entrenador">Entrenadores personales</option>
                                <option value="soporte">Soporte técnico</option>
                            </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                            Tu mensaje
                            </label>
                            <textarea
                            id="mensaje"
                            name="mensaje"
                            rows={5}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500"
                            placeholder="¿En qué podemos ayudarte?"
                            ></textarea>
                        </div>

                        <div className="flex items-center">
                            <input
                            id="privacy"
                            name="privacy"
                            type="checkbox"
                            required
                            className="h-4 w-4 text-maroon-600 focus:ring-maroon-500 border-gray-300 rounded"
                            />
                            <label htmlFor="privacy" className="ml-2 block text-sm text-gray-700">
                            Acepto la política de privacidad y el tratamiento de mis datos
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-maroon-600 text-white rounded-md hover:bg-maroon-700 transition-colors flex items-center justify-center"
                        >
                            <Send className="h-5 w-5 mr-2" />
                            Enviar mensaje
                        </button>
                        </form>

                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                  <div className="bg-gradient-to-r from-maroon-600 to-maroon-800 p-6">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5" />
                      Información de contacto
                    </h3>
                    <p className="text-maroon-100 mt-1">Otras formas de contactarnos</p>
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="bg-maroon-100 p-2 rounded-full">
                            <Phone className="h-5 w-5 text-maroon-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Teléfono</p>
                          <p className="text-sm text-gray-600">+34 643 03 06 68</p>
                          <p className="text-sm text-gray-600">Lun-Vie: 9:00 - 20:00</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="bg-maroon-100 p-2 rounded-full">
                            <Mail className="h-5 w-5 text-maroon-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Email</p>
                          <p className="text-sm text-gray-600">gymmanager@gmail.com</p>
                          <p className="text-sm text-gray-600">soporte@gymmanager.com</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="bg-maroon-100 p-2 rounded-full">
                            <MapPin className="h-5 w-5 text-maroon-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Direccion</p>
                          <p className="text-sm text-gray-600">Carrer Gymmanager</p>
                          <p className="text-sm text-gray-600">43500 Tortosa, España</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="bg-maroon-100 p-2 rounded-full">
                            <Clock className="h-5 w-5 text-maroon-600" />
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">Horario</p>
                          <p className="text-sm text-gray-600">Lunes a Viernes: 7:00 - 22:00</p>
                          <p className="text-sm text-gray-600">Sábados: 9:00 - 20:00</p>
                          <p className="text-sm text-gray-600">Domingos: 9:00 - 14:00</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <p className="text-sm font-medium text-gray-900 mb-3">Síguenos en redes sociales</p>
                      <div className="flex space-x-4">
                        <a href="https://www.facebook.com/Gymmanager005" className="bg-maroon-100 p-2 rounded-full hover:bg-maroon-200 transition-colors">
                          <Facebook className="h-5 w-5 text-maroon-600" />
                        </a>
                        <a href="https://www.instagram.com/gym.manager/?hl=es" className="bg-maroon-100 p-2 rounded-full hover:bg-maroon-200 transition-colors">
                          <Instagram className="h-5 w-5 text-maroon-600" />
                        </a>
                        <a href="https://x.com/gymmanagergame" className="bg-maroon-100 p-2 rounded-full hover:bg-maroon-200 transition-colors">
                          <Twitter className="h-5 w-5 text-maroon-600" />
                        </a>
                        <a href="https://Linkedin.com" className="bg-maroon-100 p-2 rounded-full hover:bg-maroon-200 transition-colors">
                          <Linkedin className="h-5 w-5 text-maroon-600" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                
              
            </div>
            </div>
            {/* FAQ Section */}
            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Preguntas frecuentes</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">¿Cómo puedo cancelar mi membresía?</h4>
                  <p className="text-gray-600">
                    Puedes cancelar tu membresía en cualquier momento desde tu perfil en la sección "Membresía" o
                    contactando directamente con nuestro equipo de atención al cliente.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">¿Ofrecen entrenamiento personalizado?</h4>
                  <p className="text-gray-600">
                    Sí, contamos con entrenadores personales certificados. Puedes reservar sesiones individuales o
                    adquirir paquetes de entrenamiento personalizado.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">
                    ¿Puedo congelar mi membresía temporalmente?
                  </h4>
                  <p className="text-gray-600">
                    Sí, puedes congelar tu membresía hasta por 2 meses al año. Esta opción está disponible para miembros
                    con planes semestrales o anuales.
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h4 className="font-semibold text-lg text-gray-800 mb-2">¿Cómo reservo una clase?</h4>
                  <p className="text-gray-600">
                    Puedes reservar clases a través de nuestra aplicación móvil o sitio web, en la sección "Clases". Las
                    reservas se pueden hacer con hasta 7 días de anticipación.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
