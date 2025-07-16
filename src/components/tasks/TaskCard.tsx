import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    completed: boolean;
    tags: Array<{ id: string; name: string; color: string }>;
  };
  onComplete: () => void;
  onEdit: () => void;
}

export function TaskCard({ task, onComplete, onEdit }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className={cn(
        "bg-white rounded-lg shadow-sm p-4 border-l-4",
        task.completed
          ? "border-green-500 opacity-70"
          : "border-orange-500"
      )}
      onClick={onEdit}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3
            className={cn(
              "font-medium",
              task.completed ? "line-through text-gray-500" : "text-gray-800"
            )}
          >
            {task.title}
          </h3>
          <div className="flex gap-2 mt-2">
            {task.tags.map((tag) => (
              <span
                key={tag.id}
                className={`${tag.color} text-white text-xs px-2 py-1 rounded-full`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          className="text-gray-400 hover:text-green-500"
        >
          <i className="fa-regular fa-circle-check"></i>
        </button>
      </div>
    </motion.div>
  );
}
