import React from 'react';
import '../../Style/Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerLogin = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const response = await axios.post("https://food-insta-3.onrender.com/api/auth/login/foodpatner", {
        email,
        password
      }, { withCredentials: true });

      console.log("✅ Food Partner Login response:", response.data);

      // ✅ Save token if provided, otherwise just set a login flag
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
      } else {
        // If backend uses only cookies, set a dummy flag for frontend protection
        localStorage.setItem("authToken", "foodpartner_authenticated");
      }

      // Navigate to food partner profile after successful login
      navigate("/food-partner-profile");

    } catch (error) {
      console.error("❌ Food Partner Login failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" role="region" aria-labelledby="partner-login-title">
        <header>
          <h1 id="partner-login-title" className="auth-title">Partner login</h1>
          <p className="auth-subtitle">Access your dashboard and manage orders.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="business@example.com" autoComplete="email" />
          </div>
          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" placeholder="Password" autoComplete="current-password" />
          </div>
          <button className="auth-submit" type="submit">Sign In</button>
        </form>
        <div className="auth-alt-action">
          New partner? <a href="/foodpatner/register">Create an account</a>
        </div>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;