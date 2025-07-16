import { TaskCard } from "./TaskCard";
import { cn } from "@/lib/utils";

interface TaskListProps {
  tasks: Array<{
    id: string;
    title: string;
    completed: boolean;
    tags: Array<{ id: string; name: string; color: string }>;
  }>;
  onComplete: (id: string) => void;
  onEdit: (task: any) => void;
}

export function TaskList({ tasks, onComplete, onEdit }: TaskListProps) {
  return (
    <div className={cn("space-y-3")}>
      {tasks.length === 0 ? (
        <div className="text-center py-8 text-gray-500">暂无任务</div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onComplete={() => onComplete(task.id)}
            onEdit={() => onEdit(task)}
          />
        ))
      )}
    </div>
  );
}
