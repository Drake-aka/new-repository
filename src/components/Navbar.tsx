import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm py-4 px-6">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-orange-500">
          番茄钟
        </Link>
        <div className="flex gap-4">
          <Link
            to="/tasks"
            className="text-gray-600 hover:text-orange-500 transition-colors"
          >
            任务管理
          </Link>
          <Link
            to="/stats"
            className="text-gray-600 hover:text-orange-500 transition-colors"
          >
            统计
          </Link>
          <Link
            to="/settings"
            className="text-gray-600 hover:text-orange-500 transition-colors"
          >
            设置
          </Link>
        </div>
      </div>
    </nav>
  );
}