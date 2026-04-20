import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("access"));
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // 🔄 Sync storage on mount + updates
  useEffect(() => {
    const updateUser = () => {
      const storedUser = localStorage.getItem("user");

     if (storedUser && storedUser !== "undefined") {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  // initial load
  updateUser();

    // listen for changes in other tabs
    window.addEventListener("authChange", updateUser);

    return () => {
      window.removeEventListener("authchange", updateUser);
    };
  }, []);

  // 🔐 ROLE DASHBOARD
  const goToDashboard = () => {
    const role = localStorage.getItem("role");

    if (role === "farmer") {
      navigate("/farmerdashboard");
    } else {
      navigate("/products");
    }
  };

  // 🔴 LOGOUT
  const handleLogout = () => {
    localStorage.clear();

    window.dispatchEvent(new Event("authChange"));

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2>Farmer Direct Selling System</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart</Link>

        {/* 👤 AUTH UI */}
        {token && user ? (
          <>
            <span
              className="username"
              onClick={goToDashboard}
              style={{ cursor: "pointer", fontWeight: "bold" }}
            >
              👋 Welcome, {user.username}
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