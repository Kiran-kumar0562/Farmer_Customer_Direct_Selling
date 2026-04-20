import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const API_BASE = "http://127.0.0.1:8000/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // ✅ If already logged in, redirect directly
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      navigate("/farmerdashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE}/accounts/login/`,
        { username, password }
      );

      console.log("Full response:", response.data);

      // ✅ store tokens
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);

      // 🔥 Fetch user details
      const userRes = await axios.get(`${API_BASE}/accounts/profile/`, {
        headers: {
          Authorization: `Bearer ${response.data.access}`,
        },
      });

      // ✅ Store user data
      localStorage.setItem("user", JSON.stringify(userRes.data));

      // ✅ Optional (extra clarity flag)
      localStorage.setItem("isLoggedIn", "true");

      alert("Login Successful");

      // ✅ redirect
      navigate("/farmerdashboard");

    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="register-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;