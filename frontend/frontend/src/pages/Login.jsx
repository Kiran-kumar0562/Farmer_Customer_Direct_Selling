import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Login.css";

function Login(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if(username === "" || password === ""){
      alert("Please enter username and password");
    }
    else{
      alert("Login Successful");
    }
  }

  return(
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        <input 
          type="text" 
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="register-text">
          Don't have an account? 
          <Link to="/register"> Register</Link>
        </p>

      </div>
    </div>
  )
}

export default Login;