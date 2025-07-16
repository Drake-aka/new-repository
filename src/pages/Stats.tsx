import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { 
  BarChart, 
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Bar
} from "recharts";
import { cn } from "@/lib/utils";

// Mock数据
const weeklyData = [
  { date: "7/8", count: 5 },
  { date: "7/9", count: 8 },
  { date: "7/10", count: 6 },
  { date: "7/11", count: 7 },
  { date: "7/12", count: 9 },
  { date: "7/13", count: 4 },
  { date: "7/14", count: 6 },
];

const monthlyData = Array.from({ length: 30 }, (_, i) => ({
  date: `7/${i + 1}`,
  count: Math.floor(Math.random() * 10) + 1,
}));

const completionRate = Math.floor(Math.random() * 26) + 70; // 70-95%

export default function Stats() {
  const [view, setView] = useState<"week" | "month">("week");
  const data = view === "week" ? weeklyData : monthlyData;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-4 max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">番茄钟统计</h1>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => setView("week")}
                className={`px-4 py-2 rounded-lg ${
                  view === "week" ? "bg-orange-500 text-white" : "bg-gray-100"
                }`}
              >
                本周
              </button>
              <button
                onClick={() => setView("month")}
                className={`px-4 py-2 rounded-lg ${
                  view === "month" ? "bg-orange-500 text-white" : "bg-gray-100"
                }`}
              >
                本月
              </button>
            </div>
            
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg">
              完成率: {completionRate}%
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-medium mb-4">
              {view === "week" ? "本周完成情况" : "本月完成情况"}
            </h2>
            
            <div className="h-80">
              {view === "week" ? (
                <LineChart
                  width={700}
                  height={300}
                  data={data}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF7B54" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#FF7B54" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="count"
                    stroke="#FF7B54"
                    fillOpacity={1}
                    fill="url(#colorCount)"
                    animationDuration={500}
                  />
                </LineChart>
              ) : (
                <BarChart
                  width={700}
                  height={300}
                  data={data}
                  margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="count"
                    fill="#7FB77E"
                    animationDuration={500}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

