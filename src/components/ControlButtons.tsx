import { cn } from "@/lib/utils";

interface ControlButtonsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  className?: string;
}

export function ControlButtons({
  isRunning,
  onStart,
  onPause,
  onReset,
  className,
}: ControlButtonsProps) {
  return (
    <div className={cn("flex gap-4", className)}>
      {isRunning ? (
        <button
          onClick={onPause}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          暂停
        </button>
      ) : (
        <button
          onClick={onStart}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          开始
        </button>
      )}
      <button
        onClick={onReset}
        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
      >
        重置
      </button>
    </div>
  );
}