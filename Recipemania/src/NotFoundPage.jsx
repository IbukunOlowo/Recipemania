import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function NotFoundPage() {
  return (
    <div className="notfound-container">
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
        </ul>
      </nav>

      {/* Main Content */}
      <main className="notfound-content">
        <h1>404 - Page Not Found</h1>
        <p>Oops! It looks like this recipe got lost in the kitchen.</p>
        <Link to="/" className="home-button">
          Back to Home
        </Link>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Chef App. All rights reserved.</p>
      </footer>
    </div>
  );
}
