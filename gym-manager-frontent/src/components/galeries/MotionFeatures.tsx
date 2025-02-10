import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface MotionFeaturesProps {
  features: string[];
}

export function MotionFeatures({ features }: MotionFeaturesProps) {
   return( <motion.div
    className="mt-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.5 }}
  >
    <h3 className="text-2xl font-bold text-center mb-8">Todos los planes incluyen:</h3>
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <motion.li
          key={index}
          className="flex items-center space-x-3 bg-[#1c2541] p-3 rounded-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Check className="flex-shrink-0 w-5 h-5 text-green-400" />
          <span className="text-sm sm:text-base">{feature}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>)
}