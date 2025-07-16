import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

const soundOptions = [
  { id: "bell", name: "铃铛" },
  { id: "chime", name: "钟声" },
  { id: "beep", name: "蜂鸣" },
];

const durationOptions = [
  { value: 25 * 60, label: "25分钟" },
  { value: 50 * 60, label: "50分钟" },
];

export default function Settings() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [settings, setSettings] = useState({
    duration: 25 * 60,
    sound: "bell",
    theme: "light",
  });

  // 从本地存储加载设置
  useEffect(() => {
    const savedSettings = localStorage.getItem("pomodoroSettings");
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  // 保存设置到本地存储
  useEffect(() => {
    localStorage.setItem("pomodoroSettings", JSON.stringify(settings));
  }, [settings]);

  const handleSettingChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
    
    if (key === "theme") {
      toggleTheme();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <h1 className="text-2xl font-bold mb-6">设置</h1>
        
        {/* 时长设置 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-medium mb-3">番茄钟时长</h2>
          <div className="flex gap-2">
            {durationOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSettingChange("duration", option.value)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  settings.duration === option.value
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* 音效设置 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-medium mb-3">提醒音效</h2>
          <div className="grid gap-2">
            {soundOptions.map((sound) => (
              <button
                key={sound.id}
                onClick={() => handleSettingChange("sound", sound.id)}
                className={`px-4 py-2 rounded-lg text-left transition-colors ${
                  settings.sound === sound.id
                    ? "bg-orange-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                {sound.name}
              </button>
            ))}
          </div>
        </div>

        {/* 主题设置 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-medium mb-3">主题设置</h2>
          <div className="flex items-center justify-between">
            <span>深色模式</span>
            <button
              onClick={() => {
                const newTheme = isDark ? "light" : "dark";
                handleSettingChange("theme", newTheme);
              }}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isDark ? "bg-orange-500" : "bg-gray-200"
              }`}
            >
              <motion.span
                layout
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isDark ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
