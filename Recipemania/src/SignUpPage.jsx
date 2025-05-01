import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import email_icon from "./assets/emailicon.png";
import password_icon from "./assets/password.png";

export default function SignUpPage() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Client-side validation for password match
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match");
      return; // Stop submission if passwords don't match
    }

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
      localStorage.setItem("token", data.token);
      setShowModal(true); // Show pop-up on success
    } catch (err) {
      setError(err.message);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setValues({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="ChefPortal-container">
      {/* Main Content */}
      <div className="portal-content">
        <div className="portal-container">
          <div className="header">
            <div className="text">Create Account</div>
            <div className="underline"></div>
          </div>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit} className="inputs">
            <div className="input">
              <img src={email_icon} alt="Username" className="icon" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={values.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input">
              <img src={email_icon} alt="Email" className="icon" />
              <input
                type="email"
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
            <div className="input">
              <img
                src={password_icon}
                alt="Confirm Password"
                className="icon"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="submit-container">
              <button type="submit" className="submit">
                Create Account
              </button>
            </div>
          </form>
          <div className="login-link">
            <p>
              Already have an account? <Link to="/ChefPortal">Login here</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Modal for Success Message */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Success!</h2>
            <p>You have successfully signed up!</p>
            <button onClick={closeModal} className="modal-close">
              OK
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Chef App. All rights reserved.</p>
      </footer>
    </div>
  );
}
