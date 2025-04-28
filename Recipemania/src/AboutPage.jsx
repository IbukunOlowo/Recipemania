import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

export default function AboutPage() {
  return (
    <div className="about-container">
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
      <main className="content-area">
        <div className="overlay">
          <div className="about-content">
            <h1>About Us</h1>
            <p>
              Welcome to our recipe website! We bring you the best recipes from
              top chefs around the world. Whether you're a beginner or a pro,
              our curated selection ensures you always have something delicious
              to cook.
            </p>
          </div>
        </div>
      </main>
      <footer className="footer">
        <p>© {new Date().getFullYear()} Chef App. All rights reserved.</p>
      </footer>
    </div>
  );
}
