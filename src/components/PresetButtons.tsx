import { cn } from "@/lib/utils";

interface PresetButtonsProps {
  workTime: number;
  breakTime: number;
  onWorkTimeChange: (time: number) => void;
  onBreakTimeChange: (time: number) => void;
  className?: string;
}

export function PresetButtons({
  workTime,
  breakTime,
  onWorkTimeChange,
  onBreakTimeChange,
  className,
}: PresetButtonsProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex gap-2">
        <button
          onClick={() => onWorkTimeChange(25 * 60)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            workTime === 25 * 60
              ? "bg-orange-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          25分钟
        </button>
        <button
          onClick={() => onWorkTimeChange(50 * 60)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            workTime === 50 * 60
              ? "bg-orange-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          50分钟
        </button>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onBreakTimeChange(5 * 60)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            breakTime === 5 * 60
              ? "bg-green-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          5分钟
        </button>
        <button
          onClick={() => onBreakTimeChange(10 * 60)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            breakTime === 10 * 60
              ? "bg-green-500 text-white"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        >
          10分钟
        </button>
      </div>
    </div>
  );
}