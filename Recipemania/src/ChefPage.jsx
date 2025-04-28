import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function ChefPage() {
  return (
    <div className="chefPage-container">
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
      <main className="main-content">
        <h1>Chef Page</h1>
        <p>
          Welcome to the Chef Page! Discover amazing chefs and their stories.
        </p>
      </main>
      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Chef App. All rights reserved.</p>
      </footer>
    </div>
  );
}
