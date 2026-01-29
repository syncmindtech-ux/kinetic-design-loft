import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-10 h-10 rounded-full flex items-center justify-center bg-secondary/50 hover:bg-secondary transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === "dark" ? 180 : 0,
          scale: theme === "dark" ? 0 : 1
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun className="w-5 h-5 text-foreground" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{ 
          rotate: theme === "dark" ? 0 : -180,
          scale: theme === "dark" ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon className="w-5 h-5 text-foreground" />
      </motion.div>
    </motion.button>
  );
};