import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useGetAccessToken } from "./stores/getters";
import Login from "@/features/login";
import NotFound from "@/components/404";
import HomePage from "@/features/homePage";
import TodoList from "@/features/todolist";
import Counter from "@/features/counter/counter";
import '@/assets/App.css'

function App() {
  const navigate = useNavigate();
  const access_token = useGetAccessToken();
  useEffect(() => {
    if (!access_token) {
      navigate("/login", { replace: true });
    }
  }, [access_token]);
  // <div className="w-100vw">
  //   <Counter />
  //   <TodoList />
  // </div>

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/todoList" element={<TodoList />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
