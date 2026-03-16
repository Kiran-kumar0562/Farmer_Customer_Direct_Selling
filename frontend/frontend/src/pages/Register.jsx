import React from "react";
import "../css/RegisterPage.css";

function Register(){

return(
<div className="form-container">

  <h2>Register</h2>

  <label>Name</label>
  <input type="text" placeholder="Enter your name" />

  <label>Email</label>
  <input type="email" placeholder="Enter your email" />

  <label>Password</label>
  <input type="password" placeholder="Enter password" />

  <button>Register</button>

  <p>Already have an account? <a href="/login">Login</a></p>

</div>

)

}

export default Register