import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { TimerDisplay } from "@/components/TimerDisplay";
import { ControlButtons } from "@/components/ControlButtons";
import { PresetButtons } from "@/components/PresetButtons";

export default function Home() {
  const [time, setTime] = useState(25 * 60);
  const [maxWorkTime, setMaxWorkTime] = useState(25 * 60);
  const [maxBreakTime, setMaxBreakTime] = useState(5 * 60);
  const [phase, setPhase] = useState<"work" | "break">("work");
  const [isRunning, setIsRunning] = useState(false);

  const maxTime = phase === "work" ? maxWorkTime : maxBreakTime;

  useEffect(() => {
    let interval: ReturnType<typeof setTimeout>;


    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (isRunning && time === 0) {
      setIsRunning(false);
      const nextPhase = phase === "work" ? "break" : "work";
      setPhase(nextPhase);
      setTime(nextPhase === "work" ? maxWorkTime : maxBreakTime);
    }

    return () => clearInterval(interval);
  }, [isRunning, time, phase, maxWorkTime, maxBreakTime]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(phase === "work" ? maxWorkTime : maxBreakTime);
  };

  const handleWorkTimeChange = (time: number) => {
    setMaxWorkTime(time);
    if (phase === "work") {
      setTime(time);
    }
  };

  const handleBreakTimeChange = (time: number) => {
    setMaxBreakTime(time);
    if (phase === "break") {
      setTime(time);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center p-4 gap-8">
        <TimerDisplay time={time} maxTime={maxTime} phase={phase} />
        <ControlButtons
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
        <PresetButtons
          workTime={maxWorkTime}
          breakTime={maxBreakTime}
          onWorkTimeChange={handleWorkTimeChange}
          onBreakTimeChange={handleBreakTimeChange}
        />
      </main>
    </div>
  );
}