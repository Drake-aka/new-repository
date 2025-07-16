import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TaskFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (task: any) => void;
  tags: Array<{ id: string; name: string; color: string }>;
  initialTask?: any;
}

export function TaskForm({
  visible,
  onClose,
  onSubmit,
  tags,
  initialTask,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialTask?.tags.map((t: any) => t.id) || []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      id: initialTask?.id || Date.now().toString(),
      title,
      completed: initialTask?.completed || false,
      tags: tags.filter((tag) => selectedTags.includes(tag.id)),
    };
    onSubmit(newTask);
    setTitle("");
    setSelectedTags([]);
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">
            {initialTask ? "编辑任务" : "添加任务"}
          </h2>
          <button onClick={onClose} className="text-gray-500">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">任务名称</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">标签</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedTags.includes(tag.id)
                      ? tag.color + " text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              {initialTask ? "更新" : "添加"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
