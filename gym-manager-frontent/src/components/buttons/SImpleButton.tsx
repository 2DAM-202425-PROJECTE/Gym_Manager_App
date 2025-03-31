import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SimpleButtonProps {
  children: ReactNode;
  action?: () => void;
}

export default function SimpleButton({ children, action }: SimpleButtonProps) {
  const handleClick = () => {
    if (action) {
      action();
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="submit"
      onClick={handleClick} 
      className={`w-full bg-blue-600 text-white py-3 px-4 rounded-md font-bold text-lg shadow-lg transition-all duration-300 ${
        "hover:bg-blue-700"
      }`}
    >
      {children}
    </motion.button>
  );
}
