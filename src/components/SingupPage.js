import React from "react";
import "./SignupPage.css";
import signupImage from "../components/Login-bro.png";
import signupImage1 from "../components/Footer-1440.png";
import { Link } from "react-router-dom";
const SignupPage = () => {
  return (
    <div className="signup-container">
      <img src={signupImage1} alt="Signup1" className="img2" />
      <div className="signup-content">
        <div className="signup-image">
          <img src={signupImage} alt="Signup" />
        </div>
        <div className="signup-form">
          <h2 className="signup-title">Create an Account</h2>
          <p>Welcome back! Please enter your details</p>
          <form>
            <div className="input-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" />
            </div>
            <div className="button-container">
              <button type="submit" className="signup-button">
                Sign Up
              </button>
            </div>
          </form>
          <div className="login-link">
            Already have an account? <Link to="/">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
