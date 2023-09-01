import React from "react";
import "./LoginPage.css";
import loginImage from "../components/Login-bro.png";
import loginImage1 from "../components/Footer-1440.png";
import { Link } from "react-router-dom";
const LoginPage = () => {
  return (
    <div className="login-container">
      <img src={loginImage1} alt="Login1" className="Loginimg2" />
      <div className="login-content">
        <div className="login-form">
          <h2 className="login-title">Welcome </h2>
          <form>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <div className="button-container">
              <Link to="/welcome" type="submit" className="login-button1">
                Login
              </Link>
            </div>
          </form>
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
        <div className="login-image">
          <img src={loginImage} alt="Login" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
