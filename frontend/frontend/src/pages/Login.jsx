import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const API_BASE = "http://127.0.0.1:8000/api";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔐 AUTO REDIRECT IF ALREADY LOGGED IN
  useEffect(() => {
    const token = localStorage.getItem("access");
    const role = localStorage.getItem("role");

    if (token && role) {
      if (role === "farmer") {
        navigate("/farmerdashboard");
      } else {
        navigate("/products");
      }
    }
  }, [navigate]);

  const handleLogin = async () => {

    try {

      // 1. LOGIN API
      const response = await axios.post(
        `${API_BASE}/accounts/login/`,
        { username, password }
      );

      console.log("LOGIN RESPONSE:", response.data);

      const token = response.data.access;

      // 2. STORE TOKEN
      localStorage.setItem("access", token);

      // 3. GET USER PROFILE (VERY IMPORTANT)
      const userRes = await axios.get(
        `${API_BASE}/accounts/profile/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("USER DATA:", userRes.data);

      // 4. STORE USER (THIS FIXES YOUR NAVBAR ISSUE)
      localStorage.setItem("user", JSON.stringify(userRes.data));

      // 5. STORE ROLE
      const role = userRes.data.role;
      localStorage.setItem("role", role);

      alert("Login Successful");

      // 6. ROLE BASED REDIRECT
      window.dispatchEvent(new Event("authChange"));

     if (role === "farmer") {
          navigate("/farmerdashboard");
        } else {
          navigate("/products");
        }

    } catch (error) {
      console.log(error);
      alert("Login failed");
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