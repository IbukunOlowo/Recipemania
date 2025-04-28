import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
import cheeseburgerImage from "./assets/cheeseburger.jpg";
import frenchtoastImage from "./assets/frenchtoast.jpg";
import friedricenigerianImage from "./assets/friedricenigerian.jpg";
import pancakesImage from "./assets/pancakes.jpg";
import riceandstewImage from "./assets/riceandstew.jpg";
import jollofriceImage from "./assets/jollofrice.jpg";
import steakwithmashedpotatoes from "./assets/steakwithmashedpotatoes.jpg";

export default function RecipePage() {
  return (
    <div className="recipePage-container">
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
            <Link to="#">Recipes</Link>
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
      <main className="recipe-content">
        <h1>Recipe Page</h1>
        <p>Welcome to the Recipe Page!.</p>
        <div className="recipes-container">
          <div className="tags-container">
            <h3>Recipes</h3>
            <div className="tag-list">
              <Link to="/tagTemplate" className="tag">
                Beef (1){" "}
              </Link>
              <Link to="/tagTemplate" className="tag">
                Chicken (1){" "}
              </Link>
              <Link to="/tagTemplate" className="tag">
                Breakfast (1){" "}
              </Link>
              <Link to="/tagTemplate" className="tag">
                Rice (1){" "}
              </Link>
              <Link to="/tagTemplate" className="tag">
                Lunch (1){" "}
              </Link>
            </div>
          </div>

          <div className="recipes-list">
            <ul>
              <li>
                <Link to="#" className="recipe"></Link>
                <img
                  src={cheeseburgerImage}
                  alt="cheeseburger"
                  className="img recipe-img"
                ></img>
                <h5>Cheeseburger</h5>
                <p>Prep : 30 min | Cook : 15 min</p>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="#" className="recipe"></Link>
                <img
                  src={frenchtoastImage}
                  alt="frenchtoast"
                  className="img recipe-img"
                ></img>
                <h5>French Toast</h5>
                <p>Prep : 30 min | Cook : 15 min</p>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="#" className="recipe"></Link>
                <img
                  src={friedricenigerianImage}
                  alt="food"
                  className="img recipe-img"
                ></img>
                <h5>Nigerian Fried rice</h5>
                <p>Prep : 30 min | Cook : 15 min</p>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="#" className="recipe"></Link>
                <img
                  src={pancakesImage}
                  alt="food"
                  className="img recipe-img"
                ></img>
                <h5>Pancakes</h5>
                <p>Prep : 30 min | Cook : 15 min</p>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="#" className="recipe"></Link>
                <img
                  src={riceandstewImage}
                  alt="food"
                  className="img recipe-img"
                ></img>
                <h5>Nigerian Rice and Stew</h5>
                <p>Prep : 30 min | Cook : 15 min</p>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="#" className="recipe"></Link>
                <img
                  src={jollofriceImage}
                  alt="food"
                  className="img recipe-img"
                ></img>
                <h5>Jollof rice</h5>
                <p>Prep : 30 min | Cook : 15 min</p>
              </li>
            </ul>
            <ul>
              <li>
                <Link to="#" className="recipe"></Link>
                <img
                  src={steakwithmashedpotatoes}
                  alt="food"
                  className="img recipe-img"
                ></img>
                <h5>Steak and Mashed Potatoes</h5>
                <p>Prep : 30 min | Cook : 15 min</p>
              </li>
            </ul>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Chef App. All rights reserved.</p>
      </footer>
    </div>
  );
}
