import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.log("Invalid user data in localStorage");
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = () => {
    // ✅ clear everything
    localStorage.removeItem("user");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    setUser(null);
    navigate("/login");
  };

  // ✅ Go to dashboard
  const goToDashboard = () => {
    navigate("/farmerdashboard");
  };

  return (
    <nav className="navbar">
      <h2>Farmer Direct Selling System</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

        {/* ✅ If user logged in */}
        {user ? (
          <>
            {/* 🔥 Clickable Username */}
            <span
              className="username"
              onClick={goToDashboard}
              style={{ cursor: "pointer" }}
            >
              Welcome, {user.username} 👋
            </span>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;