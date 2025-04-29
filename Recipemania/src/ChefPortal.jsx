import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import email_icon from "./assets/emailicon.png";
import password_icon from "./assets/password.png";

export default function ChefPortal() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //useEffect(() => {
  //  axios
  //   .get("http://localhost:5000")
  //    .then((response) => users(response.data))
  //    .catch((error) => console.error(error));
  //}, []);
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      localStorage.setItem("token", data.token);
      navigate("/ChefprofilePage");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="ChefPortal-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/ChefPage">Chefs</Link>
          </li>
          <li>
            <Link to="/RecipePage">Recipes</Link>
          </li>
          <li>
            <Link to="/AboutPage">About Us</Link>
          </li>
          <li>
            <Link to="/ChefPortal">Chef Portal</Link>
          </li>
          {token ? (
            <></>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      {/* Main Content */}
      <div className="portal-content">
        <h1>Login</h1>
        <div className="portal-container">
          <div className="header">
            <div className="text">Login</div>
            <div className="underline"></div>
          </div>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="inputs">
            <div className="input">
              <img src={email_icon} alt="Email" className="icon" />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <img src={password_icon} alt="Password" className="icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="forgot-password">
              Lost Password? <Link to="/forgot-password">Click Here!</Link>
            </div>
            <div className="chefportal-submit-container">
              <button type="submit" className="chefportal-submit">
                Login
              </button>
            </div>
          </form>
          <p>
            Don't have an account? <Link to="/SignUpPage">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Chef App. All rights reserved.</p>
      </footer>
    </div>
  );
}
