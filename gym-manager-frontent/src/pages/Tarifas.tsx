import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Info, ArrowRight, Zap } from "lucide-react"
import apiClient from "../api/prefijo"
import { MotionFeatures } from "../components/galeries/MotionFeatures"
import { useNavigate } from "react-router-dom"
import { Tarifa } from "./type/tarifas"

const features = [
  "Acceso 24/7 a todas las instalaciones",
  "Clases grupales ilimitadas",
  "Acceso a spa y piscina",
  "Asesoramiento nutricional personalizado",
  "App de seguimiento de progreso",
  "Descuentos en productos de la tienda",
]

export default function Tarifas({ setTarifaSel }: { setTarifaSel:  Dispatch<SetStateAction<Tarifa | null | undefined>> }) {
  const [selectedPlan, setSelectedPlan] = useState<Tarifa | null>(null)
  const [showComparison, setShowComparison] = useState(false)

  const [plans, setPlans] = useState<Tarifa[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await apiClient.get("/alltarifas",);
      const tarifas = response.data as Tarifa[];
      setPlans(tarifas);
    };
    fetchData();
  }, [])


  function handleClick (tarifa : Tarifa) {
    setTarifaSel(tarifa);
    navigate('/confirmacion');

  }
  
  return (
    <div className="py-12 bg-[#0b132b] min-h-screen text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">Elige tu compromiso fitness</h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-300">
            Todas las opciones incluyen acceso completo. Tú decides cuánto tiempo quieres transformar tu vida.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`flex flex-col justify-between h-full bg-[#1c2541] border-2 rounded-lg transition-all duration-300 ${
                  selectedPlan?.id === plan.id ? "border-white scale-105" : "border-[#1c2541] hover:border-[#092756]"
                }`}
                onClick={() => setSelectedPlan(plan)}
              >
                <div className={`rounded-t-lg p-4`}>
                  <h3 className="text-xl sm:text-2xl font-semibold flex justify-between items-center">
                    <span>
                      {plan.meses} {plan.meses === 1 ? "mes" : "meses"}
                    </span>
                    <Calendar className="w-6 h-6" />
                  </h3>
                </div>
                <div className="text-center my-4 p-4">
                  <span className="text-3xl sm:text-4xl font-extrabold">{plan.precio.toFixed(2)}€</span>
                  <span className="text-lg sm:text-xl font-medium text-gray-400">/mes</span>
                  {plan.meses > 1 && (
                    <p className="mt-2 text-sm text-gray-400">Total: {(plan.precio * plan.meses).toFixed(2)}€</p>
                  )}
                  {plan.meses > 1 && (
                    <p className="mt-2 text-sm text-green-400">
                      Ahorras {(( - plan.precio) * plan.meses).toFixed(2)}€
                    </p>
                  )}
                </div>
                <div className="p-4">
                  <button onClick={() => handleClick(plan)} className="w-full bg-[#670d10] text-white py-2 px-4 rounded hover:bg-[#7d1114] transition-colors duration-300 flex items-center justify-center">
                    Seleccionar plan
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <MotionFeatures features={features}></MotionFeatures>

        <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            className="text-white border border-white py-2 px-4 rounded hover:bg-white hover:text-[#0b132b] transition-colors duration-300 flex items-center"
            onClick={() =>
              alert(
                "Los planes más largos ofrecen un mejor precio mensual y te ayudan a mantener tu compromiso fitness y alcanzar tus objetivos a largo plazo.",
              )
            }
          >
            <Info className="w-4 h-4 mr-2" />
            ¿Por qué elegir un plan más largo?
          </button>

          <button
            className="text-white border border-white py-2 px-4 rounded hover:bg-white hover:text-[#0b132b] transition-colors duration-300 flex items-center"
            onClick={() => setShowComparison(!showComparison)}
          >
            <Zap className="w-4 h-4 mr-2" />
            Comparar planes
          </button>
        </div>

        {showComparison && (
          <motion.div
            className="mt-8 bg-[#1c2541] p-6 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h4 className="text-xl font-bold mb-4">Comparación de planes</h4>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-2">Duración</th>
                    <th className="text-right py-2">Precio/mes</th>
                    <th className="text-right py-2">Ahorro total</th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((plan) => (
                    <tr key={plan.meses} className="border-b border-gray-700">
                      <td className="py-2">
                        {plan.meses} {plan.meses === 1 ? "mes" : "meses"}
                      </td>
                      <td className="text-right">{plan.precio.toFixed(2)}€</td>
                      <td className="text-right text-green-400">
                        {plan.meses > 1 ? ((59.99 - plan.precio) * plan.meses).toFixed(2) + "€" : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  )
}

