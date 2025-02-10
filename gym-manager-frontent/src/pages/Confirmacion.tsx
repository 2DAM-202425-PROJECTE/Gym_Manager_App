import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

type Tarifa = {
  id: number
  nombre: string
  precio: number
  meses: number
}

export default function PaginaDePago({ tarifaSeleccionada }: { tarifaSeleccionada: Tarifa }) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    ciudad: "",
    codigoPostal: "",
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
  })

  const [cargando, setCargando] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCargando(true)
    // Aquí iría la lógica de procesamiento del pago
    setTimeout(() => {
      alert("Pago procesado con éxito!")
      setCargando(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-blue-600 text-white p-8 md:w-64">
            <h2 className="text-2xl font-bold mb-4">Resumen de Compra</h2>
            <p className="mb-2">{tarifaSeleccionada.nombre}</p>
            <p className="text-3xl font-bold">${tarifaSeleccionada.precio.toFixed(2)}/mes</p>
            <p className="mt-2 text-sm">
              {tarifaSeleccionada.meses} {tarifaSeleccionada.meses === 1 ? "mes" : "meses"}
            </p>
          </div>
          <div className="p-8 md:flex-1">
            <h2 className="text-2xl font-bold mb-4">Detalles de Pago</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                    Dirección
                  </label>
                  <input
                    type="text"
                    id="direccion"
                    name="direccion"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.direccion}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      id="ciudad"
                      name="ciudad"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.ciudad}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      id="codigoPostal"
                      name="codigoPostal"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.codigoPostal}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="numeroTarjeta" className="block text-sm font-medium text-gray-700">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    id="numeroTarjeta"
                    name="numeroTarjeta"
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={formData.numeroTarjeta}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fechaExpiracion" className="block text-sm font-medium text-gray-700">
                      Fecha de Expiración
                    </label>
                    <input
                      type="text"
                      id="fechaExpiracion"
                      name="fechaExpiracion"
                      placeholder="MM/AA"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.fechaExpiracion}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.cvv}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md font-bold text-lg shadow-lg transition-all duration-300 ${
                    cargando ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
                  }`}
                  disabled={cargando}
                >
                  {cargando ? "Procesando..." : `Pagar $${tarifaSeleccionada.precio.toFixed(2)}`}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

// export default PaginaDePago

