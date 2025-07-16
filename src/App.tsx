import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Tasks from "@/pages/Tasks";
import Stats from "@/pages/Stats";
import { createContext, useState } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, logout }}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/settings" element={<div className="text-center text-xl">设置 - 开发中</div>} />
      </Routes>
    </AuthContext.Provider>
  );
}
