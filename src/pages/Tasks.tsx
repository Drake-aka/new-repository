import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { TaskList } from "@/components/tasks/TaskList";
import { AddTaskButton } from "@/components/tasks/AddTaskButton";
import { TaskForm } from "@/components/tasks/TaskForm";
import { cn } from "@/lib/utils";

export default function Tasks() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "完成番茄钟应用开发",
      completed: false,
      tags: [
        { id: "1", name: "工作", color: "bg-orange-500" },
        { id: "2", name: "重要", color: "bg-red-500" },
      ],
    },
    {
      id: "2",
      title: "学习React新特性",
      completed: true,
      tags: [
        { id: "3", name: "学习", color: "bg-blue-500" },
      ],
    },
  ]);

  const [tags, setTags] = useState([
    { id: "1", name: "工作", color: "bg-orange-500" },
    { id: "2", name: "重要", color: "bg-red-500" },
    { id: "3", name: "学习", color: "bg-blue-500" },
    { id: "4", name: "个人", color: "bg-green-500" },
  ]);

  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = selectedTag
    ? tasks.filter((task) => task.tags.some((tag) => tag.id === selectedTag))
    : tasks;

  const handleAddTask = (newTask: any) => {
    setTasks([...tasks, newTask]);
    setShowForm(false);
  };

  const handleUpdateTask = (updatedTask: any) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditingTask(null);
    setShowForm(false);
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">任务管理</h1>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm ${
                !selectedTag ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              全部
            </button>
            {tags.map((tag) => (
              <button
                key={tag.id}
                onClick={() => setSelectedTag(tag.id)}
                className={`px-3 py-1 rounded-full text-sm ${
                  selectedTag === tag.id ? tag.color + " text-white" : "bg-gray-200"
                }`}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>

        <TaskList
          tasks={filteredTasks}
          onComplete={handleCompleteTask}
          onEdit={(task) => {
            setEditingTask(task);
            setShowForm(true);
          }}
        />
      </main>

      <AddTaskButton onClick={() => setShowForm(true)} />
      <TaskForm
        visible={showForm}
        onClose={() => {
          setShowForm(false);
          setEditingTask(null);
        }}
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        tags={tags}
        initialTask={editingTask}
      />
    </div>
  );
}
