import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./index.css";
import cheeseburgerImage from "./assets/cheeseburger.jpg";
import frenchtoastImage from "./assets/frenchtoast.jpg";
import friedricenigerianImage from "./assets/friedricenigerian.jpg";
import pancakesImage from "./assets/pancakes.jpg";
import riceandstewImage from "./assets/riceandstew.jpg";
import jollofriceImage from "./assets/jollofrice.jpg";
import steakwithmashedpotatoes from "./assets/steakwithmashedpotatoes.jpg";

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

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
        <p>Welcome to the Recipe Page!</p>
        <div className="recipes-container">
          <div className="tags-container">
            <h3>Recipes</h3>
            <div className="tag-list">
              <Link to="/tagTemplate" className="tag">
                Beef (1)
              </Link>
              <Link to="/tagTemplate" className="tag">
                Chicken (1)
              </Link>
              <Link to="/tagTemplate" className="tag">
                Breakfast (1)
              </Link>
              <Link to="/tagTemplate" className="tag">
                Rice (1)
              </Link>
              <Link to="/tagTemplate" className="tag">
                Lunch (1)
              </Link>
            </div>
          </div>

          <div className="recipes-list">
            <ul>
              <li>
                <Link to={`/RecipeDetailsPage/1`} className="recipe">
                  <img
                    src={cheeseburgerImage}
                    alt="Cheeseburger"
                    className="img recipe-img"
                  />
                  <h5>{recipes[0]?.title}</h5>
                  <p>
                    Prep: {recipes[0]?.prep_time} | Cook:{" "}
                    {recipes[0]?.cook_time}
                  </p>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to={`/RecipeDetailsPage/2`} className="recipe">
                  <img
                    src={frenchtoastImage}
                    alt="French Toast"
                    className="img recipe-img"
                  />
                  <h5>{recipes[1]?.title}</h5>
                  <p>
                    Prep: {recipes[1]?.prep_time} | Cook:{" "}
                    {recipes[1]?.cook_time}
                  </p>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to={`/RecipeDetailsPage/3`} className="recipe">
                  <img
                    src={friedricenigerianImage}
                    alt="Nigerian Fried Rice"
                    className="img recipe-img"
                  />
                  <h5>{recipes[2]?.title}</h5>
                  <p>
                    Prep: {recipes[2]?.prep_time} | Cook:{" "}
                    {recipes[2]?.cook_time}
                  </p>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to={`/RecipeDetailsPage/4`} className="recipe">
                  <img
                    src={pancakesImage}
                    alt="Pancakes"
                    className="img recipe-img"
                  />
                  <h5>{recipes[3]?.title}</h5>
                  <p>
                    Prep: {recipes[3]?.prep_time} | Cook:{" "}
                    {recipes[3]?.cook_time}
                  </p>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to={`/RecipeDetailsPage/5`} className="recipe">
                  <img
                    src={riceandstewImage}
                    alt="Rice and Stew"
                    className="img recipe-img"
                  />
                  <h5>{recipes[4]?.title}</h5>
                  <p>
                    Prep: {recipes[4]?.prep_time} | Cook:{" "}
                    {recipes[4]?.cook_time}
                  </p>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to={`/RecipeDetailsPage/6`} className="recipe">
                  <img
                    src={jollofriceImage}
                    alt="Jollof Rice"
                    className="img recipe-img"
                  />
                  <h5>{recipes[5]?.title}</h5>
                  <p>
                    Prep: {recipes[5]?.prep_time} | Cook:{" "}
                    {recipes[5]?.cook_time}
                  </p>
                </Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link to={`/RecipeDetailsPage/7`} className="recipe">
                  <img
                    src={steakwithmashedpotatoes}
                    alt="Steak with Mashed Potatoes"
                    className="img recipe-img"
                  />
                  <h5>{recipes[6]?.title}</h5>
                  <p>
                    Prep: {recipes[6]?.prep_time} | Cook:{" "}
                    {recipes[6]?.cook_time}
                  </p>
                </Link>
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
