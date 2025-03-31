"use client"

import type React from "react"
import { useContext, useState } from "react"
import apiClient from "../api/prefijo"
import { UserContext } from "../context/userContext"
import { toast } from "react-toastify"
import { Lock, HelpCircle, CreditCard, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { AxiosResponse } from "axios"
import { Membresia } from "./type/membresia"

// Tipo para la tarifa
type Tarifa = {
  id: number
  nombre: string
  precio: number
  meses: number
}

export default function PaginaDePago({ tarifa }: { tarifa: Tarifa | null | undefined }) {
  const { userContext, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
  })
  const [errors, setErrors] = useState({
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }))
  }

  
  if (!tarifa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-2xl font-bold text-center text-gray-800">No hay tarifa seleccionada</p>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    

    if (!userContext.user) {
      toast.error("Debes iniciar sesión para continuar")
      return
    }
    console.log(userContext.user)
      const user_id = userContext.user.id

      const fechaFin = new Date();
      fechaFin.setMonth(fechaFin.getMonth() + tarifa.meses);

      console.log(user_id)
      apiClient.post("/membresias", { user_id: user_id, fecha_fin: fechaFin, tarifa_id: tarifa.id })
      
      .then((response: AxiosResponse<Membresia>) => {
        const membresia = response.data;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setUser((prevState: any) => prevState ? { ...prevState, membresia } : prevState)
        

        
        toast.success("Pago realizado con éxito");
        navigate("/");
      })
      .catch(() => {
        toast.error("Error al realizar el pago")
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 relative">
      <motion.div
        className="fixed bottom-6 right-6 bg-maroon-600 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-maroon-700 transition"
        whileHover={{ scale: 1.1 }}
        onClick={() => toast.info("Contáctanos al soporte@example.com")}
      >
        <HelpCircle className="w-6 h-6" />
      </motion.div>

      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
        <div className="md:flex">
          <div className="md:w-64 bg-maroon-600 text-white p-8">
            <h2 className="text-2xl font-bold mb-4">Resumen de Compra</h2>
            <p className="mb-2">{tarifa.nombre}</p>
            <p className="text-3xl font-bold">${tarifa.precio.toFixed(2)}/mes</p>
            <p className="mt-2 text-sm">{tarifa.meses} {tarifa.meses === 1 ? "mes" : "meses"}</p>
            <div className="mt-4 border-t border-white pt-4">
              <p className="text-sm">Total: ${(tarifa.precio * tarifa.meses).toFixed(2)} USD</p>
              {tarifa.meses > 1 && (
                <p className="text-green-300 text-sm">Ahorras ${(59.99 - tarifa.precio).toFixed(2)} USD/mes</p>
              )}
            </div>
            <div className="mt-4 flex items-center text-sm">
              <Lock className="w-5 h-5 mr-2" /> Pago seguro garantizado
            </div>
          </div>

          <div className="p-8 md:flex-1">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Detalles de Pago</h2>
            <div className="flex space-x-4 mb-4">
              <CreditCard className="w-10 h-10 text-maroon-600" />
              <div className="flex space-x-2">
                <img src="/visa.svg" alt="Visa" className="h-8" />
                <img src="/mastercard.svg" alt="Mastercard" className="h-8" />
                <img src="/paypal.svg" alt="Paypal" className="h-8" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="numeroTarjeta" className="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
                <input
                  type="text"
                  id="numeroTarjeta"
                  name="numeroTarjeta"
                  maxLength={16}
                  className={`mt-1 block w-full rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 ${
                    errors.numeroTarjeta ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-maroon-500"
                  }`}
                  value={formData.numeroTarjeta}
                  onChange={handleInputChange}
                />
                {errors.numeroTarjeta && <p className="text-red-500 text-xs mt-1"><AlertCircle className="inline w-4 h-4 mr-1" />{errors.numeroTarjeta}</p>}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label htmlFor="fechaExpiracion" className="block text-sm font-medium text-gray-700">Fecha de Expiración</label>
                  <input
                    type="text"
                    id="fechaExpiracion"
                    name="fechaExpiracion"
                    placeholder="MM/AA"
                    className={`mt-1 block w-full rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 ${
                      errors.fechaExpiracion ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-maroon-500"
                    }`}
                    value={formData.fechaExpiracion}
                    onChange={handleInputChange}
                  />
                  {errors.fechaExpiracion && <p className="text-red-500 text-xs mt-1"><AlertCircle className="inline w-4 h-4 mr-1" />{errors.fechaExpiracion}</p>}
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    maxLength={3}
                    className={`mt-1 block w-full rounded-md py-2 px-3 shadow-sm focus:outline-none focus:ring-2 ${
                      errors.cvv ? "border-red-500 ring-red-300" : "border-gray-300 focus:ring-maroon-500"
                    }`}
                    value={formData.cvv}
                    onChange={handleInputChange}
                  />
                  {errors.cvv && <p className="text-red-500 text-xs mt-1"><AlertCircle className="inline w-4 h-4 mr-1" />{errors.cvv}</p>}
                </div>
              </div>

              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-maroon-600 text-white py-3 px-4 rounded-md font-bold text-lg shadow-lg transition-all duration-300 hover:bg-maroon-700 disabled:opacity-50"
                >
                  {isLoading ? "Procesando..." : `Pagar $${tarifa.precio.toFixed(2)}`}
                </motion.button>
                <p className="text-xs text-gray-500 text-center mt-2">Al pagar, aceptas nuestros <a href="/terminos" className="underline">Términos y Condiciones</a>.</p>
              </div>
            </form>

            <div className="mt-10 border-t pt-4">
              <h3 className="text-lg font-semibold mb-2">Preguntas Frecuentes</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><strong>¿Puedo cancelar cuando quiera?</strong> Sí, puedes cancelar tu membresía desde tu perfil.</li>
                <li><strong>¿Qué métodos de pago se aceptan?</strong> Aceptamos Visa, Mastercard, PayPal y más.</li>
                <li><strong>¿Mis datos están seguros?</strong> Utilizamos cifrado SSL para proteger tu información.</li>
              </ul>
            </div>
          </div>
        </div>


      </div>

    </div>
  )
}