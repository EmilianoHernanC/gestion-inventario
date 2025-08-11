import { useStore } from "../../store"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun } from "lucide-react"

export default function DarkModeButton() {
  const darkMode = useStore((state) => state.darkMode)
  const toggleDarkMode = useStore((state) => state.toggleDarkMode)
  
  return (
    <motion.button
      onClick={toggleDarkMode}
      className="relative flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={darkMode ? 'moon' : 'sun'}
          initial={{ opacity: 0, rotate: -180 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          {darkMode ? (
            <Moon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          ) : (
            <Sun className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
          )}
        </motion.div>
      </AnimatePresence>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {darkMode ? "Modo Claro" : "Modo Oscuro"}
      </span>
    </motion.button>
  )
}