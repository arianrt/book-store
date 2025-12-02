import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // گرفتن داده از JSON Server
    // const res = await fetch("http://localhost:9000/admins");
    const res = await fetch("https://692f3d7591e00bafccd70748.mockapi.io/admins");
    const admins = await res.json();

    // بررسی دقیق یوزر و پسورد
    const foundAdmin = admins.find(
      (admin) =>
        admin.username === username.trim() &&
        admin.password === password.trim()
    );

    if (foundAdmin) {
      // لاگین موفق
      localStorage.setItem("isLoggedIn", "true");
      navigate("/books");
    } else {
      // لاگین ناموفق
      setError("نام کاربری یا رمز عبور اشتباه است");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-950">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-lg p-8 w-80"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          ورود ادمین
        </h2>

        <input
          type="text"
          placeholder="نام کاربری"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="رمز عبور"
          className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          ورود
        </button>

        {error && (
          <p className="text-red-500 text-center mt-3 text-sm">{error}</p>
        )}
      </form>
    </div>
  );
}
