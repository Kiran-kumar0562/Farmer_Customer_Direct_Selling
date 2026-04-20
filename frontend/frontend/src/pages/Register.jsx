
import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/RegisterPage.css";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [farmName, setFarmName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/accounts/register/",  // ✅ correct URL
        {
          username: name,
          email: email,
          password: password,
          role: role,
          phone: phone,
          location: location,
          farm_name: farmName
        }
      );

      alert("Registration Successful ✅");

      // ✅ OPTIONAL: store user (only if backend returns user)
      localStorage.setItem("user", JSON.stringify(res.data));

      // ✅ Redirect
      if (role === "farmer") {
        navigate("/FarmerDashboard");
      } else {
        navigate("/");
      }

    } catch (error) {
           console.log("FULL ERROR:", error);
           console.log("BACKEND ERROR:", error.response?.data);
           alert(JSON.stringify(error.response?.data)); // shows exact error
    }
  };

  return (
    <div className="register-container">

      <form onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="text"
          placeholder="Role (farmer/customer)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="text"
          placeholder="Farm Name"
          value={farmName}
          onChange={(e) => setFarmName(e.target.value)}
        />

        <button type="submit">Register</button>

        <p className="login-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>

    </div>
  );
}

export default Register;