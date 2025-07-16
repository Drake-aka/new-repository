import { CircularProgress } from "./CircularProgress";
import { cn } from "@/lib/utils";

interface TimerDisplayProps {
  time: number;
  maxTime: number;
  phase: "work" | "break";
  className?: string;
}

export function TimerDisplay({ time, maxTime, phase, className }: TimerDisplayProps) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <CircularProgress value={time} max={maxTime} size={300} />
      <div className="flex flex-col items-center">
        <span className="text-6xl font-bold tabular-nums">
          {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
        </span>
        <span className={`text-xl font-medium ${phase === "work" ? "text-orange-500" : "text-green-500"}`}>
          {phase === "work" ? "工作时间" : "休息时间"}
        </span>
      </div>
    </div>
  );
}