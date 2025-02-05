import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CardTarifas({ plan, selectedPlan, setSelectedPlan }) {
    return (<motion.div
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
            <button className="w-full bg-[#670d10] text-white py-2 px-4 rounded hover:bg-[#7d1114] transition-colors duration-300 flex items-center justify-center">
              Seleccionar plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>)
}