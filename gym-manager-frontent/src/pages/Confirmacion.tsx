import type React from "react"
import { useContext, useState } from "react"
import { motion } from "framer-motion"
import apiClient from "../api/prefijo"
import { UserContext } from "../context/userContext"
import { toast } from "react-toastify"

type Tarifa = {
  id: number
  nombre: string
  precio: number
  meses: number
}

export default function PaginaDePago({ tarifa } : { tarifa: Tarifa | null | undefined }) {

  const { userContext } = useContext(UserContext)

  const [formData, setFormData] = useState({
    numeroTarjeta: "",
    fechaExpiracion: "",
    cvv: "",
  })


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }


  if (!tarifa) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl font-bold text-center">No hay tarifa seleccionada</p>
      </div>
    )
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!userContext.user) {
      alert("Debes iniciar sesión para continuar")
      return
    }

    const user_id = userContext.user.id
    
      const fechaFin = new Date();
      fechaFin.setMonth(fechaFin.getMonth() + tarifa.meses);
      apiClient.post("/membresias", { user_id: user_id, fecha_fin: fechaFin })
      .then(response => {
        console.log(response);
        toast.success("Pago realizado con éxito");
      })
      .catch(error => {
        console.error(error); // Para ver el error completo en la consola
        toast.error("Error al realizar el pago");
      });
     


  }
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 bg-blue-600 text-white p-8 md:w-64">
            <h2 className="text-2xl font-bold mb-4">Resumen de Compra</h2>
            <p className="mb-2">{tarifa.nombre}</p>
            <p className="text-3xl font-bold">${tarifa.precio.toFixed(2)}/mes</p>
            <p className="mt-2 text-sm">
              {tarifa.meses} {tarifa.meses === 1 ? "mes" : "meses"}
            </p>
          </div>
          <div className="p-8 md:flex-1">
            <h2 className="text-2xl font-bold mb-4">Detalles de Pago</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">

                <div className="grid grid-cols-2 gap-6">

                </div>
                <div>
                  <label htmlFor="numeroTarjeta" className="block text-sm font-medium text-gray-700">
                    Número de Tarjeta
                  </label>
                  <input
                    type="text"
                    id="numeroTarjeta"
                    name="numeroTarjeta"
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
                     "hover:bg-blue-700"
                  }`}
                >
                  {`Pagar $${tarifa.precio.toFixed(2)}`}
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

