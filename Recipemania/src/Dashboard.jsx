import React from "react";
import "./index.css";
import AboutPage from "./AboutPage";
import ChefPage from "./ChefPage";
import RecipePage from "./RecipePage";
import ChefPortal from "./ChefPortal";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="background-image">
      <div className="dashboard-container"></div>
      <header>
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
      </header>
      <p className="dashboard-content">
        Welcome to a world of flavor! Explore our exclusive collection of
        recipes, curated with love from top chefs just for you!
      </p>
    </div>
  );
}
