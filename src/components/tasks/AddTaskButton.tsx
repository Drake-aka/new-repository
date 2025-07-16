import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface AddTaskButtonProps {
  onClick: () => void;
}

export function AddTaskButton({ onClick }: AddTaskButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "fixed bottom-8 right-8 w-14 h-14 rounded-full bg-green-500 text-white shadow-lg flex items-center justify-center"
      )}
    >
      <i className="fa-solid fa-plus text-xl"></i>
    </motion.button>
  );
}
